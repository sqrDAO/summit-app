'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import DogEarCard from '@/components/ui/DogEarCard';
import { getPartnersByTier } from '@/data/partners';
import { Partner } from '@/types';

function PartnerLogo({ partner, cardClass, imgClass }: { partner: Partner; cardClass: string; imgClass: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={partner.websiteUrl !== '#' ? partner.websiteUrl : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <DogEarCard
        className={`flex items-center justify-center hover:-translate-y-1 transition-transform duration-200 ${cardClass}`}
      >
        {!imgError ? (
          <div className={`relative flex items-center justify-center ${imgClass}`}>
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              className="object-contain"
              style={partner.logoScale ? { transform: `scale(${partner.logoScale})` } : undefined}
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

const tiers: { key: Partner['tier']; label: string; desc: string; cols: string; cardClass: string; imgClass: string }[] = [
  { key: 'cohost',    label: 'Co-hosts',            desc: 'Event organizers',              cols: 'grid-cols-1', cardClass: 'p-8 min-h-[140px]', imgClass: 'h-20 w-full' },
  { key: 'strategic', label: 'Strategic Partners',  desc: 'Headline sponsors',             cols: 'grid-cols-2', cardClass: 'p-7 min-h-[120px]', imgClass: 'h-16 w-full' },
  { key: 'premium',   label: 'Premium Partners',    desc: 'Premier sponsors',              cols: 'grid-cols-2', cardClass: 'p-6 min-h-[100px]', imgClass: 'h-14 w-full' },
  { key: 'ecosystem', label: 'Ecosystem Partners',  desc: 'Blockchain networks & protocols', cols: 'grid-cols-2', cardClass: 'p-4 min-h-[80px]',  imgClass: 'h-12 w-full' },
  { key: 'community', label: 'Community Partners',  desc: 'Ecosystem supporters',          cols: 'grid-cols-3', cardClass: 'p-3 min-h-[64px]',  imgClass: 'h-9 w-full' },
];

export default function PartnersPage() {
  return (
    <PageWrapper>

      {tiers.map(({ key, label, desc, cols, cardClass, imgClass }) => {
        const tierPartners = getPartnersByTier(key);
        if (tierPartners.length === 0) return null;

        return (
          <div key={key} className="mb-7">
            <SectionHeader size="sm">{label}</SectionHeader>
            <p className="text-[#A1A1AA] text-xs mb-3 -mt-3">{desc}</p>
            <div className={`grid ${cols} gap-3`}>
              {tierPartners.map((partner) => (
                <PartnerLogo key={partner.id} partner={partner} cardClass={cardClass} imgClass={imgClass} />
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
