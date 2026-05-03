import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { sessions, getSessionById } from '@/data/sessions';
import { getSpeakerById } from '@/data/speakers';
import { getDebateById } from '@/data/debates';
import { formatTime, getDurationMins, getSessionTypeLabel } from '@/lib/utils';
import { getReactionFormat } from '@/lib/reactions';
import ReactionBar from '@/components/reactions/ReactionBar';

const typeBadgeVariant: Record<string, 'gold' | 'purple' | 'green' | 'red' | 'gray' | 'blue'> = {
  keynote: 'gold',
  panel: 'blue',
  debate: 'red',
  showcase: 'green',
  networking: 'gray',
  dinner: 'purple',
  talk: 'blue',
};

export function generateStaticParams() {
  return sessions.map((s) => ({ id: s.id }));
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = getSessionById(id);
  if (!session) notFound();

  const speakers = session.speakerIds.map((sid) => getSpeakerById(sid)).filter(Boolean);
  const debate = session.debateId ? getDebateById(session.debateId) : null;
  const duration = getDurationMins(session.startTime, session.endTime);
  const reactionFormat = getReactionFormat(session.type);

  return (
    <PageWrapper>
      <TopBar title="Session" backHref="/agenda" />

      {/* Type + time */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant={typeBadgeVariant[session.type] ?? 'gray'}>
          {getSessionTypeLabel(session.type)}
        </Badge>
        <Badge variant="gray">{formatTime(session.startTime)} – {formatTime(session.endTime)}</Badge>
        {duration > 0 && <Badge variant="gray">{duration} min</Badge>}
      </div>

      {/* Title */}
      <h1 className="font-[family-name:var(--font-anton)] text-white text-2xl leading-snug uppercase mb-4">
        {session.title}
      </h1>

      {/* Description */}
      {session.description && (
        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">{session.description}</p>
      )}

      {/* Tags */}
      {session.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {session.tags.map((tag) => (
            <Badge key={tag} variant="gray">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Panel Q&A entry */}
      {session.type === 'panel' && (
        <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded p-4 mb-6">
          <p className="text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">
            Audience Q&amp;A
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            Submit a question, query, or challenge for the speakers — anonymously. Top-upvoted questions appear on the LED screen.
          </p>
          <Link
            href={`/sessions/${session.id}/qa`}
            className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#FFB800] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffc929] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]"
          >
            Open Q&amp;A →
          </Link>
        </div>
      )}

      {/* Debate question */}
      {debate && (
        <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded p-4 mb-6">
          <p className="text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">Debate Question</p>
          <p className="text-white text-sm font-medium leading-relaxed">{debate.question}</p>
        </div>
      )}

      {/* Live emoji reactions */}
      {reactionFormat && (
        <ReactionBar sessionId={session.id} format={reactionFormat} />
      )}

      {/* Speakers */}
      {speakers.length > 0 && (
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-anton)] text-white text-lg uppercase mb-3">
            {speakers.length === 1 ? 'Speaker' : 'Speakers'}
          </h2>
          <div className="space-y-3">
            {speakers.map((sp) => sp && (
              <Link key={sp.id} href={`/speakers/${sp.id}`}>
                <div className="bg-[#0D0D10] rounded p-3 flex items-center gap-3 hover:bg-[#0D0D10]/80 transition-colors">
                  <Avatar name={sp.name} photoUrl={sp.photoUrl} size="md" />
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">{sp.name}</p>
                    <p className="text-[#A1A1AA] text-xs truncate">{sp.title}</p>
                    <p className="text-[#FFB800] text-xs font-medium">{sp.company}</p>
                  </div>
                  <svg className="ml-auto text-[#A1A1AA] flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </PageWrapper>
  );
}
