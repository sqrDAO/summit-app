'use client';

import { useEffect, useRef, useState } from 'react';
import { useSessionReactions } from '@/hooks/useSessionReactions';
import { getReactionsForFormat } from '@/lib/reactions';
import type { ReactionFormat, ReactionKey } from '@/types';

interface ReactionBarProps {
  sessionId: string;
  format: ReactionFormat;
}

interface Floater {
  id: number;
  emoji: string;
  startX: number;
  drift: number;
}

let floaterIdCounter = 0;

export default function ReactionBar({ sessionId, format }: ReactionBarProps) {
  const reactions = getReactionsForFormat(format);
  const { recentEvents, sendReaction, clientId } = useSessionReactions(sessionId);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<ReactionKey, HTMLButtonElement>>(new Map());
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const seenEventIdsRef = useRef<Set<string>>(new Set());

  function spawnFloater(key: ReactionKey) {
    const def = reactions.find((r) => r.key === key);
    if (!def) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const btn = buttonRefs.current.get(key);
    const startX = btn
      ? btn.getBoundingClientRect().left + btn.getBoundingClientRect().width / 2 - containerRect.left
      : containerRect.width / 2;

    const drift = (Math.random() - 0.5) * 60;
    const id = ++floaterIdCounter;
    setFloaters((prev) => [...prev, { id, emoji: def.emoji, startX, drift }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 2600);
  }

  // Animate incoming peer events; skip our own (already animated optimistically)
  useEffect(() => {
    for (const ev of recentEvents) {
      if (seenEventIdsRef.current.has(ev.id)) continue;
      seenEventIdsRef.current.add(ev.id);
      if (clientId && ev.cid === clientId) continue;
      spawnFloater(ev.key);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentEvents, clientId]);

  function handleTap(key: ReactionKey) {
    spawnFloater(key);
    sendReaction(key);
  }

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center gap-2 py-2"
    >
      {reactions.map((r) => (
        <button
          key={r.key}
          ref={(el) => {
            if (el) buttonRefs.current.set(r.key, el);
            else buttonRefs.current.delete(r.key);
          }}
          onClick={() => handleTap(r.key)}
          aria-label={r.label}
          className="text-2xl p-2 rounded-full transition-transform duration-150
            hover:scale-125 hover:bg-white/10
            active:scale-95"
        >
          {r.emoji}
        </button>
      ))}

      {/* Floating reaction overlay — pointer-events-none so it doesn't block taps */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {floaters.map((f) => (
          <span
            key={f.id}
            className="absolute bottom-4 text-3xl will-change-transform"
            style={{
              left: 0,
              transform: `translate(${f.startX}px, 0)`,
              ['--rx-x' as string]: `${f.startX}px`,
              ['--rx-drift' as string]: `${f.drift}px`,
              animation: 'reaction-float 2.5s ease-out forwards',
            }}
          >
            {f.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
