'use client';

import { useEffect, useRef, useState } from 'react';
import { useSessionReactions } from '@/hooks/useSessionReactions';
import { useAuth } from '@/context/AuthContext';
import { useLoginModal } from '@/context/LoginModalContext';
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
  const { counts, recentEvents, sendReaction, loading } = useSessionReactions(sessionId);
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<ReactionKey, HTMLButtonElement>>(new Map());
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const seenEventIdsRef = useRef<Set<string>>(new Set());
  const pendingKeyRef = useRef<ReactionKey | null>(null);

  function spawnFloater(key: ReactionKey, fromButton: boolean) {
    const def = reactions.find((r) => r.key === key);
    if (!def) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    let startX: number;
    if (fromButton) {
      const btn = buttonRefs.current.get(key);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        startX = rect.left + rect.width / 2 - containerRect.left;
      } else {
        startX = containerRect.width / 2;
      }
    } else {
      // Remote event — anchor near matching button so peers see it rise from the same place
      const btn = buttonRefs.current.get(key);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        startX = rect.left + rect.width / 2 - containerRect.left;
      } else {
        startX = containerRect.width * (0.2 + Math.random() * 0.6);
      }
    }

    const drift = (Math.random() - 0.5) * 60;
    const id = ++floaterIdCounter;
    setFloaters((prev) => [...prev, { id, emoji: def.emoji, startX, drift }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 2600);
  }

  // Animate incoming peer events (skip our own — already animated optimistically)
  useEffect(() => {
    for (const ev of recentEvents) {
      if (seenEventIdsRef.current.has(ev.id)) continue;
      seenEventIdsRef.current.add(ev.id);
      if (user && ev.uid === user.uid) continue;
      spawnFloater(ev.key, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentEvents, user]);

  function handleTap(key: ReactionKey) {
    if (!user) {
      pendingKeyRef.current = key;
      openLoginModal({ type: 'reaction', sessionId, key });
      return;
    }
    spawnFloater(key, true);
    sendReaction(key);
  }

  // Replay pending reaction once user signs in
  useEffect(() => {
    if (user && pendingKeyRef.current) {
      const key = pendingKeyRef.current;
      pendingKeyRef.current = null;
      spawnFloater(key, true);
      sendReaction(key);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#FFB800]/5 border border-[#FFB800]/20 rounded p-4 mb-6 overflow-visible"
    >
      <p className="text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">
        Live Reactions
      </p>
      <p className="text-white/70 text-xs leading-relaxed mb-3">
        Tap an emoji to react in real time. Reactions appear on the venue LED screen.
      </p>

      <div className="grid grid-cols-3 gap-2">
        {reactions.map((r) => {
          const count = counts[r.key] ?? 0;
          return (
            <button
              key={r.key}
              ref={(el) => {
                if (el) buttonRefs.current.set(r.key, el);
                else buttonRefs.current.delete(r.key);
              }}
              onClick={() => handleTap(r.key)}
              disabled={loading}
              className="group flex flex-col items-center gap-1 py-3 px-2 rounded
                bg-white/5 border border-white/10
                hover:bg-[#FFB800]/10 hover:border-[#FFB800]/30
                active:scale-95 transition-all duration-150
                disabled:opacity-50"
            >
              <span className="text-2xl leading-none transition-transform group-hover:scale-110">
                {r.emoji}
              </span>
              <span className="text-white/70 text-[10px] font-medium uppercase tracking-wide">
                {r.label}
              </span>
              <span className="text-[#FFB800] text-xs font-bold tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating reaction overlay — pointer-events-none so it doesn't block taps */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {floaters.map((f) => (
          <span
            key={f.id}
            className="absolute bottom-16 text-3xl will-change-transform"
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
