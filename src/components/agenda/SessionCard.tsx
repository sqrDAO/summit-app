import Link from 'next/link';
import clsx from 'clsx';
import DogEarCard from '@/components/ui/DogEarCard';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import BookmarkButton from '@/components/session/BookmarkButton';
import { Session } from '@/types';
import { formatTime, getSessionTypeLabel } from '@/lib/utils';
import { getSpeakerById } from '@/data/speakers';

interface SessionCardProps {
  session: Session;
  compact?: boolean;
}

const typeBadgeVariant: Record<string, 'gold' | 'purple' | 'green' | 'red' | 'gray' | 'blue'> = {
  keynote: 'gold',
  panel: 'blue',
  debate: 'red',
  showcase: 'green',
  networking: 'gray',
  break: 'gray',
  dinner: 'purple',
  talk: 'blue',
};

export default function SessionCard({ session, compact }: SessionCardProps) {
  const isClickable = session.type !== 'break' && session.type !== 'networking';
  const speakers = session.speakerIds.slice(0, 3).map((id) => getSpeakerById(id)).filter(Boolean);

  const content = (
    <DogEarCard className="p-4" onClick={isClickable ? undefined : undefined}>
      <div className="flex items-start gap-3">
        {/* Time column */}
        <div className="flex-shrink-0 text-right min-w-[52px]">
          <p className="text-[#FFB800] text-xs font-semibold">{formatTime(session.startTime)}</p>
          {!compact && <p className="text-[#A1A1AA] text-[10px] mt-0.5">{formatTime(session.endTime)}</p>}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant={typeBadgeVariant[session.type] ?? 'gray'}>
              {getSessionTypeLabel(session.type)}
            </Badge>
          </div>
          <p className={clsx('text-white font-medium leading-snug', compact ? 'text-sm' : 'text-[15px]')}>
            {session.title}
          </p>

          {speakers.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex -space-x-2">
                {speakers.map((sp) => sp && (
                  <Avatar key={sp.id} name={sp.name} photoUrl={sp.photoUrl} size="sm" className="ring-1 ring-black" />
                ))}
              </div>
              <p className="text-[#A1A1AA] text-xs truncate">
                {speakers.map((sp) => sp?.name).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Bookmark */}
        {isClickable && (
          <div className="flex-shrink-0 ml-1">
            <BookmarkButton sessionId={session.id} iconOnly />
          </div>
        )}
      </div>
    </DogEarCard>
  );

  if (isClickable) {
    return (
      <Link href={`/sessions/${session.id}`} className="block hover:-translate-y-0.5 transition-transform duration-200">
        {content}
      </Link>
    );
  }

  return content;
}
