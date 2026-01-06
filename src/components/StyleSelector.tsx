'use client';

import { useState } from 'react';

interface StyleSelectorProps {
  onStyleSelect: (styleId: string, customDescription?: string) => void;
  selectedStyle?: string;
  compact?: boolean;
}

const STYLES = [
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'sports_bar', name: 'Sports Bar', icon: '🏈' },
  { id: 'theater', name: 'Theater', icon: '🎬' },
  { id: 'golf_simulator', name: 'Golf Sim', icon: '⛳' },
];

export default function StyleSelector({ onStyleSelect, selectedStyle, compact = false }: StyleSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDescription, setCustomDescription] = useState('');

  if (compact) {
    // Compact grid layout for side-by-side view
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
        <div className="grid grid-cols-2 gap-2">
          {STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => onStyleSelect(style.id)}
                className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-1.5">{style.icon}</span>
                {style.name}
              </button>
            );
          })}
        </div>
        
        {/* Custom Button */}
        <button
          onClick={() => {
            setShowCustom(!showCustom);
            if (!showCustom) {
              onStyleSelect('custom', customDescription || 'Custom design');
            }
          }}
          className={`w-full mt-2 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
            selectedStyle === 'custom'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span className="mr-1.5">✨</span>
          Custom
        </button>

        {showCustom && (
          <div className="mt-3 space-y-2">
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Describe your custom design..."
              className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none text-sm min-h-20"
              maxLength={300}
            />
            <button
              onClick={() => {
                if (customDescription.length > 10) {
                  onStyleSelect('custom', customDescription);
                  setShowCustom(false);
                }
              }}
              disabled={customDescription.length < 10}
              className="w-full text-sm py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg transition"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default full-width layout
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
        Choose Style
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2">
        {STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
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
        
        <button
          onClick={() => {
            setShowCustom(!showCustom);
            if (!showCustom) {
              onStyleSelect('custom', customDescription || 'Custom design');
            }
          }}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            selectedStyle === 'custom'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="mr-2">✨</span>
          Custom
        </button>
      </div>

      {showCustom && (
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Example: A cozy whiskey lounge with leather chairs..."
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none text-sm min-h-20"
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-2">
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
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
