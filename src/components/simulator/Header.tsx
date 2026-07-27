'use client';

interface HeaderProps {
  activeTab?: 'simulator' | 'knowledge';
  onTabChange?: (tab: 'simulator' | 'knowledge') => void;
}

export default function Header({ activeTab = 'simulator', onTabChange }: HeaderProps) {
  const tabs: { id: 'simulator' | 'knowledge'; label: string }[] = [
    { id: 'simulator', label: 'Simulator' },
    { id: 'knowledge', label: 'Knowledge Hub' },
  ];

  return (
    <nav className="bg-white shadow-xs sticky top-0 z-50 border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-[#131b2e] text-3xl select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            flare
          </span>
          <span className="font-bold text-lg sm:text-xl text-[#191c1e] tracking-tight">
            UV & Melanin Simulator
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`hidden sm:block pb-1 transition-colors ${
                activeTab === tab.id
                  ? 'text-[#131b2e] font-bold border-b-2 border-[#131b2e]'
                  : 'text-gray-500 hover:text-[#131b2e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
