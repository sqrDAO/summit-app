import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import SideEventCard from '@/components/events/SideEventCard';
import { sideEvents } from '@/data/sideEvents';

export default function SideEventsPage() {
  return (
    <PageWrapper>
      <TopBar title="Side Events" />

      <p className="text-[#A1A1AA] text-xs mb-5">
        {sideEvents.length} events curated by sqrDAO
      </p>

      <div className="space-y-4">
        {sideEvents.map((event) => (
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
