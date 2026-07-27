'use client';

import { ProtectionBehaviors } from '@/types';
import { ShieldCheck, Sparkles, Shirt, Umbrella, RefreshCw } from 'lucide-react';

interface BehaviorSelectorProps {
  behaviors: ProtectionBehaviors;
  onBehaviorsChange: (behaviors: ProtectionBehaviors) => void;
}

export default function BehaviorSelector({
  behaviors,
  onBehaviorsChange,
}: BehaviorSelectorProps) {
  const spfOptions = [
    { value: 15, label: 'SPF 15 (กัน UVB 93.3%)' },
    { value: 30, label: 'SPF 30 (กัน UVB 96.7%)' },
    { value: 50, label: 'SPF 50 (กัน UVB 98.0%)' },
    { value: 50.1, label: 'SPF 50+ (กัน UVB 98.5%)' },
  ];

  const paOptions = [
    { value: 'PA+', label: 'PA+ (กัน UVA เริ่มต้น)' },
    { value: 'PA++', label: 'PA++ (กัน UVA ปานกลาง)' },
    { value: 'PA+++', label: 'PA+++ (กัน UVA สูง)' },
    { value: 'PA++++', label: 'PA++++ (กัน UVA สูงสุด)' },
  ];

  return (
    <div className="bg-[#1b1009]/90 border border-[#3d2314]/80 rounded-2xl p-7 sm:p-8 shadow-xl backdrop-blur-md space-y-7">
      <div className="flex items-center gap-3 border-b border-[#3b2214]/80 pb-5">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-amber-100 leading-snug">2. เลือกพฤติกรรมการป้องกันแสงแดด</h2>
          <p className="text-xs text-[#c9a68f] mt-0.5">ทดลองเปิด/ปิด หรือปรับระดับอุปกรณ์ป้องกัน</p>
        </div>
      </div>

      {/* Sunscreen Section */}
      <div className="space-y-4 bg-[#140b07] p-5 rounded-2xl border border-[#381f11]">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <input
              type="checkbox"
              checked={behaviors.useSunscreen}
              onChange={(e) =>
                onBehaviorsChange({ ...behaviors, useSunscreen: e.target.checked })
              }
              className="w-5 h-5 text-amber-600 rounded bg-[#28170d] border-[#4a2e1b] focus:ring-amber-500 accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-sm text-amber-100 group-hover:text-amber-300 transition-colors">
                ใช้ครีมกันแดด (Apply Sunscreen)
              </span>
            </div>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border ${
              behaviors.useSunscreen
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#28170d] text-[#a8826b]'
            }`}
          >
            {behaviors.useSunscreen ? 'เปิดใช้งาน' : 'ปิด'}
          </span>
        </label>

        {behaviors.useSunscreen && (
          <div className="pl-8 pt-3 space-y-4 border-t border-[#381f11]">
            <div>
              <label className="text-xs font-semibold text-amber-200 mb-2 block">
                เลือกค่า SPF (ป้องกันรังสี UVB - ผิวไหม้แดง)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {spfOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      onBehaviorsChange({ ...behaviors, sunscreenSPF: opt.value })
                    }
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      behaviors.sunscreenSPF === opt.value
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-[#1b1009] text-amber-200 border-[#381f11] hover:bg-[#28170d]'
                    }`}
                  >
                    {opt.value === 50.1 ? 'SPF 50+' : `SPF ${opt.value}`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-amber-200 mb-2 block">
                เลือกค่า PA Rating (ป้องกันรังสี UVA - ชะลอแก่/ฝ้ากระ)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {paOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      onBehaviorsChange({ ...behaviors, sunscreenPA: opt.value })
                    }
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      behaviors.sunscreenPA === opt.value
                        ? 'bg-orange-600 text-white border-orange-400 shadow-md'
                        : 'bg-[#1b1009] text-amber-200 border-[#381f11] hover:bg-[#28170d]'
                    }`}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={behaviors.reapplySunscreen}
                onChange={(e) =>
                  onBehaviorsChange({ ...behaviors, reapplySunscreen: e.target.checked })
                }
                className="w-4 h-4 text-amber-600 rounded bg-[#28170d] border-[#4a2e1b] focus:ring-amber-500 accent-amber-500"
              />
              <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-xs text-[#d4b098] font-medium">
                ทาซ้ำทุก 2 ชั่วโมง (Reapply every 2 hours)
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Protective Clothing */}
      <div className="bg-[#140b07] p-5 rounded-2xl border border-[#381f11]">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <input
              type="checkbox"
              checked={behaviors.wearProtectiveClothing}
              onChange={(e) =>
                onBehaviorsChange({
                  ...behaviors,
                  wearProtectiveClothing: e.target.checked,
                })
              }
              className="w-5 h-5 text-amber-600 rounded bg-[#28170d] border-[#4a2e1b] focus:ring-amber-500 accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center gap-2.5">
              <Shirt className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-amber-100 group-hover:text-amber-300 transition-colors block">
                  สวมสิ่งกำบังและเสื้อผ้าป้องกันแดด (UPF 50+)
                </span>
                <span className="text-xs text-[#c9a68f] leading-relaxed block mt-0.5">
                  หมวกปีกกว้าง เสื้อแขนยาว UPF 50+ หรือกางร่มกัน UV
                </span>
              </div>
            </div>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border ${
              behaviors.wearProtectiveClothing
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#28170d] text-[#a8826b]'
            }`}
          >
            {behaviors.wearProtectiveClothing ? 'เปิดใช้งาน' : 'ปิด'}
          </span>
        </label>
      </div>

      {/* Avoid Peak Hours */}
      <div className="bg-[#140b07] p-5 rounded-2xl border border-[#381f11]">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <input
              type="checkbox"
              checked={behaviors.avoidPeakHours}
              onChange={(e) =>
                onBehaviorsChange({ ...behaviors, avoidPeakHours: e.target.checked })
              }
              className="w-5 h-5 text-amber-600 rounded bg-[#28170d] border-[#4a2e1b] focus:ring-amber-500 accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center gap-2.5">
              <Umbrella className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-sm text-amber-100 group-hover:text-amber-300 transition-colors block">
                  อยู่ใต้ร่มเงา / หลีกเลี่ยงแดดจัด (10:00 - 16:00 น.)
                </span>
                <span className="text-xs text-[#c9a68f] leading-relaxed block mt-0.5">
                  ช่วยลดปริมาณรังสี UV โดยตรงที่ตกกระทบผิวหนังลง 60%+
                </span>
              </div>
            </div>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border ${
              behaviors.avoidPeakHours
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#28170d] text-[#a8826b]'
            }`}
          >
            {behaviors.avoidPeakHours ? 'เปิดใช้งาน' : 'ปิด'}
          </span>
        </label>
      </div>
    </div>
  );
}
