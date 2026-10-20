'use client';

import { Shell } from '@/components/layout/Shell';
import DashboardPage from './(dashboard)/dashboard/page';

export default function Home() {
  return (
    <Shell>
      <DashboardPage />
    </Shell>
  );
}
