"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  ChevronLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile 
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hey! How's your day going?",
    sender: 'other',
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    text: "It's going great! Just finished a really interesting project at work.",
    sender: 'me',
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    text: "That sounds awesome! Want to grab coffee and tell me more?",
    sender: 'other',
    timestamp: '2:33 PM'
  },
  {
    id: '4',
    text: "Definitely! How about Saturday?",
    sender: 'me',
    timestamp: '2:34 PM'
  }
];

export default function ChatDetailPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: `${messages.length + 1}`,
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 flex flex-col">
      {/* Chat Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <button className="md:hidden">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/api/placeholder/300/300" 
                    alt="Sarah Chen" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Sarah Chen</h2>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl w-full mx-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[75%] p-3 rounded-2xl
                ${message.sender === 'me' 
                  ? 'bg-pink-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-900 rounded-bl-none shadow-sm'}
              `}
            >
              <p className="text-sm">{message.text}</p>
              <div 
                className={`
                  text-xs mt-1
                  ${message.sender === 'me' 
                    ? 'text-pink-100 text-right' 
                    : 'text-gray-500 text-left'}
                `}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          {/* Additional Action Buttons */}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>

          {/* Text Input */}
          <div className="flex-1">
            <input 
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full px-3 py-2 text-black bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Send Button */}
          <button 
            onClick={sendMessage}
            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}