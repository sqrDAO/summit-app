import { notFound } from 'next/navigation';
import PanelQARoom from '@/components/qa/PanelQARoom';
import { sessions, getSessionById } from '@/data/sessions';

export function generateStaticParams() {
  return sessions
    .filter((s) => s.type === 'panel')
    .map((s) => ({ id: s.id }));
}

export default async function PanelQAPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = getSessionById(id);
  if (!session || session.type !== 'panel') notFound();

  return <PanelQARoom session={session} />;
}
