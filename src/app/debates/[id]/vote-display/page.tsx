import { notFound } from 'next/navigation';
import { debates, getDebateById } from '@/data/debates';
import VoteResultsDisplay from '@/components/debates/VoteResultsDisplay';

export function generateStaticParams() {
  return debates.map((d) => ({ id: d.id }));
}

export default async function VoteDisplayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aspect?: string }>;
}) {
  const { id } = await params;
  const { aspect } = await searchParams;
  const debate = getDebateById(id);
  if (!debate) notFound();

  return (
    <VoteResultsDisplay
      debate={debate}
      aspect={aspect === 'side' ? 'side' : 'main'}
    />
  );
}
