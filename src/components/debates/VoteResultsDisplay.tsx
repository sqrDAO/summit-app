'use client';

import { useDebateVote } from '@/hooks/useDebateVote';
import type { DebateSession } from '@/types';

interface Props {
  debate: DebateSession;
  aspect: 'main' | 'side';
}

export default function VoteResultsDisplay({ debate, aspect }: Props) {
  const { bullPercent, totalVotes, loading } = useDebateVote(debate.id);
  const bearPercent = 100 - bullPercent;

  const isMain = aspect === 'main';

  // Letterbox: fit the target aspect ratio inside the full viewport
  const ratio = isMain ? '10 / 3' : '9 / 5';
  const widthExpr = isMain
    ? 'min(100vw, calc(100vh * 10 / 3))'
    : 'min(100vw, calc(100vh * 9 / 5))';
  const heightExpr = isMain
    ? 'min(100vh, calc(100vw * 3 / 10))'
    : 'min(100vh, calc(100vw * 5 / 9))';

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div
        style={{
          aspectRatio: ratio,
          width: widthExpr,
          height: heightExpr,
          overflow: 'hidden',
        }}
        className="relative flex bg-black text-white"
      >
        {isMain ? (
          <MainLayout debate={debate} bullPercent={bullPercent} bearPercent={bearPercent} totalVotes={totalVotes} loading={loading} />
        ) : (
          <SideLayout debate={debate} bullPercent={bullPercent} bearPercent={bearPercent} totalVotes={totalVotes} loading={loading} />
        )}
      </div>
    </div>
  );
}

interface LayoutProps {
  debate: DebateSession;
  bullPercent: number;
  bearPercent: number;
  totalVotes: number;
  loading: boolean;
}

// 10:3 — wide banner: left = question/context, right = vote percentages + bar
function MainLayout({ debate, bullPercent, bearPercent, totalVotes, loading }: LayoutProps) {
  return (
    <div className="w-full h-full flex gap-[3vw] px-[3vw] py-[2vh] items-center">
      {/* Left: question + summaries */}
      <div className="flex-1 flex flex-col justify-center gap-[1.2vh] min-w-0">
        <p
          className="text-[#FFB800] font-bold uppercase tracking-[0.3em]"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 1rem)' }}
        >
          Lightning Debate · Voting Results
        </p>
        <h1
          className="font-[family-name:var(--font-anton)] uppercase leading-tight"
          style={{ fontSize: 'clamp(0.9rem, 2.2vw, 2.2rem)' }}
        >
          {debate.question}
        </h1>
        <div
          className="flex gap-[2vw] mt-[0.5vh]"
          style={{ fontSize: 'clamp(0.45rem, 1vw, 0.85rem)' }}
        >
          <div className="flex-1 min-w-0">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-[0.3vh]">🐂 Bull</span>
            <p className="text-[#A1A1AA] line-clamp-3 leading-snug">{debate.bullSummary}</p>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-red-400 font-bold uppercase tracking-wider block mb-[0.3vh]">🐻 Bear</span>
            <p className="text-[#A1A1AA] line-clamp-3 leading-snug">{debate.bearSummary}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-white/10 flex-shrink-0" />

      {/* Right: big percentages + vote bar */}
      <div className="w-[36%] flex-shrink-0 flex flex-col justify-center gap-[1.5vh]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start gap-[0.3vh]">
            <span className="text-emerald-400 font-bold uppercase" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.85rem)' }}>🐂 Bull</span>
            <span
              key={`bull-${bullPercent}`}
              className="font-[family-name:var(--font-anton)] text-emerald-400 tabular-nums leading-none"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 5rem)',
                animation: loading ? undefined : 'count-pop 0.4s ease-out',
              }}
            >
              {loading ? '—' : `${bullPercent}%`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-[0.3vh]">
            <span className="text-red-400 font-bold uppercase" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.85rem)' }}>Bear 🐻</span>
            <span
              key={`bear-${bearPercent}`}
              className="font-[family-name:var(--font-anton)] text-red-400 tabular-nums leading-none"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 5rem)',
                animation: loading ? undefined : 'count-pop 0.4s ease-out',
              }}
            >
              {loading ? '—' : `${bearPercent}%`}
            </span>
          </div>
        </div>

        {/* Vote bar */}
        <div
          className="w-full rounded-full overflow-hidden bg-white/10 flex"
          style={{ height: 'clamp(6px, 1.2vh, 14px)' }}
        >
          <div
            className="h-full bg-emerald-500 transition-all duration-700 ease-out"
            style={{ width: loading ? '50%' : `${bullPercent}%` }}
          />
          <div
            className="h-full bg-red-500 transition-all duration-700 ease-out"
            style={{ width: loading ? '50%' : `${bearPercent}%` }}
          />
        </div>

        <p
          className="text-[#A1A1AA] text-center tabular-nums"
          style={{ fontSize: 'clamp(0.4rem, 0.9vw, 0.8rem)' }}
        >
          {loading ? '—' : `${totalVotes.toLocaleString()} vote${totalVotes !== 1 ? 's' : ''}`}
        </p>

        <p
          className="font-[family-name:var(--font-anton)] uppercase tracking-widest text-[#FFB800] text-center"
          style={{ fontSize: 'clamp(0.4rem, 0.8vw, 0.7rem)' }}
        >
          Web3 Builders&apos; Summit · LFBUIDL 2026
        </p>
      </div>
    </div>
  );
}

