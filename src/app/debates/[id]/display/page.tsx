import { notFound } from 'next/navigation';
import DebateReactionDisplay from '@/components/debates/DebateReactionDisplay';
import { debates, getDebateById } from '@/data/debates';

export function generateStaticParams() {
  return debates.map((d) => ({ id: d.id }));
}

export default async function DebateReactionDisplayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const debate = getDebateById(id);
  if (!debate) notFound();

  return <DebateReactionDisplay debate={debate} />;
}
