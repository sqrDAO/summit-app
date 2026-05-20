'use client';

import { useCallback, useEffect, useState } from 'react';
import type { DebateSession, Session } from '@/types';
import { getReactionFormat } from '@/lib/reactions';
import PanelReactionDisplay from '@/components/reactions/PanelReactionDisplay';
import PanelQADisplay from '@/components/qa/PanelQADisplay';
import DebateReactionDisplay from '@/components/debates/DebateReactionDisplay';
import VoteResultsDisplay from '@/components/debates/VoteResultsDisplay';

type DisplayMode = 'session-reactions' | 'session-qa' | 'debate-reactions' | 'debate-votes';

interface Props {
  reactionSessions: Session[];
  qaSessions: Session[];
  debates: DebateSession[];
}

const MODE_LABELS: Record<DisplayMode, string> = {
  'session-reactions': 'Panel Reactions',
  'session-qa': 'Q&A Feed',
  'debate-reactions': 'Debate Reactions',
  'debate-votes': 'Vote Results',
};

export default function LedController({ reactionSessions, qaSessions, debates }: Props) {
  // Pending (what operator is configuring)
  const [mode, setMode] = useState<DisplayMode>('debate-votes');
  const [sessionId, setSessionId] = useState(reactionSessions[0]?.id ?? '');
  const [debateId, setDebateId] = useState(debates[0]?.id ?? '');
  const [aspect, setAspect] = useState<'main' | 'side'>('side');

  // Active (what's live on the LED)
  const [activeMode, setActiveMode] = useState<DisplayMode>('debate-votes');
  const [activeSessionId, setActiveSessionId] = useState(reactionSessions[0]?.id ?? '');
  const [activeDebateId, setActiveDebateId] = useState(debates[0]?.id ?? '');
  const [activeAspect, setActiveAspect] = useState<'main' | 'side'>('side');
  // Unique key to force remount of the active view when going live
  const [viewKey, setViewKey] = useState(0);

  // Fade overlay controls the black transition between views
  const [fadeOverlay, setFadeOverlay] = useState(0);

  const [controlsOpen, setControlsOpen] = useState(true);

  // Reset selector when switching modes to ensure valid selection
  useEffect(() => {
    if (mode === 'session-qa') {
      if (!qaSessions.find((s) => s.id === sessionId) && qaSessions.length > 0) {
        setSessionId(qaSessions[0].id);
      }
    } else if (mode === 'session-reactions') {
      if (!reactionSessions.find((s) => s.id === sessionId) && reactionSessions.length > 0) {
        setSessionId(reactionSessions[0].id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Toggle controls with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setControlsOpen((v) => !v);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goLive = useCallback(() => {
    setFadeOverlay(1);
    setTimeout(() => {
      setActiveMode(mode);
      setActiveSessionId(sessionId);
      setActiveDebateId(debateId);
      setActiveAspect(aspect);
      setViewKey((k) => k + 1);
      setFadeOverlay(0);
    }, 300);
    setControlsOpen(false);
  }, [mode, sessionId, debateId, aspect]);

  // Selector options + value driven by pending mode
  // Disambiguate sessions that share the same title by appending the start time
  function sessionOptions(list: Session[]) {
    const titleCount = list.reduce<Record<string, number>>((acc, s) => {
      acc[s.title] = (acc[s.title] ?? 0) + 1;
      return acc;
    }, {});
    return list.map((s) => ({
      id: s.id,
      label: titleCount[s.title] > 1 ? `${s.title} (${s.startTime})` : s.title,
    }));
  }

  const selectorOptions =
    mode === 'session-reactions'
      ? sessionOptions(reactionSessions)
      : mode === 'session-qa'
        ? sessionOptions(qaSessions)
        : debates.map((d) => ({ id: d.id, label: d.question }));

  const selectorValue =
    mode === 'session-reactions' || mode === 'session-qa' ? sessionId : debateId;

  function handleSelectorChange(id: string) {
    if (mode === 'session-reactions' || mode === 'session-qa') {
      setSessionId(id);
    } else {
      setDebateId(id);
    }
  }

  // Status line shown at bottom of control panel
  const statusSession = [...reactionSessions, ...qaSessions].find(
    (s) => s.id === activeSessionId,
  );
  const statusDebate = debates.find((d) => d.id === activeDebateId);
  const statusLabel =
    activeMode === 'session-reactions' || activeMode === 'session-qa'
      ? statusSession?.title ?? ''
      : statusDebate?.question ?? '';

  function renderActiveView() {
    switch (activeMode) {
      case 'session-reactions': {
        const s = reactionSessions.find((s) => s.id === activeSessionId) ?? reactionSessions[0];
        if (!s) return null;
        const fmt = getReactionFormat(s.type)!;
        return <PanelReactionDisplay key={viewKey} session={s} format={fmt} />;
      }
      case 'session-qa': {
        const s = qaSessions.find((s) => s.id === activeSessionId) ?? qaSessions[0];
        if (!s) return null;
        return <PanelQADisplay key={viewKey} session={s} />;
      }
      case 'debate-reactions': {
        const d = debates.find((d) => d.id === activeDebateId) ?? debates[0];
        if (!d) return null;
        return <DebateReactionDisplay key={viewKey} debate={d} />;
      }
      case 'debate-votes': {
        const d = debates.find((d) => d.id === activeDebateId) ?? debates[0];
        if (!d) return null;
        return <VoteResultsDisplay key={viewKey} debate={d} aspect={activeAspect} />;
      }
    }
  }

  return (
    <>
      {renderActiveView()}

      {/* Black cross-fade overlay */}
      <div
        className="fixed inset-0 pointer-events-none bg-black z-[55]"
        style={{ opacity: fadeOverlay, transition: 'opacity 0.3s ease-in-out' }}
      />

      {/* Toggle button — always visible, bottom-right */}
      <button
        className="fixed bottom-4 right-4 z-[65] bg-black/70 border border-white/20 text-white/60 hover:text-white text-[11px] font-mono px-3 py-1.5 rounded-sm backdrop-blur-sm hover:bg-black/90 transition-all select-none"
        onClick={() => setControlsOpen((v) => !v)}
      >
        {controlsOpen ? '✕ hide' : '⚙ controls'}
      </button>

      {/* Control panel — slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-black/95 border-t border-white/10 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          controlsOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-5 pt-4 pb-3 flex flex-wrap items-center gap-3">
          {/* Mode tabs */}
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(MODE_LABELS) as DisplayMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  mode === m
                    ? 'bg-[#FFB800] text-black'
                    : 'text-white/50 hover:text-white border border-white/20 hover:border-white/40'
                }`}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>

          {/* Session / debate selector */}
          <select
            value={selectorValue}
            onChange={(e) => handleSelectorChange(e.target.value)}
            className="flex-1 min-w-0 max-w-sm bg-white/5 border border-white/20 text-white text-[11px] rounded-sm px-2 py-1.5 focus:outline-none focus:border-[#FFB800] truncate"
          >
            {selectorOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-black text-white">
                {opt.label}
              </option>
            ))}
          </select>

          {/* Aspect ratio — only relevant for vote-results */}
          {mode === 'debate-votes' && (
            <div className="flex gap-1">
              {(['side', 'main'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAspect(a)}
                  className={`px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    aspect === a
                      ? 'bg-[#FFB800] text-black'
                      : 'text-white/50 hover:text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {a === 'main' ? 'Main 10∶3' : 'Side Wings 9∶5'}
                </button>
              ))}
            </div>
          )}

          {/* Go Live */}
          <button
            onClick={goLive}
            className="px-5 py-1.5 bg-[#FFB800] text-black text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-300 active:scale-95 transition-all"
          >
            Go Live ▶
          </button>
        </div>

        {/* Status line */}
        <div className="px-5 pb-3 flex items-center gap-3 text-[10px] font-mono text-white/30">
          <span>ESC to toggle</span>
          <span className="text-white/10">·</span>
          <span className="text-[#FFB800]/60">LIVE: {MODE_LABELS[activeMode]}</span>
          {statusLabel && (
            <>
              <span className="text-white/10">·</span>
              <span className="truncate max-w-xs">{statusLabel}</span>
            </>
          )}
          {activeMode === 'debate-votes' && (
            <>
              <span className="text-white/10">·</span>
              <span>{activeAspect === 'main' ? '10∶3 Main' : '9∶5 Side Wings'}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
