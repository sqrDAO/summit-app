import { Partner } from '@/types';

export const partners: Partner[] = [
  // Co-hosts
  { id: 'sqrdao', name: 'sqrDAO', logoUrl: '/images/partners/sqrdao.png', websiteUrl: 'https://sqrdao.com', tier: 'cohost' },
  { id: 'davas', name: 'DAVAS', logoUrl: '/images/partners/davas.png', websiteUrl: 'https://davas.io', tier: 'cohost' },

  // Strategic Partners
  { id: 'dissc', name: 'DISSC', logoUrl: '/images/partners/dissc.png', websiteUrl: 'https://dissc.io', tier: 'strategic' },
  { id: 'lisk', name: 'Lisk', logoUrl: '/images/partners/lisk.png', websiteUrl: 'https://lisk.com', tier: 'strategic' },

  // Ecosystem Partners
  { id: 'swiss-ep', name: 'Swiss EP', logoUrl: '/images/partners/swissep.svg', websiteUrl: 'https://swissep.io', tier: 'ecosystem' },
  { id: 'aptos', name: 'Aptos', logoUrl: '/images/partners/aptos.png', websiteUrl: 'https://aptoslabs.com', tier: 'ecosystem' },
  { id: 'avalanche', name: 'Avalanche', logoUrl: '/images/partners/avalanche.png', websiteUrl: 'https://avax.network', tier: 'ecosystem' },
  { id: 'laguna-network', name: 'Laguna Network', logoUrl: '/images/partners/laguna.png', websiteUrl: 'https://laguna.network', tier: 'ecosystem' },

  // Community Partners
  { id: 'team1', name: 'Team1', logoUrl: '/images/partners/team1.png', websiteUrl: '#', tier: 'community' },
];

export function getPartnersByTier(tier: Partner['tier']): Partner[] {
  return partners.filter((p) => p.tier === tier);
}
