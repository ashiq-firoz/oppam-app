"use client";

import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  age: number;
  photo: string;
  lastActive: string;
}

const matches: Match[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    photo: '/api/placeholder/300/300',
    lastActive: '3m ago'
  },
  {
    id: '2',
    name: 'Emily Parker',
    age: 26,
    photo: '/api/placeholder/300/300',
    lastActive: '1h ago'
  },
  {
    id: '3',
    name: 'Jessica Wong',
    age: 29,
    photo: '/api/placeholder/300/300',
    lastActive: '12m ago'
  },
  {
    id: '4',
    name: 'Amanda Liu',
    age: 27,
    photo: '/api/placeholder/300/300',
    lastActive: 'Just now'
  },
];

export default function MatchesPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            <span className="text-pink-500 font-medium">{matches.length}</span>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-102 hover:shadow-md"
            >
              <div className="aspect-square relative">
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">
                      {match.name}, {match.age}
                    </h3>
                    <p className="text-sm text-gray-200">
                      Active {match.lastActive}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  onClick={() => console.log(`Message ${match.name}`)}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}