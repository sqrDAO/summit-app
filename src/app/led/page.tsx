import { sessions } from '@/data/sessions';
import { debates } from '@/data/debates';
import { getReactionFormat } from '@/lib/reactions';
import LedController from '@/components/led/LedController';

export default function LedPage() {
  const reactionSessions = sessions.filter(
    (s) => getReactionFormat(s.type) !== null && s.type !== 'debate',
  );
  const qaSessions = sessions.filter((s) => s.type === 'panel');

  return (
    <LedController
      reactionSessions={reactionSessions}
      qaSessions={qaSessions}
      debates={debates}
    />
  );
}
