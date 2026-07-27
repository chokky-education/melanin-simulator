'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ProtectionBehaviors, FitzpatrickScale } from '@/types';

interface Skin3DExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLayer?: 'Epidermis' | 'Dermis' | 'Subcutaneous' | null;
  fitzpatrickScale?: FitzpatrickScale;
  behaviors?: ProtectionBehaviors;
  uvIndex?: number;
}

// 10 Educational Steps for Cosmetic Science & Aesthetics Students
export const TEN_EDUCATIONAL_STEPS = [
  {
    step: 1,
    title: '1. รังสี UV ตกกระทบ Stratum Corneum',
    layer: 'Epidermis',
    summary: 'ชั้นขี้ไคล (Stratum Corneum) สะท้อนรังสี UV บางส่วน แต่รังสี UVA/UVB ส่วนใหญ่ยังคงส่องผ่านลงสู่ชั้นล่าง',
    mechanism: 'Keratinocytes เรียงตัวหนาแน่น ทำหน้าที่เป็นเกราะปราการด่านแรก แต่ละรังสีมีพลังงานต่างกัน (UVB สั้น/แรง, UVA ยาว/ลึก)',
    hotspotPos: [0, 2.2, 0] as [number, number, number],
  },
  {
    step: 2,
    title: '2. UVB ทำลาย DNA ของ Keratinocytes',
    layer: 'Epidermis',
    summary: 'รังสี UVB ถูกดูดซับโดย DNA โดยตรง เกิด Cyclobutane Pyrimidine Dimers (CPD)',
    mechanism: 'ความเสียหายต่อ DNA กระตุ้นกระบวนการซ่อมแซม p53 Pathway หากรุนแรงเกินไป เซลล์จะทำลายตัวเองเกิดเป็น Sunburn Cells',
    hotspotPos: [0, 1.6, 0.5] as [number, number, number],
  },
  {
    step: 3,
    title: '3. อนุมูลอิสระ (ROS) กระตุ้น Melanocytes',
    layer: 'Epidermis',
    summary: 'อนุมูลอิสระจากการกระตุ้นของ UV ส่งสัญญาณไปยัง Melanocyte ที่ชั้น Basal Layer',
    mechanism: 'Keratinocytes หลั่งฮอร์โมน α-MSH (Melanocyte-Stimulating Hormone) และ Endothelin-1 เข้าจับกับตัวรับ MC1R บน Melanocyte',
    hotspotPos: [-1.2, 1.1, 0.2] as [number, number, number],
  },
  {
    step: 4,
    title: '4. เอนไซม์ Tyrosinase สังเคราะห์ เมลานิน',
    layer: 'Epidermis',
    summary: 'เกิดปฏิกิริยาชีวเคมีเปลี่ยน L-Tyrosine ไปเป็น DOPAquinone ในออร์แกเนลล์ Melanosome',
    mechanism: 'Tyrosinase เป็น Rate-limiting Enzyme สำคัญ หากมีเกลือทองแดงและออกซิเจน จะสร้าง Eumelanin (น้ำตาล/ดำ) หรือ Pheomelanin (ส้ม/แดง)',
    hotspotPos: [-0.8, 0.9, -0.4] as [number, number, number],
  },
  {
    step: 5,
    title: '5. Melanosome เติบโตและเคลื่อนตัวผ่าน Dendrites',
    layer: 'Epidermis',
    summary: 'ถุงบ่มเม็ดสี (Melanosomes) เคลื่อนตัวผ่านแขนงเซลล์ (Dendritic Processes) ไปยัง Keratinocytes รอบข้าง',
    mechanism: 'Melanocyte 1 เซลล์ เชื่อมต่อและส่งถุงเม็ดสีให้ Keratinocyte ประมาณ 36 เซลล์ (Epidermal Melanin Unit)',
    hotspotPos: [0.8, 1.2, 0.3] as [number, number, number],
  },
  {
    step: 6,
    title: '6. การส่งถ่าย เมลานิน สู่ Keratinocytes',
    layer: 'Epidermis',
    summary: 'Keratinocytes กลืนกินถุง Melanosome เข้าสู่ภายในเซลล์ (Phagocytosis / Cytocrine Secretion)',
    mechanism: 'เม็ดสีถูกจัดเรียงตัวให้อยู่เหนือตำแหน่งของนิวเคลียส เพื่อบังแสงแดดเสมือนร่มร่มปกป้องรหัสพันธุกรรม',
    hotspotPos: [1.2, 1.5, -0.2] as [number, number, number],
  },
  {
    step: 7,
    title: '7. การเกิด Supranuclear Melanin Cap (ร่มป้องกันนิวเคลียส)',
    layer: 'Epidermis',
    summary: 'เม็ดสีเมลานินเรียงตัวเป็นหมวกคลุมเหนือ DNA นิวเคลียส ดูดซับและกระจายรังสี UV',
    mechanism: 'นี่คือกลไกการป้องตนเองตามธรรมชาติของผิว ทำให้ผิวมีสีเข้มขึ้น (Tanning Response) เพื่อป้องกัน UV ในอนาคต',
    hotspotPos: [0.3, 1.8, 0.1] as [number, number, number],
  },
  {
    step: 8,
    title: '8. UVA ทะลุผ่านสู่ Dermis ทำลาย Collagen Matrix',
    layer: 'Dermis',
    summary: 'UVA (320-400 nm) ทะลุลงลึกสู่ชั้นหนังแท้ กระตุ้นเอนไซม์ MMP-1 ย่อยสลาย Collagen',
    mechanism: 'Collagen Type I & III และ Elastin ถูกทำลาย ทำให้โครงสร้างพยุงผิวโหว่เกิด ริ้วรอยลึก (Photoaging/Solar Elastosis)',
    hotspotPos: [0, -0.4, 0] as [number, number, number],
  },
  {
    step: 9,
    title: '9. อนุมูลอิสระย่อยสลาย Fibroblasts & Hyaluronic Acid',
    layer: 'Dermis',
    summary: 'Fibroblast ผลิตคอลลาเจนลดลง ผิวสูญเสียความยืดหยุ่นและความชุ่มชื้นอุ้มน้ำ',
    mechanism: 'การสะสมอนุมูลอิสระทำลาย Glycosaminoglycans (GAGs) และ Hyaluronic acid ใน Extra-Cellular Matrix (ECM)',
    hotspotPos: [1.0, -0.8, 0.4] as [number, number, number],
  },
  {
    step: 10,
    title: '10. ผลกระทบต่อหลอดเลือดฝอยและ Subcutaneous Fat',
    layer: 'Subcutaneous',
    summary: 'การอักเสบเรื้อรัง (Micro-inflammation) ขยายตัวถึงเส้นเลือดฝอยและชั้นไขมันใต้ผิว',
    mechanism: 'เกิด Telangiectasia (เส้นเลือดฝอยขยายตัว) ผิวแดงขรุขระ และโครงสร้างชั้นไขมันสูญเสียความกระชับ',
    hotspotPos: [0, -2.0, 0] as [number, number, number],
  },
];

