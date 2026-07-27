'use client';

import { useState } from 'react';

export default function KnowledgeHub() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 w-full space-y-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#131b2e] text-3xl">menu_book</span>
          <div>
            <h3 className="text-lg font-bold text-[#191c1e] group-hover:text-[#855300] transition-colors">
              คลังความรู้ทางวิชาการ (Educational Knowledge Hub)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              คำอธิบายเชิงลึกเรื่องฟิสิกส์ UV, เมลานิน, ค่า SPF/PA และเอกสารอ้างอิงทางวิชาการ
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-gray-500 text-2xl">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="pt-4 border-t border-gray-200 space-y-6 text-sm text-gray-700 animate-in fade-in">
          {/* Section 1: UVA vs UVB Comparison Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#131b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600 text-lg">science</span>
              1. เปรียบเทียบคุณสมบัติรังสี UVA และ UVB (UVA vs UVB Spectrum)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#eceef0] text-[#131b2e] border-b border-gray-200">
                    <th className="p-3.5 border-r border-gray-200 font-bold">หัวข้อเปรียบเทียบ</th>
                    <th className="p-3.5 border-r border-gray-200 text-[#855300] font-bold">รังสี UVA (Long-wave)</th>
                    <th className="p-3.5 text-red-700 font-bold">รังสี UVB (Short-wave)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5 font-semibold text-gray-900 border-r border-gray-200">ความยาวคลื่น (Wavelength)</td>
                    <td className="p-3.5 border-r border-gray-200">320 - 400 nm</td>
                    <td className="p-3.5">290 - 320 nm</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5 font-semibold text-gray-900 border-r border-gray-200">การทะลุผ่านกระจก (Glass Penetration)</td>
                    <td className="p-3.5 border-r border-gray-200 text-[#0c9488] font-bold">ทะลุผ่านกระจกใสได้เกือบ 100%</td>
                    <td className="p-3.5 text-red-600 font-bold">ถูกกระจกบดบังเกือบทั้งหมด</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5 font-semibold text-gray-900 border-r border-gray-200">ความลึกในชั้นผิว (Penetration Depth)</td>
                    <td className="p-3.5 border-r border-gray-200">ทะลุลงลึกถึงชั้น Dermis (หนังแท้)</td>
                    <td className="p-3.5">กระจายอยู่ในชั้น Epidermis (หนังกำพร้า)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5 font-semibold text-gray-900 border-r border-gray-200">กลไกการทำลายผิวหลัก</td>
                    <td className="p-3.5 border-r border-gray-200">เกิด ROS อนุมูลอิสระ, ทำลายคอลลาเจน (Photoaging)</td>
                    <td className="p-3.5">ทำให้ผิวไหม้แดง (Sunburn), ทำลาย DNA เซลล์ตื้น</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5 font-semibold text-gray-900 border-r border-gray-200">ตัวชี้วัดการป้องกันในครีมกันแดด</td>
                    <td className="p-3.5 border-r border-gray-200 text-[#855300] font-bold">ค่า PA (Protection Grade of UVA) / PPD</td>
                    <td className="p-3.5 text-red-600 font-bold">ค่า SPF (Sun Protection Factor)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: SPF & PA Definitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#eceef0] p-4 rounded-xl border border-gray-200 space-y-1.5">
              <h5 className="font-bold text-xs text-[#855300] uppercase tracking-wider">
                นิยามค่า SPF (Sun Protection Factor)
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                SPF เป็นตัวเลขบอกพหุคูณของเวลาที่ผิวทนต่อรังสี UVB ได้ก่อนเกิดอาการผิวไหม้แดง (Erythema) เช่น SPF 30 หมายถึง กรองรังสี UVB ได้ประมาณ 96.7% (1 - 1/30)
              </p>
            </div>
            <div className="bg-[#eceef0] p-4 rounded-xl border border-gray-200 space-y-1.5">
              <h5 className="font-bold text-xs text-[#0c9488] uppercase tracking-wider">
                นิยามค่า PA (Protection Grade of UVA)
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                PA เป็นระบบวัดประสิทธิภาพการกัน UVA ตามมาตรฐานประเทศญี่ปุ่น โดยอ้างอิงค่า Persistent Pigment Darkening (PPD) ตั้งแต่ PA+ ถึง PA++++ (PPD 16 ขึ้นไป)
              </p>
            </div>
          </div>

          {/* Section 3: References & Sources */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              เอกสารและแหล่งข้อมูลอ้างอิงทางวิชาการ:
            </h4>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5 leading-relaxed">
              <li>World Health Organization (WHO). Global Solar UV Index: A Practical Guide.</li>
              <li>American Academy of Dermatology (AAD). Sunscreen FAQs & Photoaging Principles.</li>
              <li>Fitzpatrick, T. B. (1988). The validity and practicality of sun-reactive skin types I through VI. Archives of Dermatology.</li>
              <li>International Federation of Societies of Cosmetic Chemists (IFSCC) Monograph on UV Protection Standards.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
