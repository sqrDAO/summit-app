'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DebateStance } from '@/types';

// ── Bookmarks ─────────────────────────────────────────────────────────────────

interface BookmarkStore {
  bookmarkedIds: string[];
  addBookmark: (sessionId: string) => void;
  removeBookmark: (sessionId: string) => void;
  toggleBookmark: (sessionId: string) => void;
  isBookmarked: (sessionId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      addBookmark: (id) =>
        set((s) => ({ bookmarkedIds: [...s.bookmarkedIds, id] })),
      removeBookmark: (id) =>
        set((s) => ({ bookmarkedIds: s.bookmarkedIds.filter((x) => x !== id) })),
      toggleBookmark: (id) => {
        if (get().isBookmarked(id)) get().removeBookmark(id);
        else get().addBookmark(id);
      },
      isBookmarked: (id) => get().bookmarkedIds.includes(id),
    }),
    { name: 'summit_bookmarks', storage: createJSONStorage(() => localStorage) }
  )
);

// ── Votes ──────────────────────────────────────────────────────────────────────

interface VoteAggregates {
  bullCount: number;
  bearCount: number;
}

interface VoteStore {
  myVotes: Record<string, DebateStance>;
  aggregates: Record<string, VoteAggregates>;
  castVote: (debateId: string, stance: DebateStance) => void;
  getVote: (debateId: string) => DebateStance | null;
  getBullPercent: (debateId: string) => number;
  getTotalVotes: (debateId: string) => number;
}

const SEED_AGGREGATES: Record<string, VoteAggregates> = {
  'debate-1': { bullCount: 0, bearCount: 0 },
  'debate-2': { bullCount: 0, bearCount: 0 },
  'debate-3': { bullCount: 0, bearCount: 0 },
};

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      myVotes: {},
      aggregates: SEED_AGGREGATES,

      castVote: (debateId, stance) => {
        if (get().myVotes[debateId]) return; // immutable once cast
        set((state) => {
          const agg = state.aggregates[debateId] ?? { bullCount: 0, bearCount: 0 };
          return {
            myVotes: { ...state.myVotes, [debateId]: stance },
            aggregates: {
              ...state.aggregates,
              [debateId]: {
                bullCount: agg.bullCount + (stance === 'bull' ? 1 : 0),
                bearCount: agg.bearCount + (stance === 'bear' ? 1 : 0),
              },
            },
          };
        });
      },

      getVote: (debateId) => get().myVotes[debateId] ?? null,

      getBullPercent: (debateId) => {
        const agg = get().aggregates[debateId];
        if (!agg) return 50;
        const total = agg.bullCount + agg.bearCount;
        if (total === 0) return 50;
        return Math.round((agg.bullCount / total) * 100);
      },

      getTotalVotes: (debateId) => {
        const agg = get().aggregates[debateId];
        if (!agg) return 0;
        return agg.bullCount + agg.bearCount;
      },
    }),
    { name: 'summit_vote_state', storage: createJSONStorage(() => localStorage) }
  )
);
