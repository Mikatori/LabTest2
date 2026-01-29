'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLabStore } from '@/lib/store';
import { CONSTANTS } from '@/lib/constants';

export function useCODLab() {
  const {
    currentStep,
    hasGloves,
    hasGoggles,
    measurements,
    setMeasurement,
    addError,
  } = useLabStore();

  const [pipetteVolume, setPipetteVolume] = useState(0);
  const [selectedChemical, setSelectedChemical] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [heaterTemperature, setHeaterTemperature] = useState(25);
  const [isHeating, setIsHeating] = useState(false);
  const [isCooling, setIsCooling] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(25);

  // Step 1: Safety equipment
  const handleSafetyEquipment = useCallback(() => {
    if (currentStep === 1) {
      if (!hasGloves) {
        addError({
          step: 1,
          type: 'safety',
          message: 'Cần đeo găng tay trước khi làm việc',
        });
      }
      if (!hasGoggles) {
        addError({
          step: 1,
          type: 'safety',
          message: 'Cần đeo kính bảo hộ trước khi làm việc',
        });
      }
    }
  }, [currentStep, hasGloves, hasGoggles, addError]);

  // Step 2: Sample volume measurement
  const handlePipetteVolume = useCallback((volume: number) => {
    if (currentStep === 2) {
      setPipetteVolume(volume);
      if (volume >= 2.4 && volume <= 2.6) {
        setMeasurement('volume', volume);
      } else if (volume > 2.6) {
        addError({
          step: 2,
          type: 'measurement',
          message: `Thể tích quá lớn: ${volume.toFixed(1)}ml. Cần 2.5ml ±0.1ml`,
        });
      }
    }
  }, [currentStep, setMeasurement, addError]);

  const dispenseSample = useCallback(() => {
    if (currentStep === 2 && pipetteVolume >= 2.4 && pipetteVolume <= 2.6) {
      setMeasurement('volume', pipetteVolume);
    }
  }, [currentStep, pipetteVolume, setMeasurement]);

  // Step 3: Add K2Cr2O7
  const addK2Cr2O7 = useCallback((volume: number) => {
    if (currentStep === 3) {
      if (!hasGloves || !hasGoggles) {
        addError({
          step: 3,
          type: 'safety',
          message: 'Cần đeo đồ bảo hộ khi thêm hóa chất',
        });
        return;
      }

      if (volume >= 1.4 && volume <= 1.6) {
        setMeasurement('k2cr2o7Volume', volume);
        setSelectedChemical('K2Cr2O7');
      } else {
        addError({
          step: 3,
          type: 'measurement',
          message: `Thể tích không chính xác: ${volume.toFixed(1)}ml. Cần 1.5ml ±0.1ml`,
        });
      }
    }
  }, [currentStep, hasGloves, hasGoggles, setMeasurement, addError]);

  // Step 4: Add H2SO4-Ag2SO4
  const addH2SO4 = useCallback((volume: number) => {
    if (currentStep === 4) {
      if (!measurements.k2cr2o7Volume) {
        addError({
          step: 4,
          type: 'procedure',
          message: 'Phải thêm K₂Cr₂O₇ trước khi thêm H₂SO₄',
        });
        return;
      }

      if (volume >= 3.4 && volume <= 3.6) {
        setMeasurement('h2so4Volume', volume);
        setSelectedChemical('H2SO4');
      } else {
        addError({
          step: 4,
          type: 'measurement',
          message: `Thể tích không chính xác: ${volume.toFixed(1)}ml. Cần 3.5ml ±0.1ml`,
        });
      }
    }
  }, [currentStep, measurements.k2cr2o7Volume, setMeasurement, addError]);

  // Step 5: Cap and shake
  const capTube = useCallback(() => {
    if (currentStep === 5) {
      setMeasurement('isCapped', true);
    }
  }, [currentStep, setMeasurement]);

  const shakeTube = useCallback(() => {
    if (currentStep === 5 && measurements.isCapped) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setMeasurement('isShaken', true);
      }, 2000);
    } else if (!measurements.isCapped) {
      addError({
        step: 5,
        type: 'procedure',
        message: 'Cần đậy nắp ống trước khi lắc',
      });
    }
  }, [currentStep, measurements.isCapped, setMeasurement, addError]);

  // Step 6: Heating
  const startHeating = useCallback(() => {
    if (currentStep === 6) {
      if (!measurements.isShaken) {
        addError({
          step: 6,
          type: 'procedure',
          message: 'Cần lắc đều ống trước khi đun',
        });
        return;
      }

      setIsHeating(true);
      setMeasurement('temperature', heaterTemperature);

      // Simulate heating process (fast-forward)
      const heatingInterval = setInterval(() => {
        setCurrentTemperature((prev) => {
          if (prev >= 150) {
            clearInterval(heatingInterval);
            setIsHeating(false);
            setMeasurement('heatingComplete', true);
            return 150;
          }
          return prev + 5;
        });
      }, 200);

      return () => clearInterval(heatingInterval);
    }
  }, [currentStep, measurements.isShaken, heaterTemperature, setMeasurement, addError]);

  const setHeaterTemp = useCallback((temp: number) => {
    if (currentStep === 6) {
      setHeaterTemperature(temp);
      if (!isHeating) {
        setCurrentTemperature(temp);
      }
    }
  }, [currentStep, isHeating]);

  // Step 7: Cooling
  const startCooling = useCallback(() => {
    if (currentStep === 7) {
      if (!measurements.heatingComplete) {
        addError({
          step: 7,
          type: 'procedure',
          message: 'Cần hoàn tất đun nóng trước khi làm nguội',
        });
        return;
      }

      setIsCooling(true);

      // Simulate cooling process
      const coolingInterval = setInterval(() => {
        setCurrentTemperature((prev) => {
          if (prev <= 35) {
            clearInterval(coolingInterval);
            setIsCooling(false);
            return 35;
          }
          return prev - 2;
        });
      }, 100);

      return () => clearInterval(coolingInterval);
    }
  }, [currentStep, measurements.heatingComplete, addError]);

  // Step 8: Measure with spectrophotometer
  const measureAbsorbance = useCallback(() => {
    if (currentStep === 8) {
      if (currentTemperature > 40) {
        addError({
          step: 8,
          type: 'safety',
          message: `Ống còn quá nóng (${currentTemperature.toFixed(0)}°C). Cần làm nguội xuống <40°C`,
        });
        return;
      }

      // Simulate measurement
      const randomAbsorbance = 0.3 + Math.random() * 0.4;
      setMeasurement('absorbance', randomAbsorbance);

      // Calculate COD (simplified formula)
      const cod = randomAbsorbance * 1000;
      setMeasurement('cod', cod);
    }
  }, [currentStep, currentTemperature, setMeasurement, addError]);

  // Reset helpers when step changes
  useEffect(() => {
    if (currentStep === 2) {
      setPipetteVolume(0);
    }
  }, [currentStep]);

  return {
    // State
    pipetteVolume,
    selectedChemical,
    isShaking,
    heaterTemperature,
    isHeating,
    isCooling,
    currentTemperature,

    // Actions
    handleSafetyEquipment,
    handlePipetteVolume,
    dispenseSample,
    addK2Cr2O7,
    addH2SO4,
    capTube,
    shakeTube,
    startHeating,
    setHeaterTemp,
    startCooling,
    measureAbsorbance,
  };
}
