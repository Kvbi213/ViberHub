'use client';

import React, { useEffect } from 'react';
import { useVibeHubStore } from '@/lib/store';
import { AuthGate } from '@/components/auth/AuthGate';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Shell } from '@/components/layout/Shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, authInitialized, initAuthListener } = useVibeHubStore();

  useEffect(() => {
    const unsub = initAuthListener();
    return () => unsub();
  }, [initAuthListener]);

  if (!authInitialized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8F9FB] text-slate-400 gap-3">
        <span className="w-8 h-8 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
        <span className="font-mono-status text-xs tracking-wider uppercase text-[#8E8E93]">
          Inicjalizacja VibeHub Mesh...
        </span>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthGate />;
  }

  if (!currentUser.onboardingCompleted) {
    return <OnboardingWizard />;
  }

  return <Shell>{children}</Shell>;
}
