import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import Avatar from '@/components/ui/Avatar';
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
        <div className="flex flex-wrap gap-3 mb-6">
          {speaker.socials.twitter && (
            <a
              href={speaker.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </a>
          )}
          {speaker.socials.linkedin && (
            <a
              href={speaker.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 border border-[#0A66C2]/50 text-[#4A9FE0] text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          )}
          {speaker.socials.website && (
            <a
              href={speaker.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors"
            >
              {speaker.socials.website.includes('x.com') || speaker.socials.website.includes('twitter.com') ? (
                <>
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {speaker.socials.website.split('x.com/')[1]?.split('?')[0]
                    ? `@${speaker.socials.website.split('x.com/')[1].split('?')[0]}`
                    : 'Also on X'}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Website
                </>
              )}
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
