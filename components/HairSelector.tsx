
import React from 'react';
import { HairStyleOption } from '../types';

interface HairSelectorProps {
  selectedHair: HairStyleOption;
  onSelect: (hair: HairStyleOption) => void;
  customHair: string;
  onCustomHairChange: (value: string) => void;
}

const HAIR_DETAILS: Partial<Record<HairStyleOption, { label: string; icon: string }>> = {
  [HairStyleOption.DEFAULT]: { label: "Original", icon: "👤" },
  [HairStyleOption.SHORT_NEAT]: { label: "Short Neat", icon: "👨‍💼" },
  [HairStyleOption.BUZZ_CUT]: { label: "Buzz Cut", icon: "💇" },
  [HairStyleOption.BALD]: { label: "Bald", icon: "👨‍🦲" },
  [HairStyleOption.LONG_STRAIGHT]: { label: "Long Straight", icon: "👩‍🦰" },
  [HairStyleOption.LONG_WAVY]: { label: "Long Wavy", icon: "👩‍🦱" },
  [HairStyleOption.CURLY]: { label: "Curly/Afro", icon: "🧑‍🦱" },
  [HairStyleOption.BOB_CUT]: { label: "Bob Cut", icon: "👩" },
  [HairStyleOption.BUN]: { label: "Bun", icon: "👱‍♀️" },
  [HairStyleOption.PONYTAIL]: { label: "Ponytail", icon: "👱‍♀️" },
  [HairStyleOption.PIXIE_CUT]: { label: "Pixie", icon: "🧒" },
  [HairStyleOption.SIDE_PART]: { label: "Side Part", icon: "🤵" },
  [HairStyleOption.POMPADOUR]: { label: "Pompadour", icon: "😎" },
  [HairStyleOption.UNDERCUT]: { label: "Undercut", icon: "💈" },
  [HairStyleOption.DREADLOCKS]: { label: "Dreads", icon: "🧵" },
  [HairStyleOption.BRAIDS]: { label: "Braids", icon: "🥨" },
  [HairStyleOption.MESSY_SHAG]: { label: "Shag", icon: "🦁" },
  [HairStyleOption.MULLET]: { label: "Mullet", icon: "🎸" },
  [HairStyleOption.SPIKY]: { label: "Spiky", icon: "🦔" },
  [HairStyleOption.WAVY_LOB]: { label: "Wavy Lob", icon: "💁‍♀️" },
};

const HairSelector: React.FC<HairSelectorProps> = ({ selectedHair, onSelect, customHair, onCustomHairChange }) => {
  const options = Object.keys(HAIR_DETAILS) as HairStyleOption[];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">4. Hair Style (Optional)</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {options.map((option) => {
          const details = HAIR_DETAILS[option];
          if (!details) return null;

          const isSelected = selectedHair === option && !customHair;
          return (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onCustomHairChange('');
              }}
              className={`
                p-2 rounded-lg border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 min-h-[80px]
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }
              `}
            >
              <span className="text-2xl" role="img" aria-label={details.label}>
                {details.icon}
              </span>
              <span className={`text-xs font-medium leading-tight ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                {details.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-slate-700 mb-1">Create your own (Overrides selection)</label>
        <input
          type="text"
          value={customHair}
          onChange={(e) => onCustomHairChange(e.target.value)}
          placeholder="E.g., Rainbow colored mohawk, Platinum blonde finger waves..."
          className={`w-full p-3 rounded-xl border ${customHair ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all`}
        />
      </div>
    </div>
  );
};

export default HairSelector;
