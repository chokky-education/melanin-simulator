'use client';

import { UVResult } from '@/types';

interface ResultDisplayProps {
  result: UVResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-amber-600">summarize</span>
          สรุปผลการวิเคราะห์
        </h2>
        <span className={`text-xs px-3 py-1 font-semibold rounded-full border ${
          result.overallRisk === 'ต่ำ' ? 'bg-[#0c9488]/10 text-[#0c9488] border-[#0c9488]/20' :
          result.overallRisk === 'ปานกลาง' ? 'bg-amber-50 text-amber-800 border-amber-300' :
          'bg-rose-50 text-rose-800 border-rose-300'
        }`}>
          {result.overallRisk} ({result.overallScore}/100)
        </span>
      </div>

      {/* Scenario Description */}
      <p className="text-xs text-[#45464d] leading-relaxed bg-[#f8fafc] p-4 rounded-xl border border-gray-200">
        {result.description}
      </p>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#131b2e]">แนวทางการป้องกัน</h3>
          <ul className="space-y-1.5">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-[#45464d] leading-relaxed flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-[#0c9488] mt-0.5 shrink-0">check_circle</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Scientific Insights (collapsed into a compact list) */}
      {result.scientificInsights.length > 0 && (
        <details className="group">
          <summary className="text-xs font-bold text-[#131b2e] cursor-pointer flex items-center gap-1.5 list-none">
            <span className="material-symbols-outlined text-sm text-amber-600 group-open:rotate-90 transition-transform duration-200">chevron_right</span>
            เกร็ดความรู้สำหรับนักศึกษา ({result.scientificInsights.length})
          </summary>
          <ul className="mt-2 space-y-1.5 pl-5">
            {result.scientificInsights.map((insight, idx) => (
              <li key={idx} className="text-xs text-[#45464d] leading-relaxed">
                {insight.replace('💡 ', '')}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Disclaimer — one line */}
      <p className="text-[10px] text-gray-400 leading-relaxed pt-2 border-t border-gray-200">
        แบบจำลองเพื่อการเรียนรู้เท่านั้น ไม่ใช่เครื่องมือทางการแพทย์หรือวินิจฉัยโรค
      </p>
    </div>
  );
}
