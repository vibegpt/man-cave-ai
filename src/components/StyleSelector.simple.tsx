'use client';

import { useState } from 'react';

interface StyleSelectorProps {
  onStyleSelect: (styleId: string, customDescription?: string) => void;
  selectedStyle?: string;
}

// Simple 5-style MVP version
const STYLES = [
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'sports_bar', name: 'Sports Bar', icon: '🏈' },
  { id: 'theater', name: 'Theater', icon: '🎬' },
  { id: 'golf_simulator', name: 'Golf Simulator', icon: '⛳' },
];

export default function StyleSelector({ onStyleSelect, selectedStyle }: StyleSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDescription, setCustomDescription] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Choose Style
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => onStyleSelect(style.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{style.icon}</span>
                {style.name}
              </button>
            );
          })}
          
          {/* Custom Button */}
          <button
            onClick={() => {
              setShowCustom(!showCustom);
              if (!showCustom) {
                onStyleSelect('custom', customDescription || 'Custom design');
              }
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedStyle === 'custom'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-2">✨</span>
            Custom
          </button>
        </div>
      </div>

      {/* Custom Description Expanded */}
      {showCustom && (
        <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-800">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe your custom design
          </label>
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Example: A cozy whiskey lounge with leather chairs and dark wood..."
            className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none min-h-24 text-sm"
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{customDescription.length}/300</span>
            <button
              onClick={() => {
                if (customDescription.length > 10) {
                  onStyleSelect('custom', customDescription);
                  setShowCustom(false);
                }
              }}
              disabled={customDescription.length < 10}
              className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg transition"
            >
              Use Custom Description
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
