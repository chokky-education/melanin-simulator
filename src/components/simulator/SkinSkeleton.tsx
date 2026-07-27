'use client';

import { useState, useEffect } from 'react';

const loadingMessages = [
  'กำลังวิเคราะห์ชั้น Epidermis และ Dermis…',
  'คำนวณการดูดซับรังสี UVA ในชั้นหนังแท้…',
  'ประเมินความหนาแน่นของ Melanocytes…',
  'จำลองปฏิสัมพันธ์ระหว่าง Melanin กับ UV Photon…',
  'วิเคราะห์ระดับ Free Radical Generation…',
];

export default function SkinSkeleton() {
  const [msgIndex, setMsgIndex] = useState(() => Math.floor(Math.random() * loadingMessages.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Header skeleton */}
      <div className="p-4 bg-[#f8fafc] border-b border-gray-200 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-gray-200 animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="w-52 h-4 rounded bg-gray-200 animate-pulse" />
          <div className="w-32 h-3 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="w-20 h-6 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Skin canvas skeleton */}
      <div className="relative p-6 bg-slate-50/50 min-h-[360px] flex items-center justify-center">
        {/* Scanning shimmer line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent animate-scan" />
        </div>

        <div className="w-full max-w-2xl flex flex-col gap-1.5">
          {/* Epidermis placeholder */}
          <div className="h-44 w-full rounded-t-2xl bg-gradient-to-b from-[#fceae1] to-[#f7d7c4] border-x border-t border-gray-300/60 p-4 animate-pulse">
            <div className="w-40 h-4 rounded bg-white/50 mb-auto" />
          </div>
          {/* Dermis placeholder */}
          <div className="h-56 w-full rounded-b-2xl bg-gradient-to-b from-[#f7d7c4] to-[#eac0a8] border-x border-b border-gray-300/60 p-4 animate-pulse">
            <div className="w-36 h-4 rounded bg-white/50" />
          </div>
        </div>

        {/* Side panels skeleton */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="w-44 h-16 rounded-xl bg-white/80 border border-gray-200/60 animate-pulse" />
          <div className="w-44 h-16 rounded-xl bg-white/80 border border-gray-200/60 animate-pulse" />
        </div>
      </div>

      {/* Loading message */}
      <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-gray-200 bg-[#f8fafc]">
        <span className="material-symbols-outlined text-amber-500 text-lg animate-spin">progress_activity</span>
        <span className="text-xs font-medium text-[#45464d] transition-all duration-300">
          {loadingMessages[msgIndex]}
        </span>
      </div>
    </div>
  );
}
