'use client';

import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SessionCard from '@/components/agenda/SessionCard';
import { sessions } from '@/data/sessions';
import { Phase } from '@/types';
import clsx from 'clsx';

const days: { date: string; label: string; sublabel: string; event: string; venue: string; venueUrl: string }[] = [
  { date: '2026-05-24', label: 'May 24', sublabel: 'Sun', event: 'VIP Dinner', venue: 'EMpower Founders Residency Villa', venueUrl: 'https://maps.app.goo.gl/oGMoX6DSFs2GUBvB9' },
  { date: '2026-05-25', label: 'May 25', sublabel: 'Mon', event: "Web3 Builders' Summit", venue: 'Risemount Premier Resort Da Nang', venueUrl: 'https://maps.app.goo.gl/j8sSaJ44D48Xqenk9' },
  { date: '2026-05-26', label: 'May 26', sublabel: 'Tue', event: 'DAVAS 2026 — Opening Session', venue: 'Ariyana International Convention Centre', venueUrl: 'https://maps.app.goo.gl/17aPNXp8VyYqG8Cu6' },
  { date: '2026-05-27', label: 'May 27', sublabel: 'Wed', event: 'DAVAS 2026 — Startup Pitching Day', venue: 'Ariyana International Convention Centre', venueUrl: 'https://maps.app.goo.gl/17aPNXp8VyYqG8Cu6' },
];

const phases: { value: Phase; label: string; time: string }[] = [
  { value: 'morning', label: 'Morning', time: '08:30' },
  { value: 'afternoon', label: 'Afternoon', time: '13:30' },
  { value: 'evening', label: 'Evening', time: '18:00' },
];

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState('2026-05-25');
  const [activePhase, setActivePhase] = useState<Phase>('morning');

  const isMainDay = activeDay === '2026-05-25';
  const activeDay_ = days.find((d) => d.date === activeDay);
  const activeEvent = activeDay_?.event ?? '';
  const activeVenue = activeDay_?.venue ?? '';
  const activeVenueUrl = activeDay_?.venueUrl ?? '';

  const daySessions = sessions.filter((s) => s.date === activeDay);
  const filtered = isMainDay
    ? daySessions.filter((s) => s.phase === activePhase)
    : daySessions;

  return (
    <PageWrapper>
      <TopBar title="Agenda" />

      {/* Day tabs */}
      <div className="flex gap-2 mb-3">
        {days.map(({ date, label, sublabel }) => (
          <button
            key={date}
            onClick={() => setActiveDay(date)}
            className={clsx(
              'flex-1 flex flex-col items-center py-2 text-xs font-medium rounded transition-all duration-200',
              activeDay === date
                ? 'bg-[#FFB800]/15 border border-[#FFB800]/40 text-[#FFB800]'
                : 'bg-[#0D0D10] border border-white/10 text-[#A1A1AA] hover:text-white'
            )}
          >
            <span className="font-semibold text-[11px]">{label}</span>
            <span className="text-[10px] opacity-70">{sublabel}</span>
          </button>
        ))}
      </div>

      {/* Event header */}
      <div className="mt-3 mb-1">
        <h2 className="font-[family-name:var(--font-anton)] text-white text-xl uppercase leading-tight">{activeEvent}</h2>
      </div>

      {/* Venue */}
      <a href={activeVenueUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 mb-4 group w-fit">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:stroke-[#FFB800] transition-colors">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="text-[#A1A1AA] text-xs group-hover:text-[#FFB800] transition-colors underline underline-offset-2">{activeVenue}</p>
      </a>

      {/* Phase tabs — only for May 25 */}
      {isMainDay && (
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
      )}

      {/* Sessions */}
      <div className={clsx('space-y-3', !isMainDay && 'mt-3')}>
        {filtered.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
        {filtered.length === 0 && (
          <p className="text-[#A1A1AA] text-sm text-center py-8">No sessions scheduled.</p>
        )}
      </div>

      {isMainDay && activePhase === 'evening' && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-[#A1A1AA] text-xs text-center">
            May 26–27: DAVAS — Opening Session & Strategic Networking Dialogue
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
