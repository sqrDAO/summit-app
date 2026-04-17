'use client';

import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import SessionCard from '@/components/agenda/SessionCard';
import { sessions } from '@/data/sessions';
import { Phase } from '@/types';
import clsx from 'clsx';

const phases: { value: Phase; label: string; time: string }[] = [
  { value: 'morning', label: 'Morning', time: '08:30' },
  { value: 'afternoon', label: 'Afternoon', time: '13:30' },
  { value: 'evening', label: 'Evening', time: '18:00' },
];

export default function AgendaPage() {
  const [activePhase, setActivePhase] = useState<Phase>('morning');

  const filtered = sessions.filter((s) => s.phase === activePhase);

  return (
    <PageWrapper>
      <TopBar title="May 25 Agenda" />

      <div className="mb-1">
        <p className="text-[#A1A1AA] text-sm mb-4">International Convention Palace · Furama Resort, Da Nang</p>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-2 mb-6 sticky top-0 bg-black pt-1 pb-2 z-10">
        {phases.map(({ value, label, time }) => (
          <button
            key={value}
            onClick={() => setActivePhase(value)}
            className={clsx(
              'flex-1 flex flex-col items-center py-2.5 text-xs font-medium rounded transition-all duration-200',
              activePhase === value
                ? 'bg-[#FFB800]/15 border border-[#FFB800]/40 text-[#FFB800]'
                : 'bg-[#0D0D10] border border-white/10 text-[#A1A1AA] hover:text-white'
            )}
          >
            <span className="font-semibold">{label}</span>
            <span className="text-[10px] opacity-70 mt-0.5">{time}</span>
          </button>
        ))}
      </div>

      {/* Sessions */}
      <div className="space-y-3">
        {filtered.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {activePhase === 'evening' && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-[#A1A1AA] text-xs text-center">
            May 26–27: DAVAS Extension — free workshops & side events
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
