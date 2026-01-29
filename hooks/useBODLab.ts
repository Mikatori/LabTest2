'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLabStore } from '@/lib/store';
import { CONSTANTS } from '@/lib/constants';

export function useBODLab() {
  const {
    currentStep,
    hasGloves,
    hasGoggles,
    measurements,
    setMeasurement,
    addError,
  } = useLabStore();

  const [selectedChemical, setSelectedChemical] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [incubatorTemperature, setIncubatorTemperature] = useState(20);
  const [isIncubating, setIsIncubating] = useState(false);
  const [incubationProgress, setIncubationProgress] = useState(0);
  const [hasBubbles, setHasBubbles] = useState(false);
  const [isCapped, setIsCapped] = useState(false);

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

  // Step 2: Prepare sample with nutrients and microorganisms
  const addNutrient = useCallback(() => {
    if (currentStep === 2) {
      if (!hasGloves || !hasGoggles) {
        addError({
          step: 2,
          type: 'safety',
          message: 'Cần đeo đồ bảo hộ khi thêm hóa chất',
        });
        return;
      }

      setMeasurement('hasNutrient', true);
      setSelectedChemical('nutrient');
    }
  }, [currentStep, hasGloves, hasGoggles, setMeasurement, addError]);

  const addMicroorganism = useCallback(() => {
    if (currentStep === 2) {
      if (!hasGloves || !hasGoggles) {
        addError({
          step: 2,
          type: 'safety',
          message: 'Cần đeo đồ bảo hộ khi thêm hóa chất',
        });
        return;
      }

      setMeasurement('hasMicroorganism', true);
      setSelectedChemical('microorganism');
    }
  }, [currentStep, hasGloves, hasGoggles, setMeasurement, addError]);

  const mixSample = useCallback(() => {
    if (currentStep === 2) {
      if (!measurements.hasNutrient || !measurements.hasMicroorganism) {
        addError({
          step: 2,
          type: 'procedure',
          message: 'Cần thêm cả chất dinh dưỡng và vi sinh vật',
        });
        return;
      }

      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1500);
    }
  }, [currentStep, measurements.hasNutrient, measurements.hasMicroorganism, addError]);

  // Step 3: Fill BOD bottle
  const fillBODBottle = useCallback((volume: number) => {
    if (currentStep === 3) {
      if (volume < 295 || volume > 305) {
        addError({
          step: 3,
          type: 'measurement',
          message: `Thể tích không chính xác: ${volume.toFixed(0)}ml. Cần 300ml ±5ml`,
        });
        return;
      }

      if (hasBubbles) {
        addError({
          step: 3,
          type: 'procedure',
          message: 'Chai BOD không được có bọt khí',
        });
        return;
      }

      setMeasurement('bodVolume', volume);
    }
  }, [currentStep, hasBubbles, setMeasurement, addError]);

  const detectBubbles = useCallback(() => {
    if (currentStep === 3) {
      // Randomly detect bubbles (for demonstration)
      const hasBubblesDetected = Math.random() > 0.7;
      setHasBubbles(hasBubblesDetected);
      if (hasBubblesDetected) {
        addError({
          step: 3,
          type: 'procedure',
          message: 'Phát hiện bọt khí trong chai! Cần đổ lại cho hết bọt',
        });
      }
    }
  }, [currentStep, addError]);

  // Step 4: Measure initial DO
  const measureDO0 = useCallback(() => {
    if (currentStep === 4) {
      if (!measurements.bodVolume) {
        addError({
          step: 4,
          type: 'procedure',
          message: 'Cần đổ đầy chai BOD trước khi đo DO',
        });
        return;
      }

      // Simulate DO measurement
      const randomDO0 = 7 + Math.random() * 3; // 7-10 mg/L
      setMeasurement('do0', randomDO0);
    }
  }, [currentStep, measurements.bodVolume, setMeasurement, addError]);

  // Step 5: Cap bottle and place in incubator
  const capBottle = useCallback(() => {
    if (currentStep === 5) {
      setIsCapped(true);
      setMeasurement('isCapped', true);
    }
  }, [currentStep, setMeasurement]);

  const placeInIncubator = useCallback(() => {
    if (currentStep === 5) {
      if (!measurements.isCapped) {
        addError({
          step: 5,
          type: 'procedure',
          message: 'Cần đậy kín chai BOD trước khi đặt vào tủ ủ',
        });
        return;
      }

      setMeasurement('isIncubated', true);
    }
  }, [currentStep, measurements.isCapped, setMeasurement, addError]);

  // Step 6: Incubation process (5 days)
  const startIncubation = useCallback(() => {
    if (currentStep === 6) {
      if (!measurements.isIncubated) {
        addError({
          step: 6,
          type: 'procedure',
          message: 'Cần đặt chai vào tủ ủ trước khi bắt đầu ủ',
        });
        return;
      }

      if (incubatorTemperature < 19 || incubatorTemperature > 21) {
        addError({
          step: 6,
          type: 'measurement',
          message: `Nhiệt độ không đúng: ${incubatorTemperature}°C. Cần 20°C ±1°C`,
        });
        return;
      }

      setMeasurement('incubatorTemperature', incubatorTemperature);
      setIsIncubating(true);

      // Simulate 5-day incubation (fast-forward)
      const days = 5;
      const dayDuration = 1000; // 1 second per day in simulation

      let currentDay = 0;
      const incubationInterval = setInterval(() => {
        currentDay++;
        setIncubationProgress((currentDay / days) * 100);

        if (currentDay >= days) {
          clearInterval(incubationInterval);
          setIsIncubating(false);
          setMeasurement('incubationComplete', true);
        }
      }, dayDuration);

      return () => clearInterval(incubationInterval);
    }
  }, [currentStep, measurements.isIncubated, incubatorTemperature, setMeasurement, addError]);

  const setIncubatorTemp = useCallback((temp: number) => {
    if (currentStep === 6 && !isIncubating) {
      setIncubatorTemperature(temp);
    }
  }, [currentStep, isIncubating]);

  // Step 7: Measure final DO
  const measureDO5 = useCallback(() => {
    if (currentStep === 7) {
      if (!measurements.incubationComplete) {
        addError({
          step: 7,
          type: 'procedure',
          message: 'Cần hoàn tất ủ 5 ngày trước khi đo DO lần 2',
        });
        return;
      }

      // Simulate DO measurement
      const do0 = measurements.do0 || 7;
      const oxygenConsumption = 2 + Math.random() * 3; // 2-5 mg/L consumed
      const randomDO5 = Math.max(0, do0 - oxygenConsumption);

      setMeasurement('do5', randomDO5);

      // Calculate BOD5
      const bod5 = (do0 - randomDO5) * 100; // Scale for demonstration
      setMeasurement('bod5', bod5);
    }
  }, [currentStep, measurements.incubationComplete, measurements.do0, setMeasurement, addError]);

  // Reset helpers when step changes
  useEffect(() => {
    if (currentStep === 3) {
      setHasBubbles(false);
    }
    if (currentStep === 6 && !measurements.incubationComplete) {
      setIncubationProgress(0);
    }
  }, [currentStep, measurements.incubationComplete]);

  return {
    // State
    selectedChemical,
    isShaking,
    incubatorTemperature,
    isIncubating,
    incubationProgress,
    hasBubbles,
    isCapped,

    // Actions
    handleSafetyEquipment,
    addNutrient,
    addMicroorganism,
    mixSample,
    fillBODBottle,
    detectBubbles,
    measureDO0,
    capBottle,
    placeInIncubator,
    startIncubation,
    setIncubatorTemp,
    measureDO5,
  };
}
