'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLabStore } from '@/lib/store';
import type { Step } from '@/lib/types';

interface ControlPanelProps {
  title: string;
  description: string;
  steps: Step[];
  currentStep: number;
  hint?: string;
  showHint: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onReset: () => void;
  onShowHint: () => void;
  canProceed: boolean;
  isComplete: boolean;
}

export default function ControlPanel({
  title,
  description,
  steps,
  currentStep,
  hint,
  showHint,
  onNextStep,
  onPreviousStep,
  onReset,
  onShowHint,
  canProceed,
  isComplete,
}: ControlPanelProps) {
  const { elapsedTime, mode, setMode } = useLabStore();
  const [timer, setTimer] = useState(0);

  // Update timer display
  useEffect(() => {
    const interval = setInterval(() => {
      const state = useLabStore.getState();
      const totalElapsed = state.elapsedTime + (state.startTime > 0 ? (Date.now() - state.startTime) / 1000 : 0);
      setTimer(totalElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-400">{title}</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Timer */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span className="text-lg font-semibold">Thời gian</span>
          </div>
          <span className="text-2xl font-mono font-bold text-green-400">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Chế độ luyện tập</label>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('guided')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              mode === 'guided'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Hướng dẫn
          </button>
          <button
            onClick={() => setMode('practice')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              mode === 'practice'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Tự do
          </button>
        </div>
      </div>

      {/* Step Checklist */}
      <div className="flex-1 overflow-y-auto mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">TIẾN TRÌNH</h3>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  status === 'current'
                    ? 'bg-blue-600/30 border border-blue-500'
                    : status === 'completed'
                    ? 'bg-green-600/20 border border-green-500/50'
                    : 'bg-gray-700/30 border border-gray-600/30'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    status === 'completed'
                      ? 'bg-green-500 text-white'
                      : status === 'current'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {status === 'completed' ? '✓' : step.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      status === 'current' ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hint Section */}
      <AnimatePresence>
        {showHint && hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 bg-yellow-600/20 border border-yellow-500 rounded-lg p-4"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <p className="text-sm text-yellow-200">{hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Button */}
      <button
        onClick={onShowHint}
        className="w-full mb-4 py-2 px-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <span>💡</span>
        <span>Gợi ý</span>
      </button>

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onPreviousStep}
          disabled={currentStep === 1}
          className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-all font-semibold"
        >
          ← Quay lại
        </button>
        <button
          onClick={onNextStep}
          disabled={!canProceed || isComplete}
          className={`flex-1 py-3 px-6 rounded-lg transition-all font-semibold ${
            canProceed && !isComplete
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isComplete ? 'Hoàn thành ✓' : 'Tiếp tục →'}
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full mt-3 py-2 px-4 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all text-sm border border-red-600/50"
      >
        🔄 Bắt đầu lại
      </button>
    </div>
  );
}
