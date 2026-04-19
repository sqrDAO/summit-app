import { Partner } from '@/types';

export const partners: Partner[] = [
  // Co-hosts
  { id: 'sqrdao', name: 'sqrDAO', logoUrl: '/images/partners/sqrdao.png', websiteUrl: 'https://sqrdao.com', tier: 'cohost' },
  { id: 'davas', name: 'DAVAS', logoUrl: '/images/partners/davas.png', websiteUrl: 'https://davas.vc', tier: 'cohost' },

  // Strategic Partners
  { id: 'dissc', name: 'DISSC', logoUrl: '/images/partners/dissc.png', websiteUrl: 'http://startupdanang.vn', tier: 'strategic' },
  { id: 'lisk', name: 'Lisk', logoUrl: '/images/partners/lisk.png', websiteUrl: 'https://lisk.com', tier: 'strategic' },

  // Premium Partners
  { id: 'nebulus', name: 'NEBULUS', logoUrl: '/images/partners/nebulus.png', websiteUrl: 'https://nebulus.world', tier: 'premium' },

  // Ecosystem Partners
  { id: 'swiss-ep', name: 'Swiss EP', logoUrl: '/images/partners/SwissEP.png', websiteUrl: 'https://swissep.org/countries/vietnam', tier: 'ecosystem' },
  { id: 'aptos', name: 'Aptos', logoUrl: '/images/partners/aptos.png', websiteUrl: 'https://aptoslabs.com', tier: 'ecosystem' },
  { id: 'avalanche', name: 'Avalanche', logoUrl: '/images/partners/avalanche.png', websiteUrl: 'https://avax.network', tier: 'ecosystem' },
  { id: 'laguna-network', name: 'Laguna Network', logoUrl: '/images/partners/laguna.png', websiteUrl: 'https://laguna.network', tier: 'ecosystem' },

  // Community Partners
  { id: 'team1', name: 'Team1', logoUrl: '/images/partners/team1.png', websiteUrl: 'https://www.team1.network', tier: 'community' },
  { id: 'spores', name: 'Spores Network', logoUrl: '/images/partners/spores.png', websiteUrl: 'https://spores.app', tier: 'community' },
  { id: 'danang-blockchain-hub', name: 'Da Nang Blockchain Hub', logoUrl: '/images/partners/danang-blockchain-hub.svg', websiteUrl: 'https://www.danangblockchainhub.com', tier: 'community' },
];

export function getPartnersByTier(tier: Partner['tier']): Partner[] {
  return partners.filter((p) => p.tier === tier);
}
