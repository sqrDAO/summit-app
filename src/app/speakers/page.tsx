'use client';

import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SpeakerCard from '@/components/speakers/SpeakerCard';
import { speakers } from '@/data/speakers';

export default function SpeakersPage() {
  const [query, setQuery] = useState('');

  const filtered = speakers.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageWrapper>
      <TopBar title="Speakers" />

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search speakers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#0D0D10] border border-white/10 text-white placeholder-[#A1A1AA]
            text-sm rounded py-2.5 pl-9 pr-4 focus:outline-none focus:border-[#FFB800]/40"
        />
      </div>

      <p className="text-[#A1A1AA] text-xs mb-4">{filtered.length} of 50+ speakers confirmed</p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#A1A1AA] text-sm">No speakers found for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      <p className="text-[#A1A1AA] text-xs text-center mt-6">More speakers to be announced</p>
    </PageWrapper>
  );
}
