import {
  SimulatorSettings,
  ProtectionBehaviors,
  UVResult,
  ProtectionLevel,
  LayerImpact,
  FitzpatrickScale,
  FitzpatrickInfo,
  PresetScenario,
} from '@/types';

// Preset Scenarios
export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'beach_midday',
    title: '🏖️ แดดจัดริมชายหาดเที่ยงวัน',
    description: 'ดัชนี UV สูงมาก (UV 11) ท่ามกลางแดดจัด รังสี UVA/UVB เข้มข้นสะท้อนจากพื้นทรายและน้ำ',
    icon: 'Sun',
    uvIndex: 11,
    duration: 60,
    uvType: 'Mixed',
    uvaPercentage: 95,
  },
  {
    id: 'cloudy_walk',
    title: '⛅ เดินเล่นวันเมฆมาก',
    description: 'ดัชนี UV ปานกลาง (UV 5) เมฆบดบังรังสีบางส่วน แต่ UVA ยังคงทะลุผ่านเมฆได้สูงถึง 80%',
    icon: 'CloudSun',
    uvIndex: 5,
    duration: 45,
    uvType: 'Mixed',
    uvaPercentage: 90,
  },
  {
    id: 'window_indoor',
    title: '🪟 นั่งทำงานชิดหน้าต่างใส',
    description: 'กระจกอาคารกรอง UVB ออกเกือบทั้งหมด แต่รังสี UVA สะสมทะลุผ่านกระจกเข้าสู่ผิวชั้นลึกได้ 100%',
    icon: 'Building',
    uvIndex: 4,
    duration: 180,
    uvType: 'UVA',
    uvaPercentage: 100,
  },
  {
    id: 'outdoor_market',
    title: '🛍️ เดินตลาดกลางแจ้งยามบ่าย',
    description: 'ดัชนี UV สูง (UV 8) ช่วงเวลา 14:00 น. ได้รับทั้ง UVA และ UVB ขณะทำกิจกรรมกลางแจ้ง',
    icon: 'ShoppingBag',
    uvIndex: 8,
    duration: 90,
    uvType: 'Mixed',
    uvaPercentage: 95,
  },
];

// Fitzpatrick Scale Information with Authentic Human Skin Tone Warm Palette
export const FITZPATRICK_DATA: Record<FitzpatrickScale, FitzpatrickInfo> = {
  1: {
    scale: 1,
    nameTH: 'Type I - ผิวขาวมาก / Ivory',
    description: 'มีเมลานินน้อยมาก ไวต่อแสงแดดมาก เกิดผิวไหม้แดด (Sunburn) ง่ายมาก และเกือบไม่เปลี่ยนเป็นสีแทน',
    melaninLevel: 'ต่ำมาก (Eumelanin ต่ำ)',
    reactionToSun: 'ไหม้แดดง่ายเสมอ ไม่ค่อยเกิดรอยแทน',
    colorHex: '#fdf2f0',
  },
  2: {
    scale: 2,
    nameTH: 'Type II - ผิวขาวธรรมชาติ / Warm Peach',
    description: 'เมลานินระดับต่ำ ไหม้แดดง่าย และเกิดรอยแทนได้เล็กน้อย',
    melaninLevel: 'ต่ำ (Eumelanin ต่ำ-ปานกลาง)',
    reactionToSun: 'ไหม้แดดง่าย เกิดรอยแทนเล็กน้อย',
    colorHex: '#f7d5c8',
  },
  3: {
    scale: 3,
    nameTH: 'Type III - ผิวขาวปานกลาง / Golden Honey',
    description: 'ระดับเมลานินปานกลาง อาจเกิดผิวไหม้แดดได้เมื่อตากแดดนาน และเกิดรอยแทนได้ปานกลาง',
    melaninLevel: 'ปานกลาง',
    reactionToSun: 'บางครั้งไหม้แดด ค่อยๆ แทน',
    colorHex: '#e2b498',
  },
  4: {
    scale: 4,
    nameTH: 'Type IV - ผิวแทนอ่อน / Warm Terracotta Sand',
    description: 'เมลานินปานกลางถึงสูง ไหม้แดดได้ยากขึ้น เกิดรอยแทนได้ง่ายและเข้มขึ้น',
    melaninLevel: 'ปานกลาง-สูง (Eumelanin ตอบสนองเร็ว)',
    reactionToSun: 'ไหม้แดดยาก เกิดรอยแทนง่าย',
    colorHex: '#c5875c',
  },
  5: {
    scale: 5,
    nameTH: 'Type V - ผิวแทนเข้ม / Rich Warm Bronze',
    description: 'มีเมลานินชนิด Eumelanin หนาแน่นในชั้น Epidermis ไหม้แดดยากมาก เกิดรอยแทนเข้มได้รวดเร็ว',
    melaninLevel: 'สูง',
    reactionToSun: 'นานๆ ครั้งไหม้แดด เกิดรอยแทนเข้มง่าย',
    colorHex: '#8a522f',
  },
  6: {
    scale: 6,
    nameTH: 'Type VI - ผิวแทนเข้มมาก / Deep Warm Mahogany',
    description: 'มี Eumelanin สูงมาก ช่วยดูดกลืนและกระจัดรังสี UV ในชั้น Epidermis แต่ยังคงเสื่อมสภาพจาก UVA ได้',
    melaninLevel: 'สูงมาก',
    reactionToSun: 'แทบไม่ไหม้แดด แต่ UV ยังส่งผลต่อคอลลาเจนและเซลล์',
    colorHex: '#4a291a',
  },
};

