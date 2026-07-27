'use client';

import { UVResult } from '@/types';

interface ComparisonViewProps {
  result: UVResult;
}

export default function ComparisonView({ result }: ComparisonViewProps) {
  const unprotectedScore = result.unprotectedBaseline?.overallScore ?? Math.min(100, Math.round(result.overallScore * 2.5) + 30);
  const protectedScore = result.overallScore;

  const melProdUnprotected = Math.min(95, Math.round(unprotectedScore * 0.95));
  const melProdProtected = Math.max(8, Math.min(95, Math.round(protectedScore * 0.35)));

  const dnaDamageUnprotected = Math.min(95, Math.round(unprotectedScore * 0.85));
  const dnaDamageProtected = Math.max(5, Math.min(95, Math.round(protectedScore * 0.2)));

  const protectionEfficiency = result.protectionEfficiency ?? Math.max(0, Math.round(((unprotectedScore - protectedScore) / unprotectedScore) * 100));
  const strokeOffset = 364 - (364 * Math.min(100, protectionEfficiency)) / 100;

  return (
    <div className="space-y-6 w-full">
      {/* Stitch Comparison Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-[#131b2e]">bar_chart</span>
          <h2 className="text-base font-bold text-[#191c1e]">
            เปรียบเทียบผลลัพธ์ (Unprotected vs Protected Dashboard)
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#0c9488] bg-[#0c9488]/10 px-3 py-1 rounded-full border border-[#0c9488]/20">
          มีผลต่างการป้องกันอย่างมีนัยสำคัญ
        </span>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Protection Card */}
        <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600">warning</span>
                ก่อนป้องกัน (Unprotected)
              </h3>
              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-800 font-semibold rounded-full text-xs border border-rose-200">
                เสี่ยงสูง
              </span>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-[#1e1310] flex items-center justify-center p-6 text-white text-center border border-rose-950">
              <div className="space-y-1.5">
                <span className="material-symbols-outlined text-4xl text-amber-400">wb_sunny</span>
                <p className="text-[10px] uppercase tracking-widest opacity-70">Exposure Duration</p>
                <p className="text-xl font-bold">60 - 120 Minutes</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Melanin Production Rate</span>
                  <span className="text-rose-700">High (+{melProdUnprotected}%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 transition-all duration-500" style={{ width: `${melProdUnprotected}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Cellular DNA Damage</span>
                  <span className="text-rose-700">Critical ({dnaDamageUnprotected}%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 transition-all duration-500" style={{ width: `${dnaDamageUnprotected}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* After Protection Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#0c9488]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0c9488] flex items-center gap-2">
                <span className="material-symbols-outlined">verified_user</span>
                หลังป้องกัน (Protected)
              </h3>
              <span className="px-2.5 py-0.5 bg-[#0c9488]/10 text-[#0c9488] font-semibold rounded-full text-xs border border-[#0c9488]/20">
                ปลอดภัย
              </span>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-[#0f1d1b] flex items-center justify-center p-6 text-white text-center border border-[#00201d]">
              <div className="space-y-1.5">
                <span className="material-symbols-outlined text-4xl text-[#89f5e7]">shield</span>
                <p className="text-[10px] uppercase tracking-widest opacity-70">Protection Layer Applied</p>
                <p className="text-xl font-bold">Optimal Coverage</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Melanin Production Rate</span>
                  <span className="text-[#0c9488]">Normal (+{melProdProtected}%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0c9488] transition-all duration-500" style={{ width: `${melProdProtected}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Cellular DNA Damage</span>
                  <span className="text-[#0c9488]">Minimal ({dnaDamageProtected}%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0c9488] transition-all duration-500" style={{ width: `${dnaDamageProtected}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stitch Analysis Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#f8fafc] rounded-2xl p-5 border border-gray-200">
          <h3 className="text-sm font-bold mb-2 text-[#131b2e]">บทวิเคราะห์ทางวิทยาศาสตร์</h3>
          <div className="space-y-2 text-xs text-[#45464d] leading-relaxed">
            <p>
              จากการจำลองสถานการณ์ พบว่าหากไม่มีการป้องกันผิวหนัง รังสี UV จะกระตุ้นการทำงานของ{' '}
              <strong className="text-[#131b2e]">Melanocytes</strong> อย่างรุนแรง ส่งผลให้มีการสร้างเม็ดสีเมลานินขึ้นมาเพื่อปกป้อง DNA ในนิวเคลียส ซึ่งเป็นสาเหตุหลักของผิวหมองคล้ำและจุดด่างดำ
            </p>
            <p>
              เมื่อใช้การป้องกัน (SPF 50+ และการหลบแดด) ปริมาณรังสีที่เข้าสู่ชั้นผิวลดลงกว่า{' '}
              <span className="text-[#0c9488] font-bold text-sm">98%</span> ทำให้กระบวนการผลิตเมลานินอยู่ในระดับปกติ และลดความเสี่ยงของการเกิดการทำลาย DNA ที่อาจนำไปสู่โรคมะเร็งผิวหนังในระยะยาวได้อย่างมีนัยสำคัญ
            </p>
          </div>
        </div>

        {/* Circular Risk Gauge from Stitch */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-200 flex flex-col items-center justify-center text-center">
          <h3 className="text-[10px] font-bold mb-2 text-[#45464d] uppercase tracking-widest">
            ดัชนีความต่างของการปกป้อง
          </h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-gray-200" cx="64" cy="64" fill="transparent" r="52" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-[#fea619] transition-all duration-1000"
                cx="64"
                cy="64"
                fill="transparent"
                r="52"
                stroke="currentColor"
                strokeDasharray="326"
                strokeDashoffset={(326 * (100 - Math.min(100, protectionEfficiency))) / 100}
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#131b2e]">+{protectionEfficiency}%</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
