'use client';

import { useEffect, useRef, useState } from 'react';
import QRPoster from '@/components/qa/QRPoster';
import { useSessionReactions } from '@/hooks/useSessionReactions';
import { getReactionsForFormat } from '@/lib/reactions';
import type { DebateSession, ReactionKey } from '@/types';

interface Burst {
  id: number;
  key: ReactionKey;
  emoji: string;
  x: number;
  drift: number;
}

let burstId = 0;

const REACTIONS = getReactionsForFormat('panel');

export default function DebateReactionDisplay({ debate }: { debate: DebateSession }) {
  const { counts, recentEvents } = useSessionReactions(debate.sessionId);
  const [qrUrl, setQrUrl] = useState('');
  const [bursts, setBursts] = useState<Burst[]>([]);
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQrUrl(`${window.location.origin}/debates`);
    }
  }, []);

  useEffect(() => {
    for (const ev of recentEvents) {
      if (seenRef.current.has(ev.id)) continue;
      seenRef.current.add(ev.id);
      const def = REACTIONS.find((r) => r.key === ev.key);
      if (!def) continue;
      const id = ++burstId;
      const x = 15 + Math.random() * 70;
      const drift = (Math.random() - 0.5) * 100;
      setBursts((prev) => [...prev, { id, key: ev.key, emoji: def.emoji, x, drift }]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 3500);
    }
  }, [recentEvents]);

  const total = REACTIONS.reduce((sum, r) => sum + (counts[r.key] ?? 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-start justify-between gap-8 px-10 pt-10 pb-6 border-b border-[#FFB800]/20 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-[#FFB800] text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Lightning Debates · Live Reactions
          </p>
          <h1 className="font-[family-name:var(--font-anton)] uppercase leading-tight text-3xl md:text-4xl xl:text-5xl line-clamp-2">
            {debate.question}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          {qrUrl && <QRPoster url={qrUrl} size={160} />}
          <p className="text-[#FFB800] font-bold text-sm tracking-wider uppercase">
            Scan to React
          </p>
        </div>
      </header>

      {/* Reaction cards */}
      <main className="flex-1 flex gap-4 px-10 py-8 min-h-0">
        {REACTIONS.map((r) => {
          const count = counts[r.key] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;

          return (
            <div
              key={r.key}
              className="relative flex-1 flex flex-col border border-white/10 rounded-sm"
            >
              {/* Burst floaters — overflow visible so they rise above the card */}
              <div className="pointer-events-none absolute inset-0 overflow-visible">
                {bursts.filter((b) => b.key === r.key).map((b) => (
                  <span
                    key={b.id}
                    className="absolute text-8xl"
                    style={{
                      bottom: '12%',
                      left: `${b.x}%`,
                      ['--rx-drift' as string]: `${b.drift}px`,
                      animation: 'reaction-burst 3.2s ease-out forwards',
                    }}
                  >
                    {b.emoji}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-6 px-4">
                <span className="text-8xl leading-none">{r.emoji}</span>
                <span className="text-[#A1A1AA] font-bold uppercase tracking-widest text-xl">
                  {r.label}
                </span>
                <span
                  key={count}
                  className="font-[family-name:var(--font-anton)] leading-none tabular-nums text-white"
                  style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', animation: count > 0 ? 'count-pop 0.4s ease-out' : undefined }}
                >
                  {count.toLocaleString()}
                </span>
              </div>

              {/* Proportion bar */}
              <div className="relative z-10 flex-shrink-0 w-full h-2 bg-white/10 rounded-b-sm overflow-hidden">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 px-10 py-4 border-t border-[#FFB800]/20 flex items-center justify-between text-sm text-[#A1A1AA]">
        <span>{total.toLocaleString()} reaction{total === 1 ? '' : 's'} total</span>
        <span className="font-[family-name:var(--font-anton)] uppercase tracking-widest text-[#FFB800]">
          Web3 Builders&apos; Summit · LFBUIDL 2026
        </span>
      </footer>
    </div>
  );
}
