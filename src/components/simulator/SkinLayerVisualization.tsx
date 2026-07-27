'use client';

import { useState } from 'react';
import { UVResult, UVType, ProtectionBehaviors, FitzpatrickScale } from '@/types';
import { FITZPATRICK_DATA } from '@/lib/uv-calculator';

interface SkinLayerVisualizationProps {
  result: UVResult;
  uvType: UVType;
  uvaPercentage: number;
  behaviors: ProtectionBehaviors;
  fitzpatrickScale: FitzpatrickScale;
}

import Skin3DExplorerModal from './Skin3DExplorerModal';

export default function SkinLayerVisualization({
  result,
  uvType,
  uvaPercentage,
  behaviors,
  fitzpatrickScale,
}: SkinLayerVisualizationProps) {
  const [activeModal, setActiveModal] = useState<'Epidermis' | 'Dermis' | 'Subcutaneous' | null>(null);
  const [is3DOpen, setIs3DOpen] = useState(false);

  const getRiskBadgeStyle = (risk: string) => {
    switch (risk) {
      case 'ต่ำ':
        return 'bg-[#00201d]/10 text-[#0c9488] border-[#0c9488]/30';
      case 'ปานกลาง':
        return 'bg-amber-50 text-amber-800 border-amber-300 font-semibold';
      case 'สูง':
      case 'สูงมาก':
        return 'bg-rose-50 text-rose-800 border-rose-300 font-semibold';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const facts = [
    'UVA สามารถทะลุผ่านกระจกและก้อนเมฆได้ 95% แม้ในวันที่ไม่มีแดดจัด',
    'การทาครีมกันแดด SPF 50+ ช่วยบล็อก UVB ได้กว่า 98% แต่ต้องทาในปริมาณที่เหมาะสม',
    'เมลานินคือเม็ดสีธรรมชาติที่ช่วยปกป้องผิวจากแสงแดด คนที่มีผิวเข้มจึงมีความเสี่ยงโรคมะเร็งผิวน้อยกว่า',
    'ค่า UV Index สูงสุดในช่วง 11:00 - 15:00 น. ควรหลีกเลี่ยงการออกแดดโดยตรง',
    'UVB เป็นสาเหตุหลักของผิวไหม้แดด (Sunburn) ขณะที่ UVA ทำลายลึกถึงชั้นหนังแท้',
  ];

  const currentFact =
    result.overallScore > 70
      ? facts[3]
      : fitzpatrickScale >= 4
      ? facts[2]
      : behaviors.useSunscreen
      ? facts[1]
      : facts[0];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Stitch Canvas Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative min-h-[480px]">
        {/* Visualization Header */}
        <div className="p-4 flex flex-wrap justify-between items-center bg-[#f8fafc] border-b border-gray-200 gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#131b2e] text-2xl">biotech</span>
            <h2 className="text-base font-bold text-[#191c1e]">การวิเคราะห์ชั้นผิวหนัง (Skin Analysis)</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs3DOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#131b2e] text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 shadow-xs transition-all active:scale-95 min-h-[38px]"
            >
              <span className="material-symbols-outlined text-sm text-amber-400">view_in_ar</span>
              <span>เปิดโหมด 3D & 10 ขั้นตอนชีวเคมี</span>
            </button>
            <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border transition-all duration-200 ${getRiskBadgeStyle(result.overallRisk)}`}>
              <span className="material-symbols-outlined text-sm">warning</span>
              ความเสี่ยง: <span>{result.overallRisk}</span>
            </span>
          </div>
        </div>

        {/* Interactive Skin Model View */}
        <div className="flex-grow flex items-center justify-center relative p-6 bg-slate-50/50 min-h-[360px]">
          {/* Animated UV Rays */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-around px-16 pointer-events-none z-20">
            <div
              className="w-1 bg-gradient-to-b from-yellow-400/80 via-amber-500/50 to-transparent uv-ray animate-ray-flow"
              style={{
                height: `${Math.min((result.overallScore * 1.2) + 20, 100)}%`,
                opacity: result.overallScore > 20 ? 0.7 : 0.25,
              }}
            />
            <div
              className="w-1 bg-gradient-to-b from-amber-500/80 via-orange-500/50 to-transparent uv-ray animate-ray-flow"
              style={{
                height: `${Math.min((result.overallScore * 1.4) + 10, 100)}%`,
                opacity: result.overallScore > 30 ? 0.75 : 0.3,
              }}
            />
            <div
              className="w-1 bg-gradient-to-b from-rose-500/80 via-red-500/50 to-transparent uv-ray animate-ray-flow"
              style={{
                height: `${Math.min((result.overallScore * 0.9) + 15, 100)}%`,
                opacity: result.overallScore > 40 ? 0.8 : 0.25,
              }}
            />
          </div>

          {/* Sunscreen Barrier Shield Overlay */}
          {behaviors.useSunscreen && (
            <div className="absolute top-[38px] left-[calc(50%-18rem)] right-[calc(50%-18rem)] max-w-2xl h-4 bg-gradient-to-r from-teal-500/30 via-cyan-400/40 to-teal-500/30 rounded-t-xl z-30 border-t border-cyan-500/60 backdrop-blur-xs flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#00201d] uppercase tracking-widest bg-cyan-100/90 px-2.5 py-0.5 rounded-full border border-cyan-300">
                🛡️ Sunscreen Shield (SPF {behaviors.sunscreenSPF} / {behaviors.sunscreenPA})
              </span>
            </div>
          )}

          {/* Skin Layers Stack */}
          <div className="w-full max-w-2xl flex flex-col gap-1.5 relative z-10">
            {/* Epidermis Layer */}
            <button
              onClick={() => {
                setActiveModal('Epidermis');
                setIs3DOpen(true);
              }}
              aria-label={`ชั้นกำพร้า Epidermis: Melanin density level ${fitzpatrickScale}`}
              className="w-full text-left h-44 skin-layer-epidermis rounded-t-2xl p-4 border-x border-t border-gray-300/80 shadow-xs flex flex-col justify-between relative group overflow-hidden cursor-pointer hover:border-amber-400 focus:border-amber-500 transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-white/80 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 uppercase tracking-wider">
                    ชั้นกำพร้า (Epidermis)
                  </span>
                  <span className="bg-[#131b2e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-amber-400">view_in_ar</span>
                    คลิกสำรวจ 3D
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">Melanin Density</p>
                  <div className="h-1.5 w-28 bg-white/60 rounded-full mt-1 overflow-hidden border border-gray-300/60">
                    <div
                      className="h-full bg-amber-900 transition-all duration-500 ease-out"
                      style={{ width: `${(fitzpatrickScale / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Melanin Granule Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-30 grid grid-cols-12 gap-2 p-6">
                {Array.from({ length: fitzpatrickScale * 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: FITZPATRICK_DATA[fitzpatrickScale].colorHex,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-700 max-w-[280px] font-medium leading-relaxed bg-white/60 backdrop-blur p-2 rounded-lg border border-white/40">
                UVA ส่องผ่านได้ลึก ส่วน UVB ถูกดูดซับบางส่วนในชั้น Epidermis (คลิกเพื่อดูโครงสร้าง 3D)
              </p>
            </button>

            {/* Dermis Layer */}
            <button
              onClick={() => {
                setActiveModal('Dermis');
                setIs3DOpen(true);
              }}
              aria-label="ชั้นหนังแท้ Dermis: Collagen & Elastic Fibers"
              className="w-full text-left h-56 skin-layer-dermis rounded-b-2xl p-4 border-x border-b border-gray-300/80 shadow-xs flex flex-col justify-start relative group cursor-pointer hover:border-amber-400 focus:border-amber-500 transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/70 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 uppercase tracking-wider">
                  ชั้นหนังแท้ (Dermis)
                </span>
                <span className="bg-[#131b2e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-amber-400">view_in_ar</span>
                  คลิกสำรวจ 3D
                </span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <span className="material-symbols-outlined text-sm text-blue-600">water_drop</span>
                  <span className="text-xs">Collagen Fibers (เส้นใยคอลลาเจน)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <span className="material-symbols-outlined text-sm text-amber-600">stream</span>
                  <span className="text-xs">Elastic Fibers (เส้นใยอิลาสติน)</span>
                </div>
              </div>

              {/* Damage Indicator Overlay */}
              {result.dermis.score > 50 && (
                <div className="absolute inset-0 bg-red-500/5 pointer-events-none transition-all duration-500 flex items-center justify-center">
                  <span className="bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-rose-600">warning</span>
                    พบการสะสมอนุมูลอิสระ & คอลลาเจนเสื่อมสภาพ
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Floating Data Glass Panels */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <div className="glass-panel p-3.5 rounded-xl border border-gray-200/80 shadow-xs w-44">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">UVA Penetration</p>
              <p className="text-xl font-bold text-[#131b2e]">
                {Math.round((uvaPercentage / 100) * result.overallScore)}%
              </p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-gray-200/80 shadow-xs w-44">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">UVB Impact</p>
              <p className="text-xl font-bold text-[#855300]">
                {Math.round(((100 - uvaPercentage) / 100) * result.overallScore)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stitch Educational Fact Banner */}
      <div className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="shrink-0 bg-white p-3 rounded-full border border-gray-200 shadow-xs">
            <span
              className="material-symbols-outlined text-3xl text-[#131b2e]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#131b2e] mb-0.5">เกร็ดความรู้สำหรับคุณ</h4>
            <p className="text-xs text-[#45464d] leading-relaxed">{currentFact}</p>
          </div>
        </div>
      </div>

      {/* 3D Skin Layer Explorer & 10-Step Simulator Modal */}
      <Skin3DExplorerModal
        isOpen={is3DOpen}
        onClose={() => setIs3DOpen(false)}
        initialLayer={activeModal}
        fitzpatrickScale={fitzpatrickScale}
        behaviors={behaviors}
      />
    </div>
  );
}