const SPF_MAP: Record<number, number> = {
  15: 0.933,
  30: 0.967,
  50: 0.98,
  50.1: 0.985,
};

const PA_MAP: Record<string, number> = {
  'PA+': 0.6,
  'PA++': 0.75,
  'PA+++': 0.88,
  'PA++++': 0.95,
};

const MELANIN_FACTOR: Record<FitzpatrickScale, number> = {
  1: 0.05,
  2: 0.1,
  3: 0.18,
  4: 0.25,
  5: 0.32,
  6: 0.38,
};

function getProtectionLevel(score: number): ProtectionLevel {
  if (score < 20) return 'ต่ำ';
  if (score < 45) return 'ปานกลาง';
  if (score < 70) return 'สูง';
  return 'สูงมาก';
}

function calculateRawImpact(
  settings: SimulatorSettings,
  behaviors: ProtectionBehaviors,
  applyProtections: boolean
) {
  const { uvIndex, duration, uvType, uvaPercentage, fitzpatrickScale } = settings;

  const intensityRatio = Math.min(uvIndex / 11, 1.2);
  const timeFactor = Math.min(duration / 60, 3.0);
  const baseDose = intensityRatio * timeFactor * 45;

  let uvaFraction = 0.95;
  let uvbFraction = 0.05;

  if (uvType === 'UVA') {
    uvaFraction = 1.0;
    uvbFraction = 0.0;
  } else if (uvType === 'UVB') {
    uvaFraction = 0.0;
    uvbFraction = 1.0;
  } else {
    uvaFraction = uvaPercentage / 100;
    uvbFraction = 1.0 - uvaFraction;
  }

  let uvbBlockRate = 0;
  let uvaBlockRate = 0;
  let generalBlockRate = 0;

  if (applyProtections) {
    if (behaviors.useSunscreen) {
      let spfFactor = SPF_MAP[behaviors.sunscreenSPF] || 0.95;
      let paFactor = PA_MAP[behaviors.sunscreenPA] || 0.75;

      if (duration > 120 && !behaviors.reapplySunscreen) {
        spfFactor *= 0.65;
        paFactor *= 0.65;
      }

      uvbBlockRate = spfFactor;
      uvaBlockRate = paFactor;
    }

    if (behaviors.wearProtectiveClothing) {
      generalBlockRate += 0.45;
    }

    if (behaviors.avoidPeakHours) {
      generalBlockRate += 0.35;
    }
  }

  const melaninAbsorb = MELANIN_FACTOR[fitzpatrickScale] || 0.15;

  const netUVB = Math.max(0, uvbFraction * (1 - uvbBlockRate) * (1 - generalBlockRate));
  const netUVA = Math.max(0, uvaFraction * (1 - uvaBlockRate) * (1 - generalBlockRate));

  const epiDose = baseDose * (netUVB * 0.85 + netUVA * 0.25) * (1 - melaninAbsorb * 0.4);
  const derDose = baseDose * (netUVB * 0.1 + netUVA * 0.7) * (1 - melaninAbsorb * 0.2);
  const subDose = baseDose * (netUVA * 0.15);

  const epiScore = Math.min(100, Math.round(epiDose));
  const derScore = Math.min(100, Math.round(derDose));
  const subScore = Math.min(100, Math.round(subDose));

  const overallScore = Math.min(100, Math.round(epiScore * 0.45 + derScore * 0.45 + subScore * 0.1));

  return {
    epiScore,
    derScore,
    subScore,
    overallScore,
  };
}

