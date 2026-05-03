'use client';

import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import DogEarCard from '@/components/ui/DogEarCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import { useCountdown } from '@/hooks/useCountdown';
import UserChip from '@/components/auth/UserChip';
import VenueMap from '@/components/venue/VenueMap';

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
      <UserChip />

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
          The premier Web3 event in Southeast Asia, bringing together Blockchain x AI founders, developers, policymakers and investors to join conversations around shaping the future of decentralized intelligence.
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
      <VenueMap />

      {/* Schedule */}
      <SectionHeader size="sm">Full Schedule</SectionHeader>
      <div className="space-y-2 mb-6">
        {[
          {
            date: 'May 24',
            day: 'Sun',
            title: 'VIP Dinner',
            desc: 'Exclusive welcome dinner for speakers & VIP guests',
            highlight: false,
          },
          {
            date: 'May 25',
            day: 'Mon',
            title: "Web3 Builders' Summit",
            desc: 'Main stage talks, panels, debates + DAVAS Golf',
            highlight: true,
          },
          {
            date: 'May 26',
            day: 'Tue',
            title: 'DAVAS 2026 Opening Session',
            desc: 'MOU signing, presentations, panels & startup pitching',
            highlight: false,
          },
          {
            date: 'May 27',
            day: 'Wed',
            title: 'DAVAS Pitching Day & Gala',
            desc: 'Startup pitching, MOU signings & closing gala dinner',
            highlight: false,
          },
        ].map(({ date, day, title, desc, highlight }) => (
          <DogEarCard key={date} className="p-4 flex items-start gap-4" gold={highlight}>
            <div className="flex-shrink-0 text-center w-12">
              <p className={`font-[family-name:var(--font-anton)] text-lg leading-none ${highlight ? 'text-[#FFB800]' : 'text-white'}`}>{date.split(' ')[1]}</p>
              <p className="text-[#A1A1AA] text-[10px] uppercase tracking-widest">{date.split(' ')[0]}</p>
              <p className="text-[#A1A1AA] text-[10px]">{day}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm ${highlight ? 'text-[#FFB800]' : 'text-white'}`}>{title}</p>
              <p className="text-[#A1A1AA] text-xs mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </DogEarCard>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-1">
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
      <p className="text-[#A1A1AA] text-[10px] text-center mb-6 uppercase tracking-widest">Based on previous events</p>

      {/* Quick links */}
      <SectionHeader size="sm">Explore</SectionHeader>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { href: '/agenda', icon: '📅', label: 'Full Agenda', desc: 'Schedule & sessions' },
          { href: '/debates', icon: '⚡', label: 'Debates', desc: 'React Bull or Bear' },
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

      {/* Socials */}
      <SectionHeader size="sm">Connect</SectionHeader>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          {
            label: 'Telegram',
            href: 'https://t.me/web3builderssummit',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.41 13.925l-2.94-.918c-.64-.203-.654-.64.135-.954l11.566-4.461c.537-.194 1.006.131.723.629z"/>
              </svg>
            ),
          },
          {
            label: 'Twitter / X',
            href: 'https://x.com/sqrdao',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ),
          },
          {
            label: 'LinkedIn',
            href: 'https://linkedin.com/company/sqrdao',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            ),
          },
          {
            label: 'Email us',
            href: 'mailto:gm@sqrdao.com',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            <DogEarCard className="p-3 flex items-center gap-2 hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-[#A1A1AA]">{icon}</span>
              <span className="text-[#A1A1AA] text-sm">{label}</span>
            </DogEarCard>
          </a>
        ))}
      </div>
    </PageWrapper>
  );
}