// 9:5 — single column: question → percentages → bar → total
function SideLayout({ debate, bullPercent, bearPercent, totalVotes, loading }: LayoutProps) {
  return (
    <div className="w-full h-full flex flex-col px-[4vw] py-[3vh] justify-between">
      {/* Header */}
      <div>
        <p
          className="text-[#FFB800] font-bold uppercase tracking-[0.3em] mb-[1vh]"
          style={{ fontSize: 'clamp(0.5rem, 1.4vw, 1rem)' }}
        >
          Lightning Debate · Voting Results
        </p>
        <h1
          className="font-[family-name:var(--font-anton)] uppercase leading-tight line-clamp-3"
          style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}
        >
          {debate.question}
        </h1>
      </div>

      {/* Big percentages */}
      <div className="flex justify-between items-center px-[2vw]">
        <div className="flex flex-col items-center gap-[0.5vh]">
          <span
            key={`bull-${bullPercent}`}
            className="font-[family-name:var(--font-anton)] text-emerald-400 tabular-nums leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 8rem)',
              animation: loading ? undefined : 'count-pop 0.4s ease-out',
            }}
          >
            {loading ? '—' : `${bullPercent}%`}
          </span>
          <span
            className="text-emerald-400 font-bold uppercase tracking-wider"
            style={{ fontSize: 'clamp(0.55rem, 1.5vw, 1.1rem)' }}
          >
            🐂 Bull
          </span>
        </div>

        <div
          className="w-px self-stretch bg-white/10"
        />

        <div className="flex flex-col items-center gap-[0.5vh]">
          <span
            key={`bear-${bearPercent}`}
            className="font-[family-name:var(--font-anton)] text-red-400 tabular-nums leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 8rem)',
              animation: loading ? undefined : 'count-pop 0.4s ease-out',
            }}
          >
            {loading ? '—' : `${bearPercent}%`}
          </span>
          <span
            className="text-red-400 font-bold uppercase tracking-wider"
            style={{ fontSize: 'clamp(0.55rem, 1.5vw, 1.1rem)' }}
          >
            Bear 🐻
          </span>
        </div>
      </div>

      {/* Vote bar + footer */}
      <div>
        <div
          className="w-full rounded-full overflow-hidden bg-white/10 flex mb-[1.5vh]"
          style={{ height: 'clamp(8px, 1.8vh, 20px)' }}
        >
          <div
            className="h-full bg-emerald-500 transition-all duration-700 ease-out"
            style={{ width: loading ? '50%' : `${bullPercent}%` }}
          />
          <div
            className="h-full bg-red-500 transition-all duration-700 ease-out"
            style={{ width: loading ? '50%' : `${bearPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <p
            className="text-[#A1A1AA] tabular-nums"
            style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.9rem)' }}
          >
            {loading ? '—' : `${totalVotes.toLocaleString()} vote${totalVotes !== 1 ? 's' : ''}`}
          </p>
          <p
            className="font-[family-name:var(--font-anton)] uppercase tracking-widest text-[#FFB800]"
            style={{ fontSize: 'clamp(0.4rem, 1vw, 0.8rem)' }}
          >
            LFBUIDL 2026
          </p>
        </div>
      </div>
    </div>
  );
}