// 3D Scene Geometry Component
function SkinScene3D({
  activeStep,
  fitzpatrickScale = 3,
  hasSunscreen = false,
  onSelectHotspot,
}: {
  activeStep: number;
  fitzpatrickScale: FitzpatrickScale;
  hasSunscreen: boolean;
  onSelectHotspot: (step: number) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  // Fitzpatrick skin colors
  const fitzColors = ['#fff0e6', '#fce3d3', '#f5cbaf', '#d99b73', '#965a38', '#422415'];
  const skinColor = fitzColors[fitzpatrickScale - 1] || '#f5cbaf';

  return (
    <group ref={meshRef}>
      {/* Sunscreen Barrier Layer */}
      {hasSunscreen && (
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[4.4, 0.15, 3.4]} />
          <meshStandardMaterial
            color="#89f5e7"
            transparent
            opacity={0.7}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      )}

      {/* Epidermis Layer (Top) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 1.8, 3]} />
        <meshStandardMaterial
          color={skinColor}
          roughness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Stratum Corneum Top Ridge */}
      <mesh position={[0, 2.42, 0]}>
        <boxGeometry args={[4.05, 0.08, 3.05]} />
        <meshStandardMaterial color="#fcd5be" roughness={0.8} />
      </mesh>

      {/* Melanocyte Cells in Basal Layer */}
      <group position={[0, 0.65, 0]}>
        {[-1.2, 0, 1.2].map((x, idx) => (
          <group key={idx} position={[x, 0, (idx % 2 === 0 ? 0.3 : -0.3)]}>
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#855300" roughness={0.3} />
            </mesh>
            <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
              <meshStandardMaterial color="#855300" />
            </mesh>
            <mesh position={[-0.15, 0.2, 0]} rotation={[0, 0, 0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
              <meshStandardMaterial color="#855300" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Dermis Layer */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[4, 1.6, 3]} />
        <meshStandardMaterial
          color="#e09085"
          roughness={0.6}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Collagen Fibers in Dermis */}
      <group position={[0, -0.2, 0]}>
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
          <mesh key={i} position={[x, (i % 2 === 0 ? 0.2 : -0.2), 0]} rotation={[0.2, 0, 1.2]}>
            <cylinderGeometry args={[0.05, 0.05, 2.2, 8]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.2} wireframe={i === 1} />
          </mesh>
        ))}
      </group>

      {/* Subcutaneous Layer */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[4, 1.4, 3]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.7} />
      </mesh>

      {/* Fat Lobules Spheres */}
      <group position={[0, -1.8, 0]}>
        {[-1.3, -0.5, 0.5, 1.3].map((x, i) => (
          <mesh key={i} position={[x, 0, (i % 2 === 0 ? 0.4 : -0.4)]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Capillary Blood Vessel */}
      <mesh position={[0.5, -0.7, 0.8]} rotation={[0.4, 0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3.2, 12]} />
        <meshStandardMaterial color="#ef4444" roughness={0.2} />
      </mesh>

      {/* Clean 3D Number Pin Badges (No long overlapping text in 3D canvas) */}
      {TEN_EDUCATIONAL_STEPS.map((s) => {
        const isCurrent = s.step === activeStep;
        return (
          <Float key={s.step} speed={isCurrent ? 2 : 0.8} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={s.hotspotPos} onClick={() => onSelectHotspot(s.step)}>
              <mesh>
                <sphereGeometry args={[isCurrent ? 0.25 : 0.16, 16, 16]} />
                <meshStandardMaterial
                  color={isCurrent ? '#f59e0b' : '#38bdf8'}
                  emissive={isCurrent ? '#f59e0b' : '#0284c7'}
                  emissiveIntensity={isCurrent ? 0.9 : 0.2}
                />
              </mesh>
              {/* Ultra-compact number badge ONLY to avoid text overlap */}
              <Html center transform={false}>
                <button
                  onClick={() => onSelectHotspot(s.step)}
                  className={`w-7 h-7 rounded-full text-xs font-black font-mono shadow-xl transition-all cursor-pointer flex items-center justify-center border ${
                    isCurrent
                      ? 'bg-amber-400 text-black border-white ring-4 ring-amber-400/40 scale-125 z-30'
                      : 'bg-slate-900/90 text-white border-cyan-400/60 hover:bg-cyan-500 hover:scale-110'
                  }`}
                  title={s.title}
                >
                  {s.step}
                </button>
              </Html>
            </group>
          </Float>
        );
      })}

      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, -4]} intensity={0.5} color="#e09085" />
    </group>
  );
}

export default function Skin3DExplorerModal({
  isOpen,
  onClose,
  initialLayer = 'Epidermis',
  fitzpatrickScale = 3,
  behaviors,
  uvIndex = 5,
}: Skin3DExplorerModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev >= 10 ? 1 : prev + 1));
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStepData = TEN_EDUCATIONAL_STEPS[activeStep - 1];

  return (
    <div className="fixed inset-0 z-50 bg-[#090d16] text-white flex flex-col w-screen h-screen overflow-hidden animate-in fade-in pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      {/* Top Fullscreen Navbar */}
      <div className="px-4 sm:px-6 py-3 bg-[#111827] border-b border-slate-800 flex justify-between items-center shrink-0 min-h-[52px]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <span className="material-symbols-outlined text-lg">view_in_ar</span>
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
              3D Skin Cross-Section & 10-Step Simulator
            </h3>
            <p className="text-[11px] text-slate-400 hidden md:block">
              สื่อจำลองโครงสร้าง 3D สามมิติเต็มจอ และ 10 ขั้นตอนชีวเคมีรังสี UV ต่อชั้นผิวหนัง
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <span className="hidden sm:inline">ปิดหน้าจอ 3D [ESC]</span>
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Main Fullscreen Grid Area (3D View + Side Details) */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden relative">
        {/* Left / Center 3D Viewport (8 Cols) */}
        <div className="h-[50vh] lg:h-full lg:col-span-8 bg-[#090d16] relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0">
          {/* Top HUD Display Banner */}
          <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex justify-center">
            <div className="bg-[#111827]/90 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 max-w-xl text-center">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-black text-xs flex items-center justify-center font-mono shrink-0">
                {currentStepData.step}
              </span>
              <div className="text-left">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  ขั้นตอนที่ {currentStepData.step} จาก 10 ({currentStepData.layer})
                </span>
                <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {currentStepData.title.split('.')[1]}
                </span>
              </div>
            </div>
          </div>

          {/* 3D Navigation Guide Pill */}
          <div className="absolute bottom-16 left-4 z-20 bg-slate-900/80 backdrop-blur-xs text-slate-300 text-[11px] px-3.5 py-1.5 rounded-full border border-slate-800 flex items-center gap-2 pointer-events-none">
            <span className="material-symbols-outlined text-xs text-amber-400">touch_app</span>
            <span>หมุน 3D (ลากเม้าส์) | ซูม (สกอร์ล) | คลิกหมุดตัวเลข 1-10</span>
          </div>

          {/* Canvas WebGL 3D Viewport */}
          <div className="w-full h-full">
            <Canvas camera={{ position: [4, 3, 5], fov: 42 }}>
              <Suspense fallback={null}>
                <SkinScene3D
                  activeStep={activeStep}
                  fitzpatrickScale={fitzpatrickScale}
                  hasSunscreen={behaviors?.useSunscreen || false}
                  onSelectHotspot={(step) => {
                    setActiveStep(step);
                    setIsPlaying(false);
                  }}
                />
                <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 1.7} minDistance={3} maxDistance={11} />
              </Suspense>
            </Canvas>
          </div>

          {/* Bottom Step Selector Strip (1-10) */}
          <div className="p-3 bg-[#111827] border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto shrink-0 z-20">
            <span className="text-xs font-bold text-slate-400 shrink-0">เลือกขั้นตอน:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {TEN_EDUCATIONAL_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    activeStep === s.step
                      ? 'bg-amber-500 text-black font-black shadow-lg scale-110 ring-2 ring-amber-300'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Details Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-[#111827] p-6 flex flex-col justify-between overflow-y-auto space-y-6 border-l border-slate-800">
          {/* Step Header */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Step {currentStepData.step} of 10
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                ชั้นผิว: {currentStepData.layer}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white leading-snug">
              {currentStepData.title}
            </h4>
          </div>

          {/* Explanation Text Boxes */}
          <div className="space-y-4 text-xs text-slate-300 flex-1 overflow-y-auto pr-1">
            <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-800/40 space-y-1.5">
              <h5 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-amber-400">summarize</span>
                สรุปสภาวะที่เกิดขึ้น (Overview)
              </h5>
              <p className="leading-relaxed text-amber-100/90 font-medium">
                {currentStepData.summary}
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-1.5">
              <h5 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-cyan-400">biotech</span>
                กลไกชีวเคมีระดับเซลล์ (Biochemical Mechanism)
              </h5>
              <p className="leading-relaxed text-slate-300">
                {currentStepData.mechanism}
              </p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h5 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-blue-400">school</span>
                เกร็ดวิชาการสำหรับสอบ / การปฏิบัติการ
              </h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {activeStep <= 3
                  ? 'สังเกตว่าการทาครีมกันแดด SPF 50+ จะตัดปฏิกิริยาในข้อ 1-2 ทันที ทำให้กระบวนการอักเสบในข้อ 3 ไม่ถูกกระตุ้น'
                  : activeStep <= 7
                  ? 'ในเวชสำอาง สาร Whitening ออกฤทธิ์ยับยั้ง Tyrosinase (เช่น Arbutin, Kojic acid) เพื่อขัดขวางปฏิกิริยาในข้อ 4-5'
                  : 'UVA ทำให้เกิด Photoaging ระยะยาว สารกันแดดต้องมีค่า PA++++ เพื่อบล็อกกระบวนการในข้อ 8-10'}
              </p>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveStep((prev) => Math.max(prev - 1, 1));
                setIsPlaying(false);
              }}
              disabled={activeStep === 1}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 disabled:opacity-30 flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              ถอยหลัง
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-black font-black shadow-lg scale-105'
                  : 'bg-cyan-500 text-black font-bold hover:bg-cyan-400'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'พักการเล่น' : 'เล่นออโต้ 1-10'}</span>
            </button>

            <button
              onClick={() => {
                setActiveStep((prev) => Math.min(prev + 1, 10));
                setIsPlaying(false);
              }}
              disabled={activeStep === 10}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 disabled:opacity-30 flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              ถัดไป
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
