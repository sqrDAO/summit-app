import { notFound } from 'next/navigation';
import { sessions, getSessionById } from '@/data/sessions';
import { getReactionFormat } from '@/lib/reactions';
import PanelReactionDisplay from '@/components/reactions/PanelReactionDisplay';

export function generateStaticParams() {
  return sessions
    .filter((s) => !!getReactionFormat(s.type))
    .map((s) => ({ id: s.id }));
}

export default async function SessionReactionDisplayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = getSessionById(id);
  if (!session) notFound();

  const format = getReactionFormat(session.type);
  if (!format) notFound();

  return <PanelReactionDisplay session={session} format={format} />;
}