export function calculateUVImpact(
  settings: SimulatorSettings,
  behaviors: ProtectionBehaviors
): UVResult {
  const protectedRaw = calculateRawImpact(settings, behaviors, true);
  const unprotectedRaw = calculateRawImpact(settings, behaviors, false);

  const efficiency =
    unprotectedRaw.overallScore > 0
      ? Math.max(
          0,
          Math.round(
            ((unprotectedRaw.overallScore - protectedRaw.overallScore) /
              unprotectedRaw.overallScore) *
              100
          )
        )
      : 0;

  const epidermis: LayerImpact = {
    score: protectedRaw.epiScore,
    level: getProtectionLevel(protectedRaw.epiScore),
    biologicalEffect:
      protectedRaw.epiScore > 60
        ? 'ผิวเกิดอาการไหม้แดง (Erythema), เซลล์ DNA เสียหาย, ร่างกายเร่งผลิตเมลานินคล้ำขึ้น'
        : protectedRaw.epiScore > 30
        ? 'การระคายเคืองผิวชั้นนอกเบาบาง เกิดอนุมูลอิสระ กระตุ้นเม็ดสีเล็กน้อย'
        : 'ผิวชั้นนอกอยู่ในสภาวะปลอดภัย ได้รับผลกระทบจากแสงแดดต่ำ',
    damageKeypoints: [
      'กระทบเซลล์ Keratinocyte ชั้นหนังกำพร้า',
      'เสี่ยงต่อการไหม้แดด (Sunburn) จากรังสี UVB',
      'การสะสมอนุมูลอิสระในชั้นผิวตื้น',
    ],
  };

  const dermis: LayerImpact = {
    score: protectedRaw.derScore,
    level: getProtectionLevel(protectedRaw.derScore),
    biologicalEffect:
      protectedRaw.derScore > 60
        ? 'รังสี UVA ทำลายคอลลาเจนและอิลาสตินอย่างรุนแรง เกิดริ้วรอยลึก ผิวหย่อนคล้อย (Photoaging)'
        : protectedRaw.derScore > 30
        ? 'การเสื่อมสภาพของเส้นใยผิวระดับปานกลาง เกิดอนุมูลอิสระสะสมใต้ชั้นผิวแท้'
        : 'โครงสร้างคอลลาเจนใต้ชั้นผิวหนังแท้ยังคงแข็งแรงดี',
    damageKeypoints: [
      'UVA ทะลวงลึกถึงเส้นใยคอลลาเจน (Collagen fragmentation)',
      'กระตุ้นเอนไซม์ MMP ทำลายโครงสร้างผิว (Photoaging)',
      'กระทบหลอดเลือดฝอยและเซลล์ Fibroblast',
    ],
  };

  const subcutaneous: LayerImpact = {
    score: protectedRaw.subScore,
    level: getProtectionLevel(protectedRaw.subScore),
    biologicalEffect:
      protectedRaw.subScore > 50
        ? 'รังสี UVA ปริมาณสูงผ่านลงถึงชั้นไขมันใต้ผิว อาจส่งผลให้ความยืดหยุ่นชั้นลึกสะสมความร้อน'
        : 'ผลกระทบต่ำมาก รังสีส่วนใหญ่ถูกกรองในชั้น Epidermis และ Dermis',
    damageKeypoints: ['รังสี UVB ไม่สามารถลงถึงชั้นนี้', 'รังสี UVA ปริมาณเล็กน้อยทะลุผ่านลงมาได้'],
  };

  const recommendations = generateRecommendations(settings, behaviors, protectedRaw.overallScore);
  const scientificInsights = generateScientificInsights(settings, behaviors);

  return {
    epidermis,
    dermis,
    subcutaneous,
    overallScore: protectedRaw.overallScore,
    overallRisk: getProtectionLevel(protectedRaw.overallScore),
    protectionEfficiency: efficiency,
    description: generateDescription(settings, behaviors, protectedRaw.overallScore),
    recommendations,
    scientificInsights,
    unprotectedBaseline: {
      epidermis: {
        score: unprotectedRaw.epiScore,
        level: getProtectionLevel(unprotectedRaw.epiScore),
        biologicalEffect: '',
        damageKeypoints: [],
      },
      dermis: {
        score: unprotectedRaw.derScore,
        level: getProtectionLevel(unprotectedRaw.derScore),
        biologicalEffect: '',
        damageKeypoints: [],
      },
      subcutaneous: {
        score: unprotectedRaw.subScore,
        level: getProtectionLevel(unprotectedRaw.subScore),
        biologicalEffect: '',
        damageKeypoints: [],
      },
      overallScore: unprotectedRaw.overallScore,
      overallRisk: getProtectionLevel(unprotectedRaw.overallScore),
    },
  };
}

