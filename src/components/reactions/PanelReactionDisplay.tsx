'use client';

import { useEffect, useRef, useState } from 'react';
import QRPoster from '@/components/qa/QRPoster';
import { useSessionReactions } from '@/hooks/useSessionReactions';
import { getReactionsForFormat } from '@/lib/reactions';
import type { ReactionFormat, ReactionKey, Session } from '@/types';

interface Burst {
  id: number;
  key: ReactionKey;
  emoji: string;
  x: number;
  drift: number;
}

let burstId = 0;

export default function PanelReactionDisplay({
  session,
  format,
}: {
  session: Session;
  format: ReactionFormat;
}) {
  const REACTIONS = getReactionsForFormat(format);
  const { counts, recentEvents } = useSessionReactions(session.id);
  const [qrUrl, setQrUrl] = useState('');
  const [bursts, setBursts] = useState<Burst[]>([]);
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQrUrl(`${window.location.origin}/sessions/${session.id}`);
    }
  }, [session.id]);

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
  }, [recentEvents, REACTIONS]);

  const total = REACTIONS.reduce((sum, r) => sum + (counts[r.key] ?? 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      <header className="flex items-center justify-between gap-6 px-8 py-3 border-b border-[#FFB800]/20 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-[#FFB800] text-xs font-bold uppercase tracking-[0.3em] mb-1">
            Live Reactions
          </p>
          <h1 className="font-[family-name:var(--font-anton)] uppercase leading-tight text-lg md:text-2xl xl:text-4xl line-clamp-2">
            {session.title}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          {qrUrl && <QRPoster url={qrUrl} size={100} />}
          <p className="text-[#FFB800] font-bold text-xs tracking-wider uppercase">
            Scan to React
          </p>
        </div>
      </header>

      <main className="flex-1 flex gap-3 px-6 py-4 min-h-0">
        {REACTIONS.map((r) => {
          const count = counts[r.key] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;

          return (
            <div
              key={r.key}
              className="relative flex-1 flex flex-col border border-white/10 rounded-sm overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0">
                {bursts.filter((b) => b.key === r.key).map((b) => (
                  <span
                    key={b.id}
                    className="absolute"
                    style={{
                      bottom: '12%',
                      left: `${b.x}%`,
                      fontSize: 'clamp(1.5rem, 4vh, 3.5rem)',
                      ['--rx-drift' as string]: `${b.drift}px`,
                      animation: 'reaction-burst 3.2s ease-out forwards',
                    }}
                  >
                    {b.emoji}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-[2vh] px-4">
                <span style={{ fontSize: 'clamp(2rem, 7vh, 5rem)', lineHeight: 1 }}>
                  {r.emoji}
                </span>
                <span
                  className="font-bold uppercase tracking-widest text-[#A1A1AA]"
                  style={{ fontSize: 'clamp(0.6rem, 1.8vh, 1.1rem)' }}
                >
                  {r.label}
                </span>
                <span
                  key={count}
                  className="font-[family-name:var(--font-anton)] leading-none tabular-nums text-white"
                  style={{
                    fontSize: 'clamp(2rem, 11vh, 9rem)',
                    animation: count > 0 ? 'count-pop 0.4s ease-out' : undefined,
                  }}
                >
                  {count.toLocaleString()}
                </span>
              </div>

              <div className="relative z-10 flex-shrink-0 w-full h-1.5 bg-white/10 rounded-b-sm overflow-hidden">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </main>

      <footer className="flex-shrink-0 px-8 py-2 border-t border-[#FFB800]/20 flex items-center justify-between text-xs text-[#A1A1AA]">
        <span>{total.toLocaleString()} reaction{total === 1 ? '' : 's'} total</span>
        <span className="font-[family-name:var(--font-anton)] uppercase tracking-widest text-[#FFB800]">
          Web3 Builders&apos; Summit · LFBUIDL 2026
        </span>
      </footer>
    </div>
  );
}
