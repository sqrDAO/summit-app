'use client';

import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import DogEarCard from '@/components/ui/DogEarCard';
import GoldButton from '@/components/ui/GoldButton';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import { useCountdown } from '@/hooks/useCountdown';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-[family-name:var(--font-anton)] text-[#FFB800] text-3xl leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[#A1A1AA] text-[10px] mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function HomePage() {
  const countdown = useCountdown();

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="pt-4 pb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="gold">May 24–27, 2026</Badge>
          <Badge variant="gray">Da Nang, Vietnam</Badge>
        </div>
        <h1 className="font-[family-name:var(--font-anton)] text-white text-4xl leading-tight uppercase mb-2">
          Web3 Builders&apos; Summit
        </h1>
        <p className="text-[#FFB800] font-semibold tracking-widest text-sm uppercase mb-4">LFBUIDL 2026</p>
        <p className="text-[#A1A1AA] text-sm leading-relaxed">
          The premier Web3 event in Southeast Asia. 50+ speakers, 350+ builders, 40+ partners gathering at Furama Resort, Da Nang.
        </p>
      </div>

      {/* Countdown */}
      {!countdown.isOver && (
        <DogEarCard className="p-5 mb-4" gold>
          <p className="text-[#A1A1AA] text-xs uppercase tracking-widest mb-4 text-center">Event starts in</p>
          <div className="flex items-center justify-center gap-6">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-[#FFB800] text-2xl font-light pb-4">:</span>
            <CountdownUnit value={countdown.hours} label="Hrs" />
            <span className="text-[#FFB800] text-2xl font-light pb-4">:</span>
            <CountdownUnit value={countdown.minutes} label="Min" />
            <span className="text-[#FFB800] text-2xl font-light pb-4">:</span>
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
        </DogEarCard>
      )}

      {/* Venue */}
      <DogEarCard className="p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#FFB800]/15 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Furama Resort Da Nang</p>
            <p className="text-[#A1A1AA] text-xs mt-0.5">5 Truong Sa, Khue My Ward, Ngu Hanh Son District</p>
            <p className="text-[#A1A1AA] text-xs">Da Nang, Vietnam · 7km from DAD Airport</p>
          </div>
        </div>
      </DogEarCard>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { value: '50+', label: 'Speakers' },
          { value: '350+', label: 'Builders' },
          { value: '40+', label: 'Partners' },
          { value: '10+', label: 'Side Events' },
        ].map(({ value, label }) => (
          <DogEarCard key={label} className="p-3 text-center">
            <p className="font-[family-name:var(--font-anton)] text-[#FFB800] text-xl">{value}</p>
            <p className="text-[#A1A1AA] text-[10px] mt-0.5">{label}</p>
          </DogEarCard>
        ))}
      </div>

      {/* Quick links */}
      <SectionHeader size="sm">Explore</SectionHeader>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { href: '/agenda', icon: '📅', label: 'Full Agenda', desc: 'Schedule & sessions' },
          { href: '/speakers', icon: '🎤', label: 'Speakers', desc: '50+ thought leaders' },
          { href: '/debates', icon: '⚡', label: 'Debates', desc: 'Vote Bull or Bear' },
          { href: '/partners', icon: '🤝', label: 'Partners', desc: 'Co-hosts & sponsors' },
        ].map(({ href, icon, label, desc }) => (
          <Link key={href} href={href}>
            <DogEarCard className="p-4 h-full hover:-translate-y-1 transition-transform duration-200">
              <span className="text-2xl">{icon}</span>
              <p className="text-white font-semibold text-sm mt-2">{label}</p>
              <p className="text-[#A1A1AA] text-xs mt-0.5">{desc}</p>
            </DogEarCard>
          </Link>
        ))}
      </div>

      {/* Tickets */}
      <SectionHeader size="sm">Get Your Ticket</SectionHeader>
      <div className="space-y-2 mb-4">
        {[
          { name: '$SQR Chad Admission', price: 'Free', note: 'Token holders only', highlight: true },
          { name: 'General Admission', price: '$35', note: 'Sessions, lunch, networking' },
          { name: 'Full Admission', price: '$50', note: "All above + Builders' Dinner" },
        ].map(({ name, price, note, highlight }) => (
          <DogEarCard key={name} className={`p-4 ${highlight ? 'border border-[#FFB800]/30' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold text-sm ${highlight ? 'text-[#FFB800]' : 'text-white'}`}>{name}</p>
                <p className="text-[#A1A1AA] text-xs mt-0.5">{note}</p>
              </div>
              <span className="font-[family-name:var(--font-anton)] text-[#FFB800] text-lg">{price}</span>
            </div>
          </DogEarCard>
        ))}
      </div>
      <GoldButton href="https://www.web3builderssummit.com/" fullWidth className="mb-6">
        Register Now ↗
      </GoldButton>

      {/* Socials */}
      <SectionHeader size="sm">Connect</SectionHeader>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Telegram', href: 'https://t.me/web3builderssummit', icon: '✈️' },
          { label: 'Twitter / X', href: 'https://x.com/sqrdao', icon: '𝕏' },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/sqrdao', icon: '💼' },
          { label: 'Email us', href: 'mailto:gm@sqrdao.com', icon: '✉️' },
        ].map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            <DogEarCard className="p-3 flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-lg">{icon}</span>
              <span className="text-[#A1A1AA] text-sm">{label}</span>
            </DogEarCard>
          </a>
        ))}
      </div>
    </PageWrapper>
  );
}
