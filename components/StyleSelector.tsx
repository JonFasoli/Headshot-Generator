
import React from 'react';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle;
  onSelect: (style: HeadshotStyle) => void;
  customStyle: string;
  onCustomStyleChange: (value: string) => void;
}

const STYLE_DETAILS: Partial<Record<HeadshotStyle, { title: string; desc: string; color: string }>> = {
  [HeadshotStyle.CORPORATE]: { title: "Corporate", desc: "Suit, tie, office bg", color: "bg-slate-800" },
  [HeadshotStyle.STARTUP]: { title: "Startup", desc: "Smart casual, modern", color: "bg-blue-600" },
  [HeadshotStyle.CREATIVE]: { title: "Creative", desc: "Artistic lighting", color: "bg-purple-600" },
  [HeadshotStyle.OUTDOOR]: { title: "Outdoor", desc: "Natural light, bokeh", color: "bg-green-600" },
  [HeadshotStyle.MINIMALIST]: { title: "Minimalist", desc: "Clean studio", color: "bg-gray-400" },
  [HeadshotStyle.PIXAR]: { title: "Pixar 3D", desc: "Animated character", color: "bg-orange-500" },
  [HeadshotStyle.TED]: { title: "TED Talk", desc: "Stage lighting, mic", color: "bg-red-600" },
  [HeadshotStyle.PODCAST]: { title: "Podcast", desc: "Studio, headphones", color: "bg-pink-600" },
  [HeadshotStyle.FANTASY]: { title: "Fantasy", desc: "RPG Hero style", color: "bg-emerald-600" },
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, customStyle, onCustomStyleChange }) => {
  const styles = Object.keys(STYLE_DETAILS) as HeadshotStyle[];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">2. Select Style</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {styles.map((style) => {
          const details = STYLE_DETAILS[style];
          if (!details) return null;
          
          const isSelected = selectedStyle === style && !customStyle;
          return (
            <button
              key={style}
              onClick={() => {
                onSelect(style);
                onCustomStyleChange(''); // Clear custom text when selecting a tile
              }}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex flex-col gap-2
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }
              `}
            >
              <div className={`w-8 h-8 rounded-full ${details.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {style[0]}
              </div>
              <div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                  {details.title}
                </p>
                <p className={`text-xs ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                  {details.desc}
                </p>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4">
        <label className="block text-xs font-medium text-slate-700 mb-1">Create your own (Overrides selection)</label>
        <input
          type="text"
          value={customStyle}
          onChange={(e) => onCustomStyleChange(e.target.value)}
          placeholder="E.g., 1920s noir detective film, high contrast..."
          className={`w-full p-3 rounded-xl border ${customStyle ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all`}
        />
      </div>
    </div>
  );
};

export default StyleSelector;
