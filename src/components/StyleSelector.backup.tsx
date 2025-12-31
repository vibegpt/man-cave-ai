'use client';

import { useState } from 'react';

interface StyleSelectorProps {
  onStyleSelect: (styleId: string, customDescription?: string) => void;
}

const STYLES = [
  { id: 'gaming', name: 'Gaming Paradise', emoji: '🎮' },
  { id: 'sports_bar', name: 'Sports Bar', emoji: '🏈' },
  { id: 'home_theater', name: 'Home Theater', emoji: '🎬' },
  { id: 'workshop', name: 'Workshop', emoji: '🔨' },
  { id: 'retro_arcade', name: 'Retro Arcade', emoji: '👾' },
  { id: 'whiskey_lounge', name: 'Whiskey Lounge', emoji: '🥃' },
  { id: 'golf_simulator', name: 'Golf Simulator', emoji: '⛳' },
  { id: 'poker_room', name: 'Poker Room', emoji: '♠️' },
  { id: 'music_studio', name: 'Music Studio', emoji: '🎸' },
  { id: 'industrial_loft', name: 'Industrial Loft', emoji: '🏭' },
  { id: 'cigar_lounge', name: 'Cigar Lounge', emoji: '🚬' },
  { id: 'home_office', name: 'Man Cave Office', emoji: '💼' },
];

export default function StyleSelector({ onStyleSelect }: StyleSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDescription, setCustomDescription] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Style</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className="bg-gray-800 hover:bg-orange-500 p-6 rounded-lg transition text-center group"
          >
            <div className="text-4xl mb-2">{style.emoji}</div>
            <div className="text-sm font-medium">{style.name}</div>
          </button>
        ))}
        
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="bg-gray-800 hover:bg-purple-500 p-6 rounded-lg transition text-center border-2 border-dashed border-gray-600"
        >
          <div className="text-4xl mb-2">✨</div>
          <div className="text-sm font-medium">Custom Design</div>
        </button>
      </div>

      {showCustom && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="font-bold mb-3">Describe Your Vision</h3>
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Example: A cozy reading nook with leather chairs, dark wood shelves, and warm lighting..."
            className="w-full bg-gray-900 text-white p-4 rounded border border-gray-700 min-h-32 mb-4"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{customDescription.length}/500</span>
            <button
              onClick={() => {
                if (customDescription.length > 20) {
                  onStyleSelect('custom', customDescription);
                } else {
                  alert('Please write at least 20 characters');
                }
              }}
              disabled={customDescription.length < 20}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 px-6 py-2 rounded font-medium"
            >
              Use Custom Design →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
