// UV and Melanin Simulator Types - Educational & Cosmetic Science Focus

export type UVType = 'UVA' | 'UVB' | 'Mixed';

export type FitzpatrickScale = 1 | 2 | 3 | 4 | 5 | 6;

export type ProtectionLevel = 'ต่ำ' | 'ปานกลาง' | 'สูง' | 'สูงมาก';

export type SkinLayer = 'Epidermis' | 'Dermis' | 'Subcutaneous';

export interface PresetScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  uvIndex: number;
  duration: number;
  uvType: UVType;
  uvaPercentage: number;
}

export interface SimulatorSettings {
  uvIndex: number; // 1 - 11+
  duration: number; // minutes (5 - 240)
  uvType: UVType;
  uvaPercentage: number; // 10 - 100%
  fitzpatrickScale: FitzpatrickScale;
  activePreset?: string;
}

export interface ProtectionBehaviors {
  useSunscreen: boolean;
  sunscreenSPF: number; // 15, 30, 50, 50.1 (50+)
  sunscreenPA: string; // PA+, PA++, PA+++, PA++++
  reapplySunscreen: boolean; // Reapplied every 2 hours
  wearProtectiveClothing: boolean; // Hat, clothing, UPF
  avoidPeakHours: boolean; // Shade / Avoid 10:00 - 16:00
}

export interface LayerImpact {
  score: number; // 0 - 100
  level: ProtectionLevel;
  biologicalEffect: string; // e.g. Erythema, Photoaging, Cell Stress
  damageKeypoints: string[];
}

export interface UVResult {
  epidermis: LayerImpact;
  dermis: LayerImpact;
  subcutaneous: LayerImpact;
  overallScore: number;
  overallRisk: ProtectionLevel;
  protectionEfficiency: number; // 0 - 100% reduction vs unprotected
  description: string;
  recommendations: string[];
  scientificInsights: string[];
  unprotectedBaseline?: {
    epidermis: LayerImpact;
    dermis: LayerImpact;
    subcutaneous: LayerImpact;
    overallScore: number;
    overallRisk: ProtectionLevel;
  };
}

export interface FitzpatrickInfo {
  scale: FitzpatrickScale;
  nameTH: string;
  description: string;
  melaninLevel: string;
  reactionToSun: string;
  colorHex: string;
}
