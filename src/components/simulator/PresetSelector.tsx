'use client';

import { PRESET_SCENARIOS } from '@/lib/uv-calculator';
import { PresetScenario } from '@/types';
import { Sun, CloudSun, Building, ShoppingBag, Sparkles } from 'lucide-react';

interface PresetSelectorProps {
  activePreset?: string;
  onSelectPreset: (preset: PresetScenario) => void;
}

export default function PresetSelector({ activePreset, onSelectPreset }: PresetSelectorProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-amber-200" />;
      case 'Building':
        return <Building className="w-5 h-5 text-orange-300" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-amber-500" />;
      default:
        return <Sun className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="bg-[#1b1009]/90 border border-[#3d2314]/80 rounded-2xl p-7 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center gap-2.5">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
          สถานการณ์จำลองสำเร็จรูป (Quick Scenarios)
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRESET_SCENARIOS.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-br from-amber-950/90 via-orange-950/90 to-stone-900/90 border-amber-500/80 shadow-lg shadow-amber-950/80 scale-[1.02]'
                  : 'bg-[#140b07]/80 border-[#381f11]/80 hover:bg-[#26150c] hover:border-[#522f1b]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-lg bg-[#140b07] border border-[#3d2314]">
                  {getIcon(preset.icon)}
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#28170d] text-amber-200 border border-[#4a2e1b]">
                  UV Index {preset.uvIndex}
                </span>
              </div>
              <span className="font-bold text-sm text-amber-50 mb-1.5 leading-snug">{preset.title}</span>
              <p className="text-xs text-[#c9a68f] leading-relaxed line-clamp-2">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
