'use client';

import { useState, useEffect } from 'react';
import { SimulatorSettings, ProtectionBehaviors, PresetScenario } from '@/types';
import { calculateUVImpact, PRESET_SCENARIOS } from '@/lib/uv-calculator';
import Header from '@/components/simulator/Header';
import PresetSelector from '@/components/simulator/PresetSelector';
import UVControlPanel from '@/components/simulator/UVControlPanel';
import SkinLayerVisualization from '@/components/simulator/SkinLayerVisualization';
import SkinSkeleton from '@/components/simulator/SkinSkeleton';
import ComparisonView from '@/components/simulator/ComparisonView';
import ResultDisplay from '@/components/simulator/ResultDisplay';
import KnowledgeHub from '@/components/simulator/KnowledgeHub';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'knowledge'>('simulator');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const [settings, setSettings] = useState<SimulatorSettings>({
    uvIndex: 5,
    duration: 60,
    uvType: 'Mixed',
    uvaPercentage: 95,
    fitzpatrickScale: 3,
    activePreset: undefined,
  });

  const [behaviors, setBehaviors] = useState<ProtectionBehaviors>({
    useSunscreen: false,
    sunscreenSPF: 50,
    sunscreenPA: 'PA++++',
    reapplySunscreen: false,
    wearProtectiveClothing: false,
    avoidPeakHours: false,
  });

  const triggerLoadingGimmick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    triggerLoadingGimmick();
    setSettings((prev) => ({
      ...prev,
      uvIndex: preset.uvIndex,
      duration: preset.duration,
      uvType: preset.uvType,
      uvaPercentage: preset.uvaPercentage,
      activePreset: preset.id,
    }));
  };

  const handleReset = () => {
    triggerLoadingGimmick();
    setSettings({
      uvIndex: 5, duration: 60, uvType: 'Mixed',
      uvaPercentage: 95, fitzpatrickScale: 3, activePreset: undefined,
    });
    setBehaviors({
      useSunscreen: false, sunscreenSPF: 50, sunscreenPA: 'PA++++',
      reapplySunscreen: false, wearProtectiveClothing: false, avoidPeakHours: false,
    });
  };

  // Keyboard shortcuts ($impeccable adapt)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      if (key >= '1' && key <= '4') {
        const preset = PRESET_SCENARIOS[Number(key) - 1];
        if (preset) handleSelectPreset(preset);
      } else if (key === 's') {
        setBehaviors((p) => ({ ...p, useSunscreen: !p.useSunscreen }));
      } else if (key === 'c') {
        setBehaviors((p) => ({ ...p, wearProtectiveClothing: !p.wearProtectiveClothing }));
      } else if (key === 'a') {
        setBehaviors((p) => ({ ...p, avoidPeakHours: !p.avoidPeakHours }));
      } else if (key === 'r') {
        handleReset();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShowKeyboardHelp((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const result = calculateUVImpact(settings, behaviors);
  const protectionScore = Math.round(
    ([behaviors.useSunscreen, behaviors.wearProtectiveClothing, behaviors.avoidPeakHours]
      .filter(Boolean).length / 3) * 100
  );

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans flex flex-col antialiased pb-20 lg:pb-0">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Presets + toolbar */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 w-full">
            <PresetSelector activePreset={settings.activePreset} onSelectPreset={handleSelectPreset} />
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setShowKeyboardHelp(true)}
              className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors min-h-[44px]"
              title="คีย์ลัดคีย์บอร์ด"
            >
              <span className="material-symbols-outlined text-sm text-gray-500">keyboard</span>
              <span className="hidden md:inline">[?]</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors min-h-[44px]"
              title="รีเซ็ตตั้งค่าทั้งหมด"
            >
              <span className="material-symbols-outlined text-sm text-gray-500">restart_alt</span>
              <span className="hidden md:inline">รีเซ็ต</span>
            </button>
          </div>
        </section>

        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-4">
              <UVControlPanel
                settings={settings}
                onSettingsChange={setSettings}
                behaviors={behaviors}
                onBehaviorsChange={setBehaviors}
                protectionScore={protectionScore}
              />
            </div>

            {/* Visualization & Analysis */}
            <div className="lg:col-span-8 space-y-8">
              <section id="sec-visualization">
                {isLoading ? (
                  <SkinSkeleton />
                ) : (
                  <SkinLayerVisualization
                    result={result}
                    uvType={settings.uvType}
                    uvaPercentage={settings.uvaPercentage}
                    behaviors={behaviors}
                    fitzpatrickScale={settings.fitzpatrickScale}
                  />
                )}
              </section>

              <ComparisonView result={result} />
              <ResultDisplay result={result} />
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <section>
            <KnowledgeHub />
          </section>
        )}
      </main>

      {/* Mobile quick dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-xl">wb_sunny</span>
          <span className="text-xs font-bold text-[#191c1e]">UV {settings.uvIndex}</span>
          <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
            {result.overallScore}/100
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBehaviors((p) => ({ ...p, useSunscreen: !p.useSunscreen }))}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors min-h-[44px] flex items-center gap-1.5 ${
              behaviors.useSunscreen
                ? 'bg-[#00201d] text-[#89f5e7] border border-[#0c9488]'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-sm">sanitizer</span>
            กันแดด
          </button>
          <button
            onClick={() => document.getElementById('sec-visualization')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 py-2 rounded-xl bg-[#131b2e] text-white text-xs font-bold min-h-[44px] flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">biotech</span>
            ชั้นผิว
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-gray-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">keyboard</span>
                คีย์ลัดสำหรับผู้สอน
              </h3>
              <button onClick={() => setShowKeyboardHelp(false)} className="text-gray-400 hover:text-gray-700 p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              {[
                ['1 – 4', 'เลือก Preset'],
                ['S', 'สลับกันแดด'],
                ['C', 'สลับเสื้อผ้า UPF'],
                ['A', 'สลับเลี่ยงแดดจัด'],
                ['R', 'รีเซ็ต'],
                ['?', 'เปิด/ปิดคีย์ลัด'],
              ].map(([key, desc]) => (
                <div key={key} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
                  <span>{desc}</span>
                  <kbd className="bg-white px-2 py-0.5 rounded border border-gray-300 font-mono font-bold text-[11px]">{key}</kbd>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="w-full py-2.5 bg-[#131b2e] text-white font-bold text-xs rounded-xl transition-colors"
            >
              เข้าใจแล้ว
            </button>
          </div>
        </div>
      )}

      {/* Footer — distilled to essentials */}
      <footer className="bg-[#eceef0] mt-12 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 max-w-7xl mx-auto gap-2">
          <span className="text-xs text-gray-500">
            © 2026 UV & Melanin Simulator — สื่อการเรียนรู้เพื่อการศึกษาเท่านั้น
          </span>
          <button
            onClick={() => setActiveTab('knowledge')}
            className="text-xs text-gray-500 hover:text-[#131b2e] transition-colors"
          >
            แหล่งอ้างอิงทางวิชาการ →
          </button>
        </div>
      </footer>
    </div>
  );
}
