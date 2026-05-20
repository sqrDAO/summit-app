import { sessions } from '@/data/sessions';
import { debates } from '@/data/debates';
import { getReactionFormat } from '@/lib/reactions';
import LedController from '@/components/led/LedController';

export default function LedPage() {
  const reactionSessions = sessions.filter(
    (s) => getReactionFormat(s.type) !== null && s.type !== 'debate' && !s.id.startsWith('davas-'),
  );
  const qaSessions = sessions.filter(
    (s) => s.type === 'panel' && !s.id.startsWith('davas-'),
  );

  return (
    <LedController
      reactionSessions={reactionSessions}
      qaSessions={qaSessions}
      debates={debates}
    />
  );
}
