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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}
          {speaker.socials.telegram && (
            <a
              href={speaker.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9]/35 border border-[#229ED9]/50 text-[#5DC4F0] text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.146.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.566-4.458c.538-.196 1.006.128.832.938z" />
              </svg>
              Telegram
            </a>
          )}
          {speaker.socials.facebook && (
            <a
              href={speaker.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/35 border border-[#1877F2]/50 text-[#5B9BF5] text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
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
