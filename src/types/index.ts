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

export type SponsorTier = 'cohost' | 'strategic' | 'ecosystem' | 'community';

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

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: SponsorTier;
}
