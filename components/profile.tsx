"use client"
import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, MapPin, Heart, Music, Coffee, Palette, LogOut } from 'lucide-react';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { app } from '@/app/firebase/config';
import { getAuth, signOut } from 'firebase/auth';

interface ProfileSetupProps {}

interface FormData {
  name: string;
  age: string;
  country: string;
  state: string;
  hobbies: string[];
  orientation: string;
  religion: string;
  userId: string;
}

// Utility function to calculate cosine similarity between two arrays
const cosineSimilarity = (arr1: string[], arr2: string[]): number => {
  const allHobbies = Array.from(new Set([...arr1, ...arr2]));
  
  const vector1 = allHobbies.map(hobby => (arr1.includes(hobby) ? 1 : 0));
  const vector2 = allHobbies.map(hobby => (arr2.includes(hobby) ? 1 : 0));
  
  const dotProduct = vector1.reduce<number>((acc, val, i) => acc + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce<number>((acc, val) => acc + val ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce<number>((acc, val) => acc + val ** 2, 0));
  
  return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
};

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    country: '',
    state: '',
    hobbies: [],
    orientation: '',
    religion: '',
    userId: localStorage.getItem('userId') || '' // Set userId from localStorage
  });
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }

    fetchProfile(userId);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/');
  };

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 500;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const resizedImage = await resizeImage(file);
      setProfileImage(resizedImage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      hobbies: checked 
        ? [...prev.hobbies, value]
        : prev.hobbies.filter(hobby => hobby !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/signin');
        return;
      }

      const storage = getStorage(app);
      const db = getFirestore(app);

      // Upload image if exists
      let photoURL = '';
      if (profileImage) {
        const storageRef = ref(storage, `profile-images/${userId}`);
        await uploadString(storageRef, profileImage, 'data_url');
        photoURL = await getDownloadURL(storageRef);
      }

      // Save profile data
      await setDoc(doc(db, 'profiles', userId), {
        ...formData,
        photoURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      router.push('/home'); // Redirect to home after successful save
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProfiles = async (currentUserHobbies: string[], userId: string) => {
    try {
      const db = getFirestore(app);
      const profilesSnapshot = await getDocs(collection(db, 'profiles'));
      const profiles: any[] = [];

      profilesSnapshot.forEach(doc => {
        // Skip current user's profile
        if (doc.id !== userId) {
          const data = doc.data();
          // Calculate similarity score
          const similarityScore = cosineSimilarity(
            currentUserHobbies,
            data.hobbies || []
          );
          
          profiles.push({
            id: doc.id,
            ...data,
            similarityScore
          });
        }
      });

      // Sort by similarity score in descending order
      const sortedProfiles = profiles
        .sort((a, b) => b.similarityScore - a.similarityScore)
        // Filter profiles with some similarity (score > 0)
        .filter(profile => profile.similarityScore > 0);

      return sortedProfiles;
    } catch (error) {
      console.error('Error fetching similar profiles:', error);
      return [];
    }
  };

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const profileDoc = await getDoc(doc(db, 'profiles', userId));
      
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        setFormData({
          name: data.name || '',
          age: data.age || '',
          country: data.country || '',
          state: data.state || '',
          hobbies: data.hobbies || [],
          orientation: data.orientation || '',
          religion: data.religion || '',
          userId : data.userId || userId,
        });
        
        if (data.photoURL) {
          setProfileImage(data.photoURL);
        }

        // Fetch similar profiles
        const similarProfiles = await fetchSimilarProfiles(data.hobbies || [], userId);
        setProfiles(similarProfiles);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 p-4 pb-20">
          {/* Header */}
          <div className="text-center mb-8 pt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Time to shine! ✨
            </h1>
            <p className="text-gray-600">
              Let's make your profile as iconic as your TikTok FYP
            </p>
          </div>

          {/* Profile Form */}
          <div className="max-w-md mx-auto space-y-8">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-pink-100 border-4 border-white shadow-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-pink-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-pink-50 transition-colors">
                  <Camera className="w-5 h-5 text-pink-500" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                serving main character energy ⚡️
              </p>
            </div>

            {/* Form Fields */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  The Main Plot
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    what's your name bestie? 💅
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    placeholder="spill the tea..."
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      age check? 👀
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                      placeholder="no cap"
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  The Plot Location
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      country 🌎
                    </label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    >
                      <option value="">choose your realm</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      {/* Add more countries */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      state/region 📍
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                      placeholder="the specifics"
                    />
                  </div>
                </div>
              </div>

              {/* Vibe Check Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Vibe Check
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    what's your jam? 🎵
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-black">
                    {['Gaming', 'Reading', 'Netflix & Chill', 'Touch Grass', 'TikTok', 'Gym Rat', 'Foodie', 'Travel'].map((hobby) => (
                      <label key={hobby} className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-pink-50 transition-colors">
                        <input 
                          type="checkbox"
                          name="hobbies"
                          value={hobby}
                          checked={formData.hobbies.includes(hobby)}
                          onChange={handleHobbyChange}
                          className="mr-2" 
                        />
                        <span className="text-sm">{hobby}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    looking for? 💘
                  </label>
                  <select 
                    name="orientation"
                    value={formData.orientation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  >
                    <option value="">choose your vibe</option>
                    <option value="straight">Straight</option>
                    <option value="gay">Gay</option>
                    <option value="lesbian">Lesbian</option>
                    <option value="bisexual">Bisexual</option>
                    <option value="pansexual">Pansexual</option>
                    <option value="asexual">Asexual</option>
                    <option value="queer">Queer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    spiritual status? 🙏
                  </label>
                  <select 
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-black rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  >
                    <option value="">pick your path</option>
                    <option value="atheist">Atheist (Vibing Solo)</option>
                    <option value="agnostic">Agnostic (Still Deciding)</option>
                    <option value="spiritual">Spiritual (Not Religious)</option>
                    <option value="buddhist">Buddhist</option>
                    <option value="christian">Christian</option>
                    <option value="hindu">Hindu</option>
                    <option value="jewish">Jewish</option>
                    <option value="muslim">Muslim</option>
                    <option value="other">Other (It's Complicated)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-400 
                        text-white font-semibold py-4 px-6 rounded-xl
                        hover:from-pink-600 hover:to-pink-500
                        focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
                        transform transition-all duration-200 ease-in-out
                        flex items-center justify-center space-x-2"
              >
                {loading ? 'Saving...' : 'Ready to Slay'}
                <Sparkles className="w-5 h-5" />
              </button>
            
            </div>
          </div>
        </div>
      </form>

      {/* Pretty Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 left-6 bg-white hover:bg-gray-50 
                  text-pink-500 font-medium py-2 px-4 rounded-full py-16
                  shadow-lg hover:shadow-xl
                  transition-all duration-300 ease-in-out
                  flex items-center space-x-2
                  border border-pink-100"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileSetup;