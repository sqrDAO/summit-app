'use client';

import clsx from 'clsx';
import { useBookmarkStore } from '@/lib/store';
import { useHydrated } from '@/hooks/useHydrated';
import { useAuth } from '@/context/AuthContext';
import { useLoginModal } from '@/context/LoginModalContext';

interface BookmarkButtonProps {
  sessionId: string;
  iconOnly?: boolean;
  className?: string;
}

export default function BookmarkButton({ sessionId, iconOnly, className }: BookmarkButtonProps) {
  const hydrated = useHydrated();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();

  const saved = hydrated && isBookmarked(sessionId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openLoginModal({ type: 'bookmark', sessionId });
      return;
    }
    toggleBookmark(sessionId);
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark session'}
        className={clsx(
          'p-1.5 rounded transition-colors duration-200',
          saved ? 'text-[#FFB800]' : 'text-[#A1A1AA] hover:text-white',
          className
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full flex items-center justify-center gap-2 py-3.5 font-semibold text-sm transition-all duration-300',
        '[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]',
        saved
          ? 'bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800]'
          : 'bg-[#0D0D10] border border-white/10 text-[#A1A1AA] hover:border-[#FFB800]/30 hover:text-[#FFB800]',
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {saved ? 'Saved to Bookmarks' : 'Save Session'}
    </button>
  );
}
