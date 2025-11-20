
import React from 'react';
import { PoseOption } from '../types';

interface PoseSelectorProps {
  selectedPose: PoseOption;
  onSelect: (pose: PoseOption) => void;
  customPose: string;
  onCustomPoseChange: (value: string) => void;
}

const POSE_DETAILS: Partial<Record<PoseOption, { label: string; icon: string }>> = {
  [PoseOption.DEFAULT]: { label: "Standard", icon: "👤" },
  [PoseOption.ARMS_CROSSED]: { label: "Arms Crossed", icon: "🙅‍♂️" },
  [PoseOption.HANDS_ON_HIPS]: { label: "Hands on Hips", icon: "🧍‍♂️" },
  [PoseOption.HAND_ON_CHIN]: { label: "Thinking", icon: "🤔" },
  [PoseOption.LEANING]: { label: "Leaning", icon: "🧱" },
  [PoseOption.SITTING]: { label: "Sitting", icon: "🪑" },
  [PoseOption.SIDE_PROFILE]: { label: "Side Profile", icon: "🌓" },
  [PoseOption.WALKING]: { label: "Walking", icon: "🚶" },
  [PoseOption.HANDS_CLASPED]: { label: "Hands Clasped", icon: "🤝" },
  [PoseOption.LOOKING_OVER_SHOULDER]: { label: "Looking Back", icon: "👀" },
};

const PoseSelector: React.FC<PoseSelectorProps> = ({ selectedPose, onSelect, customPose, onCustomPoseChange }) => {
  const options = Object.keys(POSE_DETAILS) as PoseOption[];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">5. Pose (Optional)</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {options.map((option) => {
          const details = POSE_DETAILS[option];
          if (!details) return null;

          const isSelected = selectedPose === option && !customPose;
          return (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onCustomPoseChange('');
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
          value={customPose}
          onChange={(e) => onCustomPoseChange(e.target.value)}
          placeholder="E.g., Jumping in the air, pointing at camera..."
          className={`w-full p-3 rounded-xl border ${customPose ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all`}
        />
      </div>
    </div>
  );
};

export default PoseSelector;
