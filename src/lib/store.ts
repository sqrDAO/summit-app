'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
