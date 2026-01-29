'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LabCanvas from './LabCanvas';
import ControlPanel from './ControlPanel';
import BottomBar from './BottomBar';
import ErrorModal from './ErrorModal';
import ScoreModal from './ScoreModal';
import { useLabStore } from '@/lib/store';
import type { Step } from '@/lib/types';
import { validateStep } from '@/lib/validators';

interface LabWorkspaceProps {
  module: 'COD' | 'BOD';
  steps: Step[];
}

export default function LabWorkspace({ module, steps }: LabWorkspaceProps) {
  const {
    currentStep,
    mode,
    isComplete,
    goToStep,
    completeStep,
    addError,
    score,
    stopTimer,
  } = useLabStore();

  const [showHint, setShowHint] = useState(false);
  const [currentStepValid, setCurrentStepValid] = useState(true);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'safety' | 'procedure' | 'measurement' | 'warning'>('warning');

  // Validate current step
  useEffect(() => {
    const state = useLabStore.getState();
    const validation = validateStep(module, currentStep, state);
    setCurrentStepValid(validation.valid);

    if (!validation.valid && validation.error) {
      setCurrentError(validation.error);
      setErrorType(validation.type || 'warning');
    } else {
      setCurrentError(null);
    }
  }, [currentStep, module]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  const handleNextStep = () => {
    const state = useLabStore.getState();
    const validation = validateStep(module, currentStep, state);

    if (validation.valid) {
      if (currentStep < steps.length) {
        completeStep(currentStep);
        goToStep(currentStep + 1);
      }
    } else {
      if (mode === 'guided') {
        setCurrentError(validation.error || 'Lỗi không xác định');
        setErrorType(validation.type || 'warning');

        // Add error to store
        addError({
          step: currentStep,
          type: validation.type || 'warning',
          message: validation.error || 'Lỗi không xác định',
        });
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc muốn bắt đầu lại từ đầu?')) {
      window.location.reload();
    }
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
    setTimeout(() => setShowHint(false), 5000);
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Canvas - 65% */}
        <div className="flex-[6.5] relative">
          <LabCanvas module={module} currentStep={currentStep} />
        </div>

        {/* Control Panel - 25% */}
        <div className="flex-[2.5] border-l border-gray-700">
          <ControlPanel
            title={currentStepData.title}
            description={currentStepData.description}
            steps={steps}
            currentStep={currentStep}
            hint={currentStepData.hint}
            showHint={showHint}
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            onReset={handleReset}
            onShowHint={handleShowHint}
            canProceed={currentStepValid}
            isComplete={isComplete}
          />
        </div>
      </div>

      {/* Bottom Bar - 10% */}
      <div className="h-[10%] border-t border-gray-700">
        <BottomBar module={module} currentStep={currentStep} />
      </div>

      {/* Error Modal */}
      <AnimatePresence>
        {currentError && mode === 'guided' && !currentStepValid && (
          <ErrorModal
            message={currentError}
            type={errorType}
            onClose={() => setCurrentError(null)}
          />
        )}
      </AnimatePresence>

      {/* Score Modal */}
      <AnimatePresence>
        {isComplete && (
          <ScoreModal
            score={score}
            module={module}
            onClose={() => {
              window.location.href = '/';
            }}
            onRetry={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
