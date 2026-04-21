import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import { SideEvent } from '@/types';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
}

function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

const statusConfig = {
  register: { label: 'Register', variant: 'green' as const },
  'sold-out': { label: 'Sold Out', variant: 'red' as const },
  waitlist: { label: 'Waitlist', variant: 'gray' as const },
};

interface Props {
  event: SideEvent;
}

export default function SideEventCard({ event }: Props) {
  const status = statusConfig[event.status];

  return (
    <a
      href={event.lumaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex bg-[#0D0D10] border border-white/10 rounded-xl overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 active:scale-[0.99]"
    >
      {/* Square cover image */}
      <div className="relative w-28 shrink-0 bg-zinc-900 self-stretch">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
        <div>
          <p className="text-[#FFB800] text-[11px] font-semibold mb-1">
            {formatDate(event.date)} · {formatTime(event.startTime)}
            {event.endTime && ` – ${formatTime(event.endTime)}`}
          </p>
          <p className="text-white font-semibold text-sm leading-snug mb-1.5 line-clamp-2">{event.title}</p>
          <div className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A1A1AA] shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-[#A1A1AA] text-[11px] truncate">{event.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="gray">{tag}</Badge>
            ))}
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>
    </a>
  );
}
