import type { ReactionDef, ReactionFormat, Session, SessionType } from '@/types';

const PANEL_REACTIONS: ReactionDef[] = [
  { key: 'agree', emoji: '✅', label: 'Agree' },
  { key: 'clarify', emoji: '🤔', label: 'Clarify' },
  { key: 'challenge', emoji: '❌', label: 'Challenge' },
];

const SHOWCASE_REACTIONS: ReactionDef[] = [
  { key: 'follow', emoji: '👍', label: 'Worth following' },
  { key: 'unclear', emoji: '🤔', label: 'Unclear' },
  { key: 'challenge', emoji: '❌', label: 'Challenge' },
];

const FORMAT_BY_TYPE: Partial<Record<SessionType, ReactionFormat>> = {
  panel: 'panel',
  debate: 'panel',
  showcase: 'showcase',
};

export function getReactionFormat(type: SessionType): ReactionFormat | null {
  return FORMAT_BY_TYPE[type] ?? null;
}

export function getReactionsForFormat(format: ReactionFormat): ReactionDef[] {
  return format === 'panel' ? PANEL_REACTIONS : SHOWCASE_REACTIONS;
}

export function getReactionsForSession(session: Pick<Session, 'type'>): ReactionDef[] | null {
  const format = getReactionFormat(session.type);
  return format ? getReactionsForFormat(format) : null;
}
