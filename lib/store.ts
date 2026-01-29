import { create } from 'zustand';
import type { LabState, ModuleType, PracticeMode, LabError, Score, Measurements } from './types';

const calculateAccuracyScore = (completedSteps: number, totalSteps: number): number => {
  return (completedSteps / totalSteps) * 40;
};

const calculateSafetyScore = (errors: LabError[]): number => {
  const safetyErrors = errors.filter(e => e.type === 'safety').length;
  return Math.max(0, 30 - safetyErrors * 5);
};

const calculateEfficiencyScore = (elapsedTime: number, expectedTime: number): number => {
  if (elapsedTime <= expectedTime) return 30;
  const penalty = (elapsedTime - expectedTime) * 0.5;
  return Math.max(0, 30 - penalty);
};

export const useLabStore = create<LabState>((set, get) => ({
  // Initial State
  currentModule: 'COD',
  currentStep: 1,
  mode: 'guided',
  isComplete: false,

  hasGloves: false,
  hasGoggles: false,

  measurements: {},

  errors: [],

  score: {
    accuracy: 0,
    safety: 30,
    efficiency: 30,
    total: 0,
  },

  startTime: 0,
  elapsedTime: 0,

  // Module Actions
  setModule: (module: ModuleType) => {
    set({
      currentModule: module,
      currentStep: 1,
      isComplete: false,
      hasGloves: false,
      hasGoggles: false,
      measurements: {},
      errors: [],
      score: { accuracy: 0, safety: 30, efficiency: 30, total: 0 },
      elapsedTime: 0,
    });
  },

  setMode: (mode: PracticeMode) => {
    set({ mode });
  },

  // Step Navigation
  nextStep: () => {
    const { currentStep, currentModule } = get();
    const maxSteps = currentModule === 'COD' ? 8 : 7;
    if (currentStep < maxSteps) {
      set({ currentStep: currentStep + 1 });
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  goToStep: (step: number) => {
    set({ currentStep: step });
  },

  completeStep: (step: number) => {
    const { currentModule, currentStep } = get();
    const maxSteps = currentModule === 'COD' ? 8 : 7;
    if (step === maxSteps) {
      set({ isComplete: true });
      get().calculateScore();
    }
  },

  // Reset Actions
  resetModule: () => {
    set({
      currentStep: 1,
      isComplete: false,
      hasGloves: false,
      hasGoggles: false,
      measurements: {},
      errors: [],
      score: { accuracy: 0, safety: 30, efficiency: 30, total: 0 },
      elapsedTime: 0,
    });
  },

  resetAll: () => {
    set({
      currentModule: 'COD',
      currentStep: 1,
      mode: 'guided',
      isComplete: false,
      hasGloves: false,
      hasGoggles: false,
      measurements: {},
      errors: [],
      score: { accuracy: 0, safety: 30, efficiency: 30, total: 0 },
      startTime: 0,
      elapsedTime: 0,
    });
  },

  // Safety Actions
  toggleGloves: () => {
    set((state) => ({ hasGloves: !state.hasGloves }));
  },

  toggleGoggles: () => {
    set((state) => ({ hasGoggles: !state.hasGoggles }));
  },

  // Measurement Actions
  setMeasurement: (key: keyof Measurements, value: number | boolean) => {
    set((state) => ({
      measurements: { ...state.measurements, [key]: value },
    }));
  },

  // Error Actions
  addError: (error: Omit<LabError, 'id' | 'timestamp'>) => {
    const newError: LabError = {
      ...error,
      id: `error-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };
    set((state) => ({
      errors: [...state.errors, newError],
    }));
  },

  resolveError: (errorId: string) => {
    set((state) => ({
      errors: state.errors.map((e) =>
        e.id === errorId ? { ...e, resolved: true } : e
      ),
    }));
  },

  clearErrors: () => {
    set({ errors: [] });
  },

  // Score Actions
  calculateScore: () => {
    const { currentModule, currentStep, errors, elapsedTime } = get();
    const totalSteps = currentModule === 'COD' ? 8 : 7;
    const expectedTime = currentModule === 'COD' ? 20 : 15; // minutes

    const accuracy = calculateAccuracyScore(currentStep, totalSteps);
    const safety = calculateSafetyScore(errors);
    const efficiency = calculateEfficiencyScore(elapsedTime / 60, expectedTime); // convert seconds to minutes

    set({
      score: {
        accuracy,
        safety,
        efficiency,
        total: accuracy + safety + efficiency,
      },
    });
  },

  // Timer Actions
  startTimer: () => {
    set({ startTime: Date.now() });
  },

  stopTimer: () => {
    const { startTime, elapsedTime } = get();
    const sessionTime = startTime > 0 ? (Date.now() - startTime) / 1000 : 0;
    set({ startTime: 0, elapsedTime: elapsedTime + sessionTime });
  },

  updateElapsedTime: () => {
    const { startTime, elapsedTime } = get();
    if (startTime > 0) {
      const sessionTime = (Date.now() - startTime) / 1000;
      set({ elapsedTime: elapsedTime + sessionTime });
    }
  },
}));
