import type { LabState } from './types';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  type?: 'safety' | 'procedure' | 'measurement' | 'warning';
}

// COD Validators
export const validateCODStep1 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ trước khi làm việc với hóa chất',
      type: 'safety',
    };
  }
  return { valid: true };
};

export const validateCODStep2 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ',
      type: 'safety',
    };
  }

  const volume = state.measurements.volume;
  if (volume === undefined) {
    return {
      valid: false,
      error: '📏 Cần lấy 2.5ml mẫu nước (±0.1ml)',
      type: 'measurement',
    };
  }

  if (volume < 2.4 || volume > 2.6) {
    return {
      valid: false,
      error: `📏 Cần lấy chính xác 2.5ml (±0.1ml). Bạn đã lấy ${volume.toFixed(1)}ml`,
      type: 'measurement',
    };
  }

  return { valid: true };
};

export const validateCODStep3 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ',
      type: 'safety',
    };
  }

  const k2cr2o7Volume = state.measurements.k2cr2o7Volume;
  if (k2cr2o7Volume === undefined) {
    return {
      valid: false,
      error: '📏 Cần thêm 1.5ml K₂Cr₂O₇ 0.25N (±0.1ml)',
      type: 'measurement',
    };
  }

  if (k2cr2o7Volume < 1.4 || k2cr2o7Volume > 1.6) {
    return {
      valid: false,
      error: `📏 Cần thêm 1.5ml (±0.1ml). Bạn đã thêm ${k2cr2o7Volume.toFixed(1)}ml`,
      type: 'measurement',
    };
  }

  return { valid: true };
};

export const validateCODStep4 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ',
      type: 'safety',
    };
  }

  const k2cr2o7Volume = state.measurements.k2cr2o7Volume;
  if (k2cr2o7Volume === undefined) {
    return {
      valid: false,
      error: '🚫 Phải thêm K₂Cr₂O₇ trước H₂SO₄',
      type: 'procedure',
    };
  }

  const h2so4Volume = state.measurements.h2so4Volume;
  if (h2so4Volume === undefined) {
    return {
      valid: false,
      error: '📏 Cần thêm 3.5ml H₂SO₄-Ag₂SO₄ (±0.1ml)',
      type: 'measurement',
    };
  }

  if (h2so4Volume < 3.4 || h2so4Volume > 3.6) {
    return {
      valid: false,
      error: `📏 Cần thêm 3.5ml (±0.1ml). Bạn đã thêm ${h2so4Volume.toFixed(1)}ml`,
      type: 'measurement',
    };
  }

  return { valid: true };
};

export const validateCODStep5 = (state: LabState): ValidationResult => {
  if (!state.measurements.isCapped) {
    return {
      valid: false,
      error: '⛔ Cần đậy nắp trước khi lắc',
      type: 'procedure',
    };
  }

  if (!state.measurements.isShaken) {
    return {
      valid: false,
      error: '🔄 Cần lắc đều ống COD',
      type: 'procedure',
    };
  }

  return { valid: true };
};

export const validateCODStep6 = (state: LabState): ValidationResult => {
  const temperature = state.measurements.temperature;
  if (temperature === undefined) {
    return {
      valid: false,
      error: '🌡️ Cần đặt ống vào bếp đun và điều chỉnh nhiệt độ',
      type: 'measurement',
    };
  }

  if (temperature < 148 || temperature > 152) {
    return {
      valid: false,
      error: `🌡️ Nhiệt độ phải duy trì ở 150°C ±2°C. Hiện tại: ${temperature.toFixed(0)}°C`,
      type: 'measurement',
    };
  }

  if (!state.measurements.heatingComplete) {
    return {
      valid: false,
      error: '⏱️ Cần đun đủ 2 giờ',
      type: 'warning',
    };
  }

  return { valid: true };
};

export const validateCODStep7 = (state: LabState): ValidationResult => {
  const temperature = state.measurements.temperature;
  if (temperature === undefined || temperature >= 40) {
    return {
      valid: false,
      error: `🔥 NGUY HIỂM! Ống còn nóng (${temperature?.toFixed(0) || '?'}°C). Cần làm nguội xuống <40°C`,
      type: 'safety',
    };
  }

  return { valid: true };
};

