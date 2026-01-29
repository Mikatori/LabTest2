import { COD_STEPS, BOD_STEPS } from './types';

export const CONSTANTS = {
  // COD Constants
  COD: {
    SAMPLE_VOLUME: { min: 2.4, max: 2.6, target: 2.5 },
    K2CR2O7_VOLUME: { min: 1.4, max: 1.6, target: 1.5 },
    H2SO4_VOLUME: { min: 3.4, max: 3.6, target: 3.5 },
    HEATING_TEMPERATURE: { min: 148, max: 152, target: 150 },
    HEATING_TIME: 2 * 60 * 60, // 2 hours in seconds
    COOLING_TEMPERATURE: 40, // max safe temperature
    WAVELENGTH: 600, // nm
    STEPS: COD_STEPS,
  },

  // BOD Constants
  BOD: {
    BOTTLE_VOLUME: { min: 295, max: 305, target: 300 },
    NUTRIENT_VOLUME: 1, // ml
    MICROORGANISM_VOLUME: 1, // ml
    INCUBATOR_TEMPERATURE: { min: 19, max: 21, target: 20 },
    INCUBATION_TIME: 5 * 24 * 60 * 60, // 5 days in seconds
    STEPS: BOD_STEPS,
  },

  // Scoring
  SCORING: {
    ACCURACY_WEIGHT: 0.4,
    SAFETY_WEIGHT: 0.3,
    EFFICIENCY_WEIGHT: 0.3,
    SAFETY_PENALTY: 5,
    COD_EXPECTED_TIME: 20 * 60, // 20 minutes in seconds
    BOD_EXPECTED_TIME: 15 * 60, // 15 minutes in seconds
  },

  // Fast forward multipliers
  TIME_SCALE: {
    NORMAL: 1,
    FAST: 60, // 60x for COD heating
    ULTRA_FAST: 1440, // 1440x for BOD incubation (1 day = 1 minute)
  },

  // Colors
  COLORS: {
    SAFETY: '#ff4d4f',
    PROCEDURE: '#faad14',
    MEASUREMENT: '#ff8c00',
    WARNING: '#1890ff',
    SUCCESS: '#52c41a',
    GLASS: 'rgba(200, 220, 255, 0.3)',
    WATER: 'rgba(135, 206, 235, 0.5)',
    ORANGE_REAGENT: 'rgba(255, 140, 0, 0.7)',
    GREEN_LIQUID: 'rgba(50, 205, 50, 0.6)',
  },
};

export const ERROR_MESSAGES = {
  SAFETY_PREFIX: '⚡',
  PROCEDURE_PREFIX: '🚫',
  MEASUREMENT_PREFIX: '📏',
  WARNING_PREFIX: 'ℹ️',
  DANGER_PREFIX: '🔥',

  COMMON: {
    NO_SAFETY_GEAR: '⚡ Cần đeo đầy đủ đồ bảo hộ trước khi làm việc',
    HOT_EQUIPMENT: '🔥 NGUY HIỂM! Thiết bị còn nóng',
    WRONG_CHEMICAL: '⚠️ Sai hóa chất!',
    WRONG_VOLUME: '📏 Thể tích không chính xác',
    WRONG_TEMPERATURE: '🌡️ Nhiệt độ không đúng',
    WRONG_ORDER: '🚫 Sai thứ tự thao tác',
  },

  COD: {
    STEP2: '📏 Cần lấy chính xác 2.5ml (±0.1ml)',
    STEP3: '📏 Cần thêm 1.5ml K₂Cr₂O₇ (±0.1ml)',
    STEP4: '🚫 Phải thêm K₂Cr₂O₇ trước H₂SO₄',
    STEP5: '⛔ Cần đậy nắp trước khi lắc',
    STEP6: '🌡️ Nhiệt độ phải duy trì ở 150°C ±2°C',
    STEP7: '🔥 NGUY HIỂM! Ống còn nóng',
  },

  BOD: {
    STEP3: '📏 Cần đổ 300ml vào chai BOD (±5ml)',
    STEP4: '📏 Cần đo DO ban đầu',
    STEP5: '⚠️ Phải đậy kín chai BOD',
    STEP6: '❄️ Nhiệt độ ủ phải là 20°C ±1°C',
  },
};

export const CHEMICAL_INFO = {
  K2CR2O7: {
    name: 'K₂Cr₂O₇',
    concentration: '0.25N',
    color: '#ff8c00',
    description: 'Dichromate kali - chất oxy hóa mạnh',
  },
  H2SO4_AG2SO4: {
    name: 'H₂SO₄-Ag₂SO₄',
    color: '#ffa500',
    description: 'Axit sunfuric với bạc sunfat - chất xúc tác',
  },
  WATER_SAMPLE: {
    name: 'Mẫu nước',
    color: '#87ceeb',
    description: 'Mẫu nước cần đo COD',
  },
  NUTRIENT: {
    name: 'Chất dinh dưỡng',
    color: '#90ee90',
    description: 'Dung dịch chất dinh dưỡng cho vi sinh vật',
  },
  MICROORGANISM: {
    name: 'Vi sinh vật',
    color: '#32cd32',
    description: 'Dung dịch vi sinh vật phân hủy hữu cơ',
  },
};

export const EQUIPMENT_INFO = {
  PIPETTE: {
    name: 'Pipette',
    capacity: '5ml',
    description: 'Đong chính xác thể tích nhỏ',
  },
  BEAKER: {
    name: 'Beaker',
    capacity: '100ml',
    description: 'Chứa hóa chất và mẫu nước',
  },
  COD_TUBE: {
    name: 'Ống COD',
    capacity: '20ml',
    description: 'Ống phản ứng COD',
  },
  BOD_BOTTLE: {
    name: 'Chai BOD',
    capacity: '300ml',
    description: 'Chai ủ BOD',
  },
  SPECTROPHOTOMETER: {
    name: 'Spectrophotometer',
    range: '200-800nm',
    description: 'Đo absorbance',
  },
  DO_METER: {
    name: 'DO Meter',
    range: '0-20 mg/L',
    description: 'Đo nồng độ oxy hòa tan',
  },
  HEATER: {
    name: 'Bếp đun',
    range: 'Nhiệt độ phòng - 200°C',
    description: 'Đun nóng ống COD',
  },
  INCUBATOR: {
    name: 'Tủ ủ',
    range: 'Nhiệt độ phòng - 40°C',
    description: 'Ủ chai BOD ở 20°C',
  },
};
