'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import DogEarCard from '@/components/ui/DogEarCard';
import { getPartnersByTier } from '@/data/partners';
import { Partner } from '@/types';

function PartnerLogo({ partner, large }: { partner: Partner; large?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={partner.websiteUrl !== '#' ? partner.websiteUrl : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <DogEarCard
        className={`flex items-center justify-center hover:-translate-y-1 transition-transform duration-200 ${large ? 'p-6 min-h-[100px]' : 'p-4 min-h-[72px]'}`}
      >
        {!imgError ? (
          <div className={`relative flex items-center justify-center ${large ? 'h-14 w-full' : 'h-10 w-full'}`}>
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <p className="text-white font-semibold text-sm text-center">{partner.name}</p>
        )}
      </DogEarCard>
    </a>
  );
}

const tiers: { key: Partner['tier']; label: string; desc: string; cols: string; large?: boolean }[] = [
  { key: 'cohost', label: 'Co-hosts', desc: 'Event organizers', cols: 'grid-cols-2', large: true },
  { key: 'strategic', label: 'Strategic Partners', desc: 'Headline sponsors', cols: 'grid-cols-2', large: true },
  { key: 'premium', label: 'Premium Partners', desc: 'Premier sponsors', cols: 'grid-cols-2', large: true },
  { key: 'ecosystem', label: 'Ecosystem Partners', desc: 'Blockchain networks & protocols', cols: 'grid-cols-2' },
  { key: 'community', label: 'Community Partners', desc: 'Ecosystem supporters', cols: 'grid-cols-3' },
];

export default function PartnersPage() {
  return (
    <PageWrapper>

      {tiers.map(({ key, label, desc, cols, large }) => {
        const tierPartners = getPartnersByTier(key);
        if (tierPartners.length === 0) return null;

        return (
          <div key={key} className="mb-7">
            <SectionHeader size="sm">{label}</SectionHeader>
            <p className="text-[#A1A1AA] text-xs mb-3 -mt-3">{desc}</p>
            <div className={`grid ${cols} gap-3`}>
              {tierPartners.map((partner) => (
                <PartnerLogo key={partner.id} partner={partner} large={large} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <p className="text-[#A1A1AA] text-xs mb-1">Interested in partnering?</p>
        <a
          href="https://docsend.com/view/yv7xnvwfq2cyzdf2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 px-5 py-2.5 bg-[#FFB800] text-black text-xs font-bold rounded hover:bg-[#FFB800]/90 transition-colors"
        >
          Become a Partner
        </a>
      </div>
    </PageWrapper>
  );
}
