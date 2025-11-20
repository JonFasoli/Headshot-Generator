
import React from 'react';
import { ClothingOption } from '../types';

interface ClothingSelectorProps {
  selectedClothing: ClothingOption;
  onSelect: (clothing: ClothingOption) => void;
  customClothing: string;
  onCustomClothingChange: (value: string) => void;
}

const CLOTHING_DETAILS: Partial<Record<ClothingOption, { label: string; icon: string }>> = {
  [ClothingOption.DEFAULT]: { label: "Match Style", icon: "✨" },
  [ClothingOption.CHARCOAL_SUIT]: { label: "Dark Suit", icon: "👔" },
  [ClothingOption.NAVY_SUIT]: { label: "Navy Suit", icon: "👔" },
  [ClothingOption.WHITE_SHIRT]: { label: "White Shirt", icon: "👕" },
  [ClothingOption.TURTLENECK]: { label: "Turtleneck", icon: "🧶" },
  [ClothingOption.TSHIRT]: { label: "T-Shirt", icon: "👕" },
  [ClothingOption.HOODIE]: { label: "Hoodie", icon: "🧥" },
  [ClothingOption.LEATHER_JACKET]: { label: "Leather Jkt", icon: "🕶️" },
  [ClothingOption.EVENING_GOWN]: { label: "Evening Gown", icon: "👗" },
  [ClothingOption.DOCTOR_COAT]: { label: "Doctor Coat", icon: "🥼" },
  [ClothingOption.POLO_SHIRT]: { label: "Polo Shirt", icon: "👕" },
  [ClothingOption.CHECKERED_SHIRT]: { label: "Flannel", icon: "👔" },
  [ClothingOption.KNIT_SWEATER]: { label: "Sweater", icon: "🧶" },
  [ClothingOption.TWEED_JACKET]: { label: "Tweed Jkt", icon: "🧥" },
  [ClothingOption.BLUE_SCRUBS]: { label: "Scrubs", icon: "🏥" },
  [ClothingOption.CONSTRUCTION_VEST]: { label: "Worker", icon: "👷" },
  [ClothingOption.CHEF_COAT]: { label: "Chef", icon: "👨‍🍳" },
  [ClothingOption.FLORAL_DRESS]: { label: "Floral", icon: "👗" },
  [ClothingOption.TUXEDO]: { label: "Tuxedo", icon: "🤵" },
  [ClothingOption.CYBERPUNK_JACKET]: { label: "Cyberpunk", icon: "🤖" },
};

const ClothingSelector: React.FC<ClothingSelectorProps> = ({ selectedClothing, onSelect, customClothing, onCustomClothingChange }) => {
  const options = Object.keys(CLOTHING_DETAILS) as ClothingOption[];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">3. Clothing (Optional)</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {options.map((option) => {
          const details = CLOTHING_DETAILS[option];
          if (!details) return null;

          const isSelected = selectedClothing === option && !customClothing;
          return (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onCustomClothingChange('');
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
          value={customClothing}
          onChange={(e) => onCustomClothingChange(e.target.value)}
          placeholder="E.g., Vintage denim jacket with patches, Red silk kimono..."
          className={`w-full p-3 rounded-xl border ${customClothing ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all`}
        />
      </div>
    </div>
  );
};

export default ClothingSelector;