function generateDescription(
  settings: SimulatorSettings,
  behaviors: ProtectionBehaviors,
  overallScore: number
): string {
  const uvTypeName =
    settings.uvType === 'UVA'
      ? 'รังสี UVA (ความยาวคลื่นยาว 320-400nm)'
      : settings.uvType === 'UVB'
      ? 'รังสี UVB (ความยาวคลื่นสั้น 290-320nm)'
      : `รังสีผสม UVA ${settings.uvaPercentage}% / UVB ${100 - settings.uvaPercentage}%`;

  const fitzInfo = FITZPATRICK_DATA[settings.fitzpatrickScale];
  const protectionCount =
    (behaviors.useSunscreen ? 1 : 0) +
    (behaviors.wearProtectiveClothing ? 1 : 0) +
    (behaviors.avoidPeakHours ? 1 : 0);

  let protectionSummary = 'ไม่มีมาตรการป้องกันแสงแดด';
  if (protectionCount === 3) protectionSummary = 'ครบทุกมาตรการป้องกัน (กันแดด + ร่ม/เสื้อผ้า + หลบแดดจัด)';
  else if (protectionCount > 0) protectionSummary = `มีการป้องกัน ${protectionCount} รายการ`;

  return `สถานการณ์ UV Index ${settings.uvIndex} ระยะเวลา ${settings.duration} นาที (${uvTypeName}) ร่วมกับระดับเมลานิน ${fitzInfo.nameTH} โดย${protectionSummary}`;
}

