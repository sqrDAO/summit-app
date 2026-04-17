'use client';

import DogEarCard from '@/components/ui/DogEarCard';
import Badge from '@/components/ui/Badge';
import VoteBar from './VoteBar';
import { DebateSession, Session } from '@/types';
import { formatTime } from '@/lib/utils';
import { useVoteStore } from '@/lib/store';
import { useHydrated } from '@/hooks/useHydrated';
import clsx from 'clsx';

interface DebateCardProps {
  debate: DebateSession;
  session: Session;
}

export default function DebateCard({ debate, session }: DebateCardProps) {
  const hydrated = useHydrated();
  const { getVote, castVote, getBullPercent, getTotalVotes } = useVoteStore();

  const myVote = hydrated ? getVote(debate.id) : null;
  const bullPercent = hydrated ? getBullPercent(debate.id) : 50;
  const totalVotes = hydrated ? getTotalVotes(debate.id) : 0;
  const hasVoted = myVote !== null;

  return (
    <DogEarCard className="p-5 mb-4">
      {/* Time + phase */}
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="gold">{formatTime(session.startTime)} – {formatTime(session.endTime)}</Badge>
        <Badge variant="red">Debate</Badge>
      </div>

      {/* Question */}
      <h3 className="font-[family-name:var(--font-anton)] text-white text-lg leading-snug uppercase mb-3">
        {debate.question}
      </h3>

      {/* Context */}
      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">{debate.context}</p>

      {/* Bull / Bear summaries */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3">
          <p className="text-emerald-400 text-xs font-bold mb-1">🐂 BULL</p>
          <p className="text-white/80 text-xs leading-relaxed">{debate.bullSummary}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="text-red-400 text-xs font-bold mb-1">🐻 BEAR</p>
          <p className="text-white/80 text-xs leading-relaxed">{debate.bearSummary}</p>
        </div>
      </div>

      {/* Vote buttons */}
      {!hasVoted ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => castVote(debate.id, 'bull')}
            className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded
              bg-emerald-500/15 border border-emerald-500/30 text-emerald-400
              hover:bg-emerald-500/25 transition-all duration-200 active:scale-95"
          >
            🐂 I&apos;m Bullish
          </button>
          <button
            onClick={() => castVote(debate.id, 'bear')}
            className="flex items-center justify-center gap-2 py-3 text-sm font-bold rounded
              bg-red-500/15 border border-red-500/30 text-red-400
              hover:bg-red-500/25 transition-all duration-200 active:scale-95"
          >
            🐻 I&apos;m Bearish
          </button>
        </div>
      ) : (
        <div>
          <div className={clsx(
            'text-center py-2 rounded text-sm font-bold mb-2',
            myVote === 'bull' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
          )}>
            You voted {myVote === 'bull' ? '🐂 Bullish' : '🐻 Bearish'}
          </div>
          {totalVotes > 0 && <VoteBar bullPercent={bullPercent} totalVotes={totalVotes} />}
        </div>
      )}
    </DogEarCard>
  );
}
