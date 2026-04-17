'use client';

import { useRouter } from 'next/navigation';

interface TopBarProps {
  title: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
}

export default function TopBar({ title, backHref, rightSlot }: TopBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6 pt-[env(safe-area-inset-top,0px)]">
      {backHref && (
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="font-[family-name:var(--font-anton)] text-white text-xl uppercase tracking-wide flex-1 truncate">
        {title}
      </h1>
      {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
    </div>
  );
}
