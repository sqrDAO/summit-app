'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import SessionCard from '@/components/agenda/SessionCard';
import { sessions } from '@/data/sessions';
import { useBookmarkStore } from '@/lib/store';
import { useHydrated } from '@/hooks/useHydrated';

export default function BookmarksPage() {
  const hydrated = useHydrated();
  const { bookmarkedIds } = useBookmarkStore();

  const bookmarked = hydrated
    ? sessions.filter((s) => bookmarkedIds.includes(s.id))
    : [];

  const morning = bookmarked.filter((s) => s.phase === 'morning');
  const afternoon = bookmarked.filter((s) => s.phase === 'afternoon');
  const evening = bookmarked.filter((s) => s.phase === 'evening');

  if (!hydrated) {
    return (
      <PageWrapper>
        <TopBar title="Saved Sessions" />
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#FFB800] border-t-transparent rounded-full animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  if (bookmarked.length === 0) {
    return (
      <PageWrapper>
        <TopBar title="Saved Sessions" />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="text-[#A1A1AA] mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-white font-semibold mb-2">No saved sessions yet</p>
          <p className="text-[#A1A1AA] text-sm">
            Tap the bookmark icon on any session to save it here
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TopBar title="Saved Sessions" />
      <p className="text-[#A1A1AA] text-sm mb-5">{bookmarked.length} session{bookmarked.length !== 1 ? 's' : ''} saved</p>

      {morning.length > 0 && (
        <div className="mb-5">
          <SectionHeader size="sm" accent={false}>
            <span className="text-[#A1A1AA] font-normal text-sm uppercase tracking-wider">Morning</span>
          </SectionHeader>
          <div className="space-y-3">
            {morning.map((s) => <SessionCard key={s.id} session={s} />)}
          </div>
        </div>
      )}

      {afternoon.length > 0 && (
        <div className="mb-5">
          <SectionHeader size="sm" accent={false}>
            <span className="text-[#A1A1AA] font-normal text-sm uppercase tracking-wider">Afternoon</span>
          </SectionHeader>
          <div className="space-y-3">
            {afternoon.map((s) => <SessionCard key={s.id} session={s} />)}
          </div>
        </div>
      )}

      {evening.length > 0 && (
        <div className="mb-5">
          <SectionHeader size="sm" accent={false}>
            <span className="text-[#A1A1AA] font-normal text-sm uppercase tracking-wider">Evening</span>
          </SectionHeader>
          <div className="space-y-3">
            {evening.map((s) => <SessionCard key={s.id} session={s} />)}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
