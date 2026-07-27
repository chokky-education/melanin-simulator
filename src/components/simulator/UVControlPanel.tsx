'use client';

import { SimulatorSettings, ProtectionBehaviors, FitzpatrickScale } from '@/types';
import { FITZPATRICK_DATA } from '@/lib/uv-calculator';

interface UVControlPanelProps {
  settings: SimulatorSettings;
  onSettingsChange: (settings: SimulatorSettings) => void;
  behaviors: ProtectionBehaviors;
  onBehaviorsChange: (behaviors: ProtectionBehaviors) => void;
  protectionScore: number;
}

export default function UVControlPanel({
  settings,
  onSettingsChange,
  behaviors,
  onBehaviorsChange,
  protectionScore,
}: UVControlPanelProps) {
  const skinTypeLabels: Record<number, string> = {
    1: 'Type I: ผิวขาวมาก',
    2: 'Type II: ผิวขาว',
    3: 'Type III: ผิวขาวเหลือง',
    4: 'Type IV: ผิวสองสี',
    5: 'Type V: ผิวสีน้ำตาลเข้ม',
    6: 'Type VI: ผิวสีเข้มมาก',
  };

  return (
    <aside className="w-full flex flex-col gap-6 h-full">
      {/* Stitch Control Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-6 border border-gray-200">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
          <span className="material-symbols-outlined text-[#855300]">tune</span>
          <h2 className="text-xl font-bold text-[#191c1e]">กำหนดสถานการณ์</h2>
        </div>

        {/* Sliders Group */}
        <div className="space-y-6">
          {/* UV Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                ระดับรังสี UV (UV Index)
              </label>
              <span className="text-[#131b2e] font-bold text-base bg-gray-100 px-2.5 py-0.5 rounded-md">
                {settings.uvIndex}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={11}
              value={settings.uvIndex}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  uvIndex: Number(e.target.value),
                })
              }
              className="accent-[#131b2e]"
            />
            <div className="flex justify-between text-[11px] text-[#76777d] font-medium">
              <span>ต่ำ (1)</span>
              <span>ปานกลาง (6)</span>
              <span>สูงมาก (11)</span>
            </div>
          </div>

          {/* UVA/UVB Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                สัดส่วน UVA / UVB
              </label>
              <span className="text-[#855300] font-bold text-base bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {settings.uvaPercentage}:{100 - settings.uvaPercentage}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={settings.uvaPercentage}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  uvaPercentage: Number(e.target.value),
                  uvType: 'Mixed',
                })
              }
              className="accent-[#fea619]"
            />
            <div className="flex justify-between text-[11px] text-[#76777d] font-medium">
              <span>UVA {settings.uvaPercentage}%</span>
              <span>UVB {100 - settings.uvaPercentage}%</span>
            </div>
          </div>

          {/* Base Melanin */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#45464d] uppercase tracking-wider">
                ระดับเมลานินพื้นฐาน (Skin Tone)
              </label>
              <span className="text-[#131b2e] font-bold text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                Type {settings.fitzpatrickScale}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              value={settings.fitzpatrickScale}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  fitzpatrickScale: Number(e.target.value) as FitzpatrickScale,
                })
              }
              className="accent-[#131b2e]"
            />
            <div className="text-xs font-medium text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center justify-between">
              <span>{skinTypeLabels[settings.fitzpatrickScale]}</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-400 shrink-0"
                style={{ backgroundColor: FITZPATRICK_DATA[settings.fitzpatrickScale].colorHex }}
              />
            </div>
          </div>
        </div>

        {/* Protection Behaviors Buttons from Stitch */}
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#45464d]">
            พฤติกรรมป้องกัน (Protection Layers)
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {/* Sunscreen */}
            <button
              onClick={() =>
                onBehaviorsChange({
                  ...behaviors,
                  useSunscreen: !behaviors.useSunscreen,
                })
              }
              className={`toggle-press flex items-center justify-between p-3 rounded-xl border transition-all ${
                behaviors.useSunscreen
                  ? 'bg-[#00201d] text-white border-[#0c9488] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#191c1e] border-gray-200 hover:bg-[#e6e8ea]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">sanitizer</span>
                <span className="text-xs font-semibold">ทาครีมกันแดด (SPF 50+)</span>
              </div>
              <span className={`material-symbols-outlined text-lg ${behaviors.useSunscreen ? 'opacity-100' : 'opacity-0'}`}>
                check_circle
              </span>
            </button>

            {/* Protective Clothing */}
            <button
              onClick={() =>
                onBehaviorsChange({
                  ...behaviors,
                  wearProtectiveClothing: !behaviors.wearProtectiveClothing,
                })
              }
              className={`toggle-press flex items-center justify-between p-3 rounded-xl border transition-all ${
                behaviors.wearProtectiveClothing
                  ? 'bg-[#00201d] text-white border-[#0c9488] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#191c1e] border-gray-200 hover:bg-[#e6e8ea]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">checkroom</span>
                <span className="text-xs font-semibold">สวมเสื้อผ้าแขนยาว UPF 50+</span>
              </div>
              <span className={`material-symbols-outlined text-lg ${behaviors.wearProtectiveClothing ? 'opacity-100' : 'opacity-0'}`}>
                check_circle
              </span>
            </button>

            {/* Avoid Peak Hours */}
            <button
              onClick={() =>
                onBehaviorsChange({
                  ...behaviors,
                  avoidPeakHours: !behaviors.avoidPeakHours,
                })
              }
              className={`toggle-press flex items-center justify-between p-3 rounded-xl border transition-all ${
                behaviors.avoidPeakHours
                  ? 'bg-[#00201d] text-white border-[#0c9488] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#191c1e] border-gray-200 hover:bg-[#e6e8ea]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">event_busy</span>
                <span className="text-xs font-semibold">เลี่ยงช่วงแดดจัด (11:00 - 15:00)</span>
              </div>
              <span className={`material-symbols-outlined text-lg ${behaviors.avoidPeakHours ? 'opacity-100' : 'opacity-0'}`}>
                check_circle
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Stitch Protection Stats Card */}
      <div className={`bg-[#131b2e] p-6 rounded-2xl text-white shadow-sm overflow-hidden relative ${protectionScore === 100 ? 'animate-celebrate' : ''}`}>
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-gray-300 mb-2">สรุปสถานะการป้องกัน</h3>
          <div className="flex items-end gap-3">
            <span className={`text-3xl font-bold transition-colors duration-300 ${protectionScore === 100 ? 'text-[#89f5e7]' : 'text-amber-400'}`}>
              {protectionScore}%
            </span>
            <span className="text-xs text-gray-300 mb-1">
              {protectionScore === 100 ? 'ป้องกันครบถ้วนแล้ว ✓' : 'ความปลอดภัยโดยรวม'}
            </span>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-white">shield</span>
        </div>
      </div>
    </aside>
  );
}
