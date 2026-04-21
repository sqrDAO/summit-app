import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import DebateCard from '@/components/debates/DebateCard';
import { debates } from '@/data/debates';
import { getSessionById } from '@/data/sessions';

export default function DebatesPage() {
  return (
    <PageWrapper>
      <TopBar title="Lightning Debates" />

      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
        Three high-stakes debates where the community decides: Bullish or Bearish? Cast your vote and see where builders stand.
      </p>

      {debates.map((debate) => {
        const session = getSessionById(debate.sessionId);
        if (!session) return null;
        return <DebateCard key={debate.id} debate={debate} session={session} />;
      })}

      <div className="mt-2 pt-4 border-t border-white/10 text-center">
        <p className="text-[#A1A1AA] text-xs">Votes are live and shared across all devices</p>
      </div>
    </PageWrapper>
  );
}
