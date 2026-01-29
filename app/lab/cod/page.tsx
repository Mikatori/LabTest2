'use client';

import { useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';
import { useLabStore } from '@/lib/store';
import { CONSTANTS } from '@/lib/constants';

export default function CODLabPage() {
  const { setModule, resetModule, startTimer } = useLabStore();

  useEffect(() => {
    setModule('COD');
    resetModule();
    startTimer();

    return () => {
      // Cleanup will be handled by the component
    };
  }, [setModule, resetModule, startTimer]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900">
      <LabWorkspace module="COD" steps={CONSTANTS.COD.STEPS} />
    </div>
  );
}
