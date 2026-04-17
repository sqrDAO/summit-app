import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import SessionCard from '@/components/agenda/SessionCard';
import { speakers } from '@/data/speakers';
import { getSpeakerById } from '@/data/speakers';
import { getSessionById } from '@/data/sessions';

export function generateStaticParams() {
  return speakers.map((s) => ({ id: s.id }));
}

export default async function SpeakerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const speaker = getSpeakerById(id);
  if (!speaker) notFound();

  const speakerSessions = speaker.sessionIds.map((sid) => getSessionById(sid)).filter(Boolean);

  return (
    <PageWrapper>
      <TopBar title="Speaker" backHref="/speakers" />

      {/* Profile header */}
      <div className="flex items-start gap-4 mb-6">
        <Avatar name={speaker.name} photoUrl={speaker.photoUrl} size="xl" />
        <div className="flex-1 min-w-0 pt-2">
          <h1 className="font-[family-name:var(--font-anton)] text-white text-2xl uppercase leading-tight">
            {speaker.name}
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">{speaker.title}</p>
          <p className="text-[#FFB800] text-sm font-semibold mt-0.5">{speaker.company}</p>
        </div>
      </div>

      {/* Bio */}
      {speaker.bio && (
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-anton)] text-white text-lg uppercase mb-2">About</h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">{speaker.bio}</p>
        </div>
      )}

      {/* Social links */}
      {Object.keys(speaker.socials).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {speaker.socials.twitter && (
            <a href={speaker.socials.twitter} target="_blank" rel="noopener noreferrer">
              <Badge variant="gray">𝕏 Twitter</Badge>
            </a>
          )}
          {speaker.socials.linkedin && (
            <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Badge variant="blue">💼 LinkedIn</Badge>
            </a>
          )}
          {speaker.socials.website && (
            <a href={speaker.socials.website} target="_blank" rel="noopener noreferrer">
              <Badge variant="gray">🌐 Website</Badge>
            </a>
          )}
        </div>
      )}

      {/* Sessions */}
      {speakerSessions.length > 0 && (
        <div>
          <h2 className="font-[family-name:var(--font-anton)] text-white text-lg uppercase mb-3">
            Sessions
          </h2>
          <div className="space-y-3">
            {speakerSessions.map((session) => session && (
              <SessionCard key={session.id} session={session} compact />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
