'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StyleSelectorProps {
  onStyleSelect: (styleId: string, customDescription?: string) => void;
}

const STYLES = [
  { id: 'gaming', name: 'Gaming Paradise', preview: '/style-previews/gaming.jpg' },
  { id: 'sports_bar', name: 'Sports Bar', preview: '/style-previews/sports-bar.png' },
  { id: 'home_theater', name: 'Home Theater', preview: '/style-previews/home-theater.png' },
  { id: 'workshop', name: 'Workshop', preview: '/style-previews/workshop.jpg' },
  { id: 'retro_arcade', name: 'Retro Arcade', preview: '/style-previews/retro-arcade.jpg' },
  { id: 'whiskey_lounge', name: 'Whiskey Lounge', preview: '/style-previews/whiskey-lounge.jpg' },
  { id: 'golf_simulator', name: 'Golf Simulator', preview: '/style-previews/golf-simulator.jpg' },
  { id: 'poker_room', name: 'Poker Room', preview: '/style-previews/poker-room.jpg' },
  { id: 'music_studio', name: 'Music Studio', preview: '/style-previews/music-studio.jpg' },
  { id: 'industrial_loft', name: 'Industrial Loft', preview: '/style-previews/industrial-loft.jpg' },
  { id: 'cigar_lounge', name: 'Cigar Lounge', preview: '/style-previews/cigar-lounge.jpg' },
  { id: 'home_office', name: 'Man Cave Office', preview: '/style-previews/home-office.jpg' },
];

export default function StyleSelector({ onStyleSelect }: StyleSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDescription, setCustomDescription] = useState('');
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Select Your Design Style</h2>
      <p className="text-gray-400 text-center mb-10 text-lg">Choose from professionally designed man cave concepts</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            className="relative bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 group h-56 border-2 border-gray-700 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
          >
            {style.preview && (
              <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
                <Image
                  src={style.preview}
                  alt={style.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="relative h-full flex items-end p-6">
              <div className="w-full">
                <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  {style.name}
                </h3>
              </div>
            </div>

            {hoveredStyle === style.id && (
              <div className="absolute inset-0 bg-orange-500/10 backdrop-blur-[1px]" />
            )}
          </button>
        ))}
        
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="relative bg-gradient-to-br from-purple-900/40 to-purple-700/20 rounded-xl transition-all duration-300 h-56 border-2 border-dashed border-purple-500/60 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 group"
        >
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Custom Design</h3>
            <p className="text-sm text-purple-300">Describe your unique vision</p>
          </div>
        </button>
      </div>

      {showCustom && (
        <div className="bg-gray-800 p-8 rounded-xl border-2 border-purple-500/30 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Create Your Custom Design</h3>
            <p className="text-gray-400">Describe your ideal man cave in detail and our AI will bring it to life</p>
          </div>
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Example: A sophisticated whiskey lounge with dark leather chairs, mahogany wood paneling, vintage bourbon barrel decor, warm Edison lighting, and a small bar area with glass shelving..."
            className="w-full bg-gray-900 text-white p-5 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none min-h-40 mb-4 text-base"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{customDescription.length}/500 characters</span>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCustom(false);
                  setCustomDescription('');
                }}
                className="text-gray-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (customDescription.length > 20) {
                    onStyleSelect('custom', customDescription);
                  } else {
                    alert('Please provide at least 20 characters describing your vision');
                  }
                }}
                disabled={customDescription.length < 20}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-purple-500/30"
              >
                Generate Custom Design
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Select a style above to see your space transformed by AI in seconds
        </p>
      </div>
    </div>
  );
}