function generateRecommendations(
  settings: SimulatorSettings,
  behaviors: ProtectionBehaviors,
  score: number
): string[] {
  const list: string[] = [];

  if (!behaviors.useSunscreen) {
    list.push('ควรทาครีมกันแดดชนิด Broad Spectrum (ปกป้องทั้ง UVA และ UVB) เป็นประจำทุกวัน');
  } else {
    if (settings.uvType === 'UVA' || settings.uvaPercentage >= 80) {
      if (behaviors.sunscreenPA === 'PA+' || behaviors.sunscreenPA === 'PA++') {
        list.push('แนะนำยกระดับค่า PA เป็น PA+++ หรือ PA++++ เพื่อต้านทานรังสี UVA ที่ลงลึกถึงชั้น Dermis');
      }
    }
    if (settings.uvIndex >= 8 && behaviors.sunscreenSPF < 50) {
      list.push('ในสถานการณ์ UV สูงมาก (UV 8+) ควรเลือกครีมกันแดด SPF 50 ขึ้นไป');
    }
    if (settings.duration > 120 && !behaviors.reapplySunscreen) {
      list.push('⚠️ การตากแดดนานเกิน 2 ชั่วโมง ควรทาครีมกันแดดซ้ำเพื่อคงประสิทธิภาพการปกป้องผิว');
    }
  }

  if (!behaviors.wearProtectiveClothing && settings.uvIndex >= 6) {
    list.push('เสริมการป้องกันด้วยหมวกปีกกว้าง แว่นตากันรังสี UV และเสื้อแขนยาว UPF 50+');
  }

  if (!behaviors.avoidPeakHours && settings.uvIndex >= 8) {
    list.push('พยายามหลีกเลี่ยงการทำกิจกรรมกลางแจ้งช่วง 10:00 - 16:00 น. ซึ่งเป็นช่วงที่ความเข้ม UV สูงสุด');
  }

  if (list.length === 0) {
    list.push('ปฏิบัติตามแนวทางการป้องกันแสงแดดได้เหมาะสมแล้ว ควรทาครีมกันแดดสม่ำเสมอเป็นประจำ');
  }

  return list;
}

function generateScientificInsights(
  settings: SimulatorSettings,
  behaviors: ProtectionBehaviors
): string[] {
  const insights: string[] = [];

  if (settings.uvType === 'UVA' || settings.uvaPercentage >= 80) {
    insights.push(
      '💡 **UVA & Photoaging**: รังสี UVA มีความยาวคลื่น 320-400nm สามารถทะลุผ่านกระจกและชั้น Epidermis ลงไปทำลายคอลลาเจนในชั้น Dermis ก่อให้เกิดอนุมูลอิสระ (ROS) และริ้วรอยก่อนวัย'
    );
  }

  if (settings.uvType === 'UVB' || settings.uvaPercentage < 80) {
    insights.push(
      '💡 **UVB & Erythema**: รังสี UVB มีพลังงานสูง (290-320nm) ถูกดูดกลืนเกือบทั้งหมดในชั้น Epidermis ทำให้เกิดผิวไหม้แดด (Sunburn) และความเสียหายต่อ DNA ในเซลล์ Keratinocyte'
    );
  }

  insights.push(
    `💡 **บทบาทของ Melanin (${FITZPATRICK_DATA[settings.fitzpatrickScale].nameTH})**: เมลานิน (Eumelanin) ในชั้น Epidermis ทำหน้าที่เป็นตัวดูดกลืนและกระจายพลังงาน UV จากธรรมชาติ แต่ทุกสีผิวยังคงเกิด Photoaging จาก UVA ได้เหมือนกัน`
  );

  if (behaviors.useSunscreen) {
    insights.push(
      '💡 **SPF vs PA**: ค่า SPF (Sun Protection Factor) วัดประสิทธิภาพการกัน UVB (ผิวไหม้) ส่วนค่า PA (Protection Grade of UVA) วัดประสิทธิภาพการกัน UVA (แก่ก่อนวัย/ฝ้าสะสม)'
    );
  }

  return insights;
}
