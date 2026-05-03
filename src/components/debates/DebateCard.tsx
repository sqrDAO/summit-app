import DogEarCard from '@/components/ui/DogEarCard';
import Badge from '@/components/ui/Badge';
import ReactionBar from '@/components/reactions/ReactionBar';
import { DebateSession, Session } from '@/types';
import { formatTime } from '@/lib/utils';

interface DebateCardProps {
  debate: DebateSession;
  session: Session;
}

export default function DebateCard({ debate, session }: DebateCardProps) {
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

      {/* Live emoji reactions */}
      <ReactionBar sessionId={session.id} format="panel" />
    </DogEarCard>
  );
}
