"use client"
import React, { useState, ChangeEvent } from 'react';
import { Camera, Sparkles, MapPin, Heart, Music, Coffee, Palette } from 'lucide-react';

interface FormData {
  name: string;
  age: string;
  country: string;
  state: string;
  hobbies: string[];
  orientation: string;
  religion: string;
}

const ProfileSetup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    country: '',
    state: '',
    hobbies: [],
    orientation: '',
    religion: ''
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHobbyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      hobbies: checked 
        ? [...prev.hobbies, value]
        : prev.hobbies.filter(hobby => hobby !== value)
    }));
  };

  return (
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
                onChange={handleImageUpload}
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
            onClick={() => console.log(formData)}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 
                     text-white font-semibold py-4 px-6 rounded-xl
                     hover:from-pink-600 hover:to-pink-500
                     focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
                     transform transition-all duration-200 ease-in-out
                     flex items-center justify-center space-x-2"
          >
            <span>Ready to Slay</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;