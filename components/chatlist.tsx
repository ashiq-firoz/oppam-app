"use client";

import React from 'react';
import { Search, MoreVertical, Check, ChevronLeft } from 'lucide-react';

interface ChatPreview {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  isOnline: boolean;
}

const chats: ChatPreview[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    photo: '/api/placeholder/300/300',
    lastMessage: 'Would love to grab coffee sometime! ☕',
    time: '2m',
    unread: true,
    isOnline: true
  },
  {
    id: '2',
    name: 'Emily Parker',
    photo: '/api/placeholder/300/300',
    lastMessage: 'Thanks for the recommendation!',
    time: '1h',
    unread: false,
    isOnline: true
  },
  {
    id: '3',
    name: 'Jessica Wong',
    photo: '/api/placeholder/300/300',
    lastMessage: 'How about Saturday afternoon?',
    time: '3h',
    unread: true,
    isOnline: false
  },
  {
    id: '4',
    name: 'Amanda Liu',
    photo: '/api/placeholder/300/300',
    lastMessage: 'That sounds perfect! 😊',
    time: '1d',
    unread: false,
    isOnline: false
  },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <button className="md:hidden">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-2xl mx-auto">
        <div className="divide-y divide-gray-100">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center space-x-3 p-4 hover:bg-white/50 transition-colors cursor-pointer"
            >
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={chat.photo}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* Message Preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className={`text-xs ${chat.unread ? 'text-pink-500 font-semibold' : 'text-gray-500'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <p className={`text-sm truncate ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {!chat.unread && (
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Message Button */}
      <button className="fixed bottom-6 right-6 bg-pink-500 text-white rounded-full p-4 shadow-lg hover:bg-pink-600 transition-colors">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}