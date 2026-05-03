export type Phase = 'morning' | 'afternoon' | 'evening';

export type SessionType =
  | 'keynote'
  | 'panel'
  | 'debate'
  | 'networking'
  | 'break'
  | 'showcase'
  | 'talk'
  | 'opening'
  | 'dinner';

export type DebateStance = 'bull' | 'bear';

export type PanelReactionKey = 'agree' | 'clarify' | 'challenge';
export type ShowcaseReactionKey = 'follow' | 'unclear' | 'challenge';
export type ReactionKey = PanelReactionKey | ShowcaseReactionKey;
export type ReactionFormat = 'panel' | 'showcase';

export interface ReactionDef {
  key: ReactionKey;
  emoji: string;
  label: string;
}

export type SponsorTier = 'cohost' | 'strategic' | 'premium' | 'ecosystem' | 'community';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  photoUrl: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessionIds: string[];
  isFeatured?: boolean;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  phase: Phase;
  type: SessionType;
  speakerIds: string[];
  tags: string[];
  debateId?: string;
  isFeatured?: boolean;
}

export interface DebateSession {
  id: string;
  sessionId: string;
  question: string;
  context: string;
  bullSummary: string;
  bearSummary: string;
}

export interface SideEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  description: string;
  tags: string[];
  lumaUrl: string;
  coverImage: string;
  status: 'register' | 'sold-out' | 'waitlist';
  attendeeCount: number;
  hosts: string[];
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: SponsorTier;
}

export interface PanelQuestion {
  id: string;
  text: string;
  createdAt: number;
  upvoteCount: number;
  hasUpvoted: boolean;
}
