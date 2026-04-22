import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SideEventCard from '@/components/events/SideEventCard';
import { sideEvents } from '@/data/sideEvents';

export const dynamic = 'force-dynamic';

function getUpcomingEvents() {
  const now = new Date();
  return sideEvents.filter((event) => {
    const timeStr = event.endTime ?? event.startTime;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const eventEnd = new Date(event.date);
    eventEnd.setHours(hours, minutes, 0, 0);
    return eventEnd > now;
  });
}

export default function SideEventsPage() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <PageWrapper>
      <TopBar title="Side Events" />

      <p className="text-[#A1A1AA] text-xs mb-5">
        {upcomingEvents.length} events curated by sqrDAO
      </p>

      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <SideEventCard key={event.id} event={event} />
        ))}
      </div>

      <p className="text-[#A1A1AA] text-xs text-center mt-6">
        More events to be announced ·{' '}
        <a
          href="https://lu.ma/sqrdao-events"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFB800] hover:underline"
        >
          View on Luma
        </a>
      </p>
    </PageWrapper>
  );
}
