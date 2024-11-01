"use client"
import React, { useState } from 'react';
import { Heart, X, MessageCircle, User, Sparkles, MapPin, Coffee, Music } from 'lucide-react';
import MatchesPage from './matches';
import MessagesPage from './chatlist';
import ProfileSetup from './profile';

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  hobbies: string[];
  image: string;
  distance: string;
}

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  // Sample profiles data
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Emma',
      age: 24,
      location: 'New York',
      bio: 'Just a coffee lover trying to find my matcha ☕️',
      hobbies: ['Travel', 'Music', 'Art'],
      image: '/api/placeholder/400/500',
      distance: '2 miles away'
    },
    {
      id: '2',
      name: 'Alex',
      age: 26,
      location: 'Brooklyn',
      bio: 'Looking for someone to share memes with 😌',
      hobbies: ['Gaming', 'Netflix', 'Foodie'],
      image: '/api/placeholder/400/500',
      distance: '5 miles away'
    },
    // Add more profiles as needed
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection === 'right') {
      handleLike();
    } else if (swipeDirection === 'left') {
      handleReject();
    }
    setOffsetX(0);
    setSwipeDirection(null);
  };

  const handleLike = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleReject = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-pink-500">OPUM</h1>
          </div>
        </div>
      </nav>
      

      {/* Main Content */}
      <div className="pt-16 pb-20 px-4">
      {activeTab == "home"?
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
          {profiles[currentIndex] && (
            <div 
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition-transform"
              style={{
                transform: `translateX(${offsetX}px) rotate(${offsetX * 0.02}deg)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Profile Image */}
              <div className="relative aspect-[3/4]">
                <img 
                  src={profiles[currentIndex].image}
                  alt={profiles[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">
                      {profiles[currentIndex].name}, {profiles[currentIndex].age}
                    </h2>
                    <p className="flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      {profiles[currentIndex].distance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 space-y-4">
                {/* Bio */}
                <p className="text-gray-700">{profiles[currentIndex].bio}</p>

                {/* Hobbies */}
                <div className="flex flex-wrap gap-2">
                  {profiles[currentIndex].hobbies.map((hobby) => (
                    <span 
                      key={hobby}
                      className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>

                {/* Swipe Instructions */}
                <div className="flex justify-center text-sm text-gray-500 pt-2">
                  <p>← Swipe left to pass • Swipe right to match →</p>
                </div>
              </div>

              {/* Swipe Indicators */}
              {swipeDirection === 'right' && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full transform rotate-12">
                  LIKE
                </div>
              )}
              {swipeDirection === 'left' && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full transform -rotate-12">
                  PASS
                </div>
              )}
            </div>
          )}
        </div>
        :null}

        {activeTab == "messages"? <MessagesPage/> : null}

        {activeTab == "matches"? <MatchesPage/> : null}

        {activeTab == "profile"? <ProfileSetup/>: null}


      </div>
      

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-3">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center ${activeTab === 'home' ? 'text-pink-500' : 'text-gray-500'}`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1">Discover</span>
            </button>
            <button 
              onClick={() => setActiveTab('matches')}
              className={`flex flex-col items-center ${activeTab === 'matches' ? 'text-pink-500' : 'text-gray-500'}`}
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1">Matches</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center ${activeTab === 'messages' ? 'text-pink-500' : 'text-gray-500'}`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Messages</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-pink-500' : 'text-gray-500'}`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;