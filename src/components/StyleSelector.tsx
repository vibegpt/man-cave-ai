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
      <div className="rounded-xl border border-gray-800 bg-[#111] p-4">
        <div className="grid grid-cols-2 gap-2">
          {STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => onStyleSelect(style.id)}
                className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white border border-red-500'
                    : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222] border border-gray-800 hover:border-red-500/30'
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
              ? 'bg-red-600 text-white border border-red-500'
              : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222] border border-gray-800 hover:border-red-500/30'
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
              className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm min-h-20"
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
              className="w-full text-sm py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg transition"
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
    <div className="rounded-xl border border-gray-800 bg-[#111] p-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
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
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 border border-red-500'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222] hover:text-white border border-gray-800 hover:border-red-500/30'
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
              ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 border border-red-500'
              : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222] hover:text-white border border-gray-800 hover:border-red-500/30'
          }`}
        >
          <span className="mr-2">✨</span>
          Custom
        </button>
      </div>

      {showCustom && (
        <div className="mt-4 bg-[#0f0f0f] rounded-lg p-4 border border-gray-800">
          <textarea
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Example: A cozy whiskey lounge with leather chairs..."
            className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm min-h-20"
            maxLength={300}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-600">{customDescription.length}/300</span>
            <button
              onClick={() => {
                if (customDescription.length > 10) {
                  onStyleSelect('custom', customDescription);
                  setShowCustom(false);
                }
              }}
              disabled={customDescription.length < 10}
              className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