export const validateCODStep8 = (state: LabState): ValidationResult => {
  const absorbance = state.measurements.absorbance;
  if (absorbance === undefined) {
    return {
      valid: false,
      error: '📏 Cần đo absorbance tại 600nm',
      type: 'measurement',
    };
  }

  return { valid: true };
};

// BOD Validators
export const validateBODStep1 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ trước khi làm việc',
      type: 'safety',
    };
  }
  return { valid: true };
};

export const validateBODStep2 = (state: LabState): ValidationResult => {
  if (!state.hasGloves || !state.hasGoggles) {
    return {
      valid: false,
      error: '⚡ Cần đeo đầy đủ đồ bảo hộ',
      type: 'safety',
    };
  }

  const hasNutrient = state.measurements.hasNutrient;
  const hasMicroorganism = state.measurements.hasMicroorganism;

  if (!hasNutrient || !hasMicroorganism) {
    return {
      valid: false,
      error: '📏 Cần thêm đầy đủ chất dinh dưỡng và vi sinh vật',
      type: 'measurement',
    };
  }

  return { valid: true };
};

export const validateBODStep3 = (state: LabState): ValidationResult => {
  const volume = state.measurements.bodVolume;
  if (volume === undefined) {
    return {
      valid: false,
      error: '📏 Cần đổ 300ml vào chai BOD (±5ml)',
      type: 'measurement',
    };
  }

  if (volume < 295 || volume > 305) {
    return {
      valid: false,
      error: `📏 Cần đổ 300ml (±5ml). Hiện tại: ${volume.toFixed(0)}ml`,
      type: 'measurement',
    };
  }

  if (state.measurements.hasBubbles) {
    return {
      valid: false,
      error: '⚠️ Chai BOD không được có bọt khí',
      type: 'procedure',
    };
  }

  return { valid: true };
};

export const validateBODStep4 = (state: LabState): ValidationResult => {
  const do0 = state.measurements.do0;
  if (do0 === undefined) {
    return {
      valid: false,
      error: '📏 Cần đo DO ban đầu (DO₀)',
      type: 'measurement',
    };
  }

  return { valid: true };
};

export const validateBODStep5 = (state: LabState): ValidationResult => {
  if (!state.measurements.isCapped) {
    return {
      valid: false,
      error: '⚠️ Phải đậy kín chai để tránh oxy từ không khí',
      type: 'procedure',
    };
  }

  if (!state.measurements.isIncubated) {
    return {
      valid: false,
      error: '📏 Cần đặt chai vào tủ ủ',
      type: 'procedure',
    };
  }

  return { valid: true };
};

export const validateBODStep6 = (state: LabState): ValidationResult => {
  const temperature = state.measurements.incubatorTemperature;
  if (temperature === undefined || temperature < 19 || temperature > 21) {
    return {
      valid: false,
      error: '❄️ Nhiệt độ ủ phải là 20°C ±1°C',
      type: 'measurement',
    };
  }

  if (!state.measurements.incubationComplete) {
    return {
      valid: false,
      error: '⏱️ Cần ủ đủ 5 ngày',
      type: 'warning',
    };
  }

  return { valid: true };
};

export const validateBODStep7 = (state: LabState): ValidationResult => {
  const do5 = state.measurements.do5;
  if (do5 === undefined) {
    return {
      valid: false,
      error: '📏 Cần đo DO sau 5 ngày (DO₅)',
      type: 'measurement',
    };
  }

  return { valid: true };
};

// Validation dispatcher
export const validateStep = (module: 'COD' | 'BOD', step: number, state: LabState): ValidationResult => {
  if (module === 'COD') {
    switch (step) {
      case 1: return validateCODStep1(state);
      case 2: return validateCODStep2(state);
      case 3: return validateCODStep3(state);
      case 4: return validateCODStep4(state);
      case 5: return validateCODStep5(state);
      case 6: return validateCODStep6(state);
      case 7: return validateCODStep7(state);
      case 8: return validateCODStep8(state);
      default: return { valid: true };
    }
  } else {
    switch (step) {
      case 1: return validateBODStep1(state);
      case 2: return validateBODStep2(state);
      case 3: return validateBODStep3(state);
      case 4: return validateBODStep4(state);
      case 5: return validateBODStep5(state);
      case 6: return validateBODStep6(state);
      case 7: return validateBODStep7(state);
      default: return { valid: true };
    }
  }
};
