'use client';

import { useEffect, useRef } from 'react';
import DogEarCard from '@/components/ui/DogEarCard';
import Badge from '@/components/ui/Badge';
import VoteBar from './VoteBar';
import { DebateSession, Session, DebateStance } from '@/types';
import { formatTime } from '@/lib/utils';
import { useDebateVote } from '@/hooks/useDebateVote';
import { useAuth } from '@/context/AuthContext';
import { useLoginModal } from '@/context/LoginModalContext';
import clsx from 'clsx';

interface DebateCardProps {
  debate: DebateSession;
  session: Session;
}

export default function DebateCard({ debate, session }: DebateCardProps) {
  const { myVote, bullPercent, totalVotes, loading, castVote } = useDebateVote(debate.id);
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();
  const pendingStanceRef = useRef<DebateStance | null>(null);

  const hasVoted = myVote !== null;
  const votingOpen = false;

  async function handleVote(stance: DebateStance) {
    if (!user) {
      pendingStanceRef.current = stance;
      openLoginModal({ type: 'vote', debateId: debate.id, stance });
      return;
    }
    await castVote(stance);
  }

  // Replay a vote that was initiated before the user logged in
  useEffect(() => {
    if (user && pendingStanceRef.current && !hasVoted && !loading) {
      const stance = pendingStanceRef.current;
      pendingStanceRef.current = null;
      castVote(stance);
    }
  }, [user, hasVoted, loading, castVote]);

  return (
    <DogEarCard className="p-5 mb-4">
      {/* Time + phase */}
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="gold">{formatTime(session.startTime)} – {formatTime(session.endTime)}</Badge>
        <Badge variant="red">Debate</Badge>
      </div>

      {/* Question */}
      <h3 className="font-[family-name:var(--font-anton)] text-white text-lg leading-snug uppercase mb-4">
        {debate.question}
      </h3>

      {/* Debaters */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded px-3 py-2 text-center">
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">🐂 Bull</p>
          <p className="text-white text-xs font-semibold">TBA</p>
        </div>
        <span className="text-[#A1A1AA] text-sm font-bold flex-shrink-0">v.</span>
        <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded px-3 py-2 text-center">
          <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">🐻 Bear</p>
          <p className="text-white text-xs font-semibold">TBA</p>
        </div>
      </div>

      {/* Bull / Bear summaries */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3">
          <p className="text-emerald-400 text-xs font-bold mb-1">🐂 BULL</p>
          <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{debate.bullSummary}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="text-red-400 text-xs font-bold mb-1">🐻 BEAR</p>
          <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{debate.bearSummary}</p>
        </div>
      </div>

      {/* Vote section */}
      {!votingOpen ? (
        <div className="text-center py-3 rounded bg-white/5 border border-white/10 text-[#A1A1AA] text-sm">
          🔒 Voting opens May 25
        </div>
      ) : loading ? (
        <div className="h-12 rounded bg-white/5 animate-pulse" />
      ) : hasVoted ? (
        <div>
          <div className={clsx(
            'text-center py-2 rounded text-sm font-bold mb-2',
            myVote === 'bull' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
          )}>
            You voted {myVote === 'bull' ? '🐂 Bullish' : '🐻 Bearish'}
          </div>
          {totalVotes > 0 && <VoteBar bullPercent={bullPercent} totalVotes={totalVotes} />}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleVote('bull')}
              className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded
                bg-emerald-500/15 border border-emerald-500/30 text-emerald-400
                hover:bg-emerald-500/25 transition-all duration-200 active:scale-95"
            >
              🐂 I&apos;m Bullish
            </button>
            <button
              onClick={() => handleVote('bear')}
              className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded
                bg-red-500/15 border border-red-500/30 text-red-400
                hover:bg-red-500/25 transition-all duration-200 active:scale-95"
            >
              🐻 I&apos;m Bearish
            </button>
          </div>
          {totalVotes > 0 && <VoteBar bullPercent={bullPercent} totalVotes={totalVotes} />}
        </div>
      )}
    </DogEarCard>
  );
}
