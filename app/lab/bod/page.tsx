'use client';

import { useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';
import { useLabStore } from '@/lib/store';
import { CONSTANTS } from '@/lib/constants';

export default function BODLabPage() {
  const { setModule, resetModule, startTimer } = useLabStore();

  useEffect(() => {
    setModule('BOD');
    resetModule();
    startTimer();

    return () => {
      // Cleanup will be handled by the component
    };
  }, [setModule, resetModule, startTimer]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900">
      <LabWorkspace module="BOD" steps={CONSTANTS.BOD.STEPS} />
    </div>
  );
}
