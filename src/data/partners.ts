import { Partner } from '@/types';

export const partners: Partner[] = [
  // Co-hosts
  { id: 'sqrdao', name: 'sqrDAO', logoUrl: '/images/partners/sqrdao.png', websiteUrl: 'https://sqrdao.com', tier: 'cohost', logoScale: 0.7 },
  { id: 'davas', name: 'DAVAS', logoUrl: '/images/partners/davas.png', websiteUrl: 'https://davas.vc', tier: 'cohost' },

  // Strategic Partners
  { id: 'dissc', name: 'DISSC', logoUrl: '/images/partners/dissc.png', websiteUrl: 'http://startupdanang.vn', tier: 'strategic' },
  { id: 'lisk', name: 'Lisk', logoUrl: '/images/partners/lisk.png', websiteUrl: 'https://lisk.com', tier: 'strategic' },

  // Premium Partners
  { id: 'nebulus', name: 'NEBULUS', logoUrl: '/images/partners/nebulus.png', websiteUrl: 'https://nebulus.world', tier: 'premium', logoScale: 1.3 },
  { id: 'pharos', name: 'Pharos Network', logoUrl: '/images/partners/pharos.svg', websiteUrl: 'https://www.pharos.xyz', tier: 'premium' },
  { id: 'aquavance', name: 'Aquavance', logoUrl: '/images/partners/aquavance.svg', websiteUrl: 'https://aquavance.com.vn/', tier: 'premium' },
  { id: 'vici-foundation', name: 'VICI Foundation', logoUrl: '/images/partners/VICI.svg', websiteUrl: 'https://www.facebook.com/vicifoundation/', tier: 'premium' },
  { id: 'risemount', name: 'Risemount', logoUrl: '/images/partners/risemount.svg', websiteUrl: 'https://risemountresortdanang.com', tier: 'premium', logoScale: 1.3 },

  // Ecosystem Partners
  { id: 'swiss-ep', name: 'Swiss EP', logoUrl: '/images/partners/SwissEP.png', websiteUrl: 'https://swissep.org/countries/vietnam', tier: 'ecosystem' },
  { id: 'aptos', name: 'Aptos', logoUrl: '/images/partners/aptos.png', websiteUrl: 'https://aptoslabs.com', tier: 'ecosystem' },
  { id: 'avalanche', name: 'Avalanche', logoUrl: '/images/partners/avalanche.png', websiteUrl: 'https://avax.network', tier: 'ecosystem' },
  { id: 'laguna-network', name: 'Laguna Network', logoUrl: '/images/partners/laguna.png', websiteUrl: 'https://laguna.network', tier: 'ecosystem' },
  { id: 'merch3', name: 'Merch3', logoUrl: '/images/partners/merch3.png', websiteUrl: 'https://www.merch3.space', tier: 'ecosystem' },
  { id: 'dash', name: 'Dash', logoUrl: '/images/partners/dash.png', websiteUrl: 'https://www.dash.org', tier: 'ecosystem' },
  { id: 'bitget-wallet', name: 'Bitget Wallet', logoUrl: '/images/partners/bitget-wallet.png', websiteUrl: 'https://web3.bitget.com', tier: 'ecosystem' },

  // Community Partners
  { id: 'team1', name: 'Team1', logoUrl: '/images/partners/team1.png', websiteUrl: 'https://www.team1.network', tier: 'community' },
  { id: 'spores', name: 'Spores Network', logoUrl: '/images/partners/spores.png', websiteUrl: 'https://spores.app', tier: 'community' },
  { id: 'danang-blockchain-hub', name: 'Da Nang Blockchain Hub', logoUrl: '/images/partners/danang-blockchain-hub.svg', websiteUrl: 'https://www.danangblockchainhub.com', tier: 'community' },
  { id: 'bigcoin', name: 'BigCoin', logoUrl: '/images/partners/bigcoin.png', websiteUrl: 'https://bigcoin.vn', tier: 'community' },
  { id: 'dnes', name: 'DNES', logoUrl: '/images/partners/dnes.png', websiteUrl: 'https://dnes.vn', tier: 'community' },
  { id: 'hyperbuilder', name: 'HyperBuilder', logoUrl: '/images/partners/hyperbuilder.png', websiteUrl: 'https://www.hyperbuilder.co', tier: 'community' },
  { id: 'w3dn', name: 'W3DN', logoUrl: '/images/partners/W3DN.png', websiteUrl: 'https://x.com/W3BDN', tier: 'community' },
  { id: 'taipei-blockchain-week', name: 'Taipei Blockchain Week', logoUrl: '/images/partners/taipei-blockchain-week.png', websiteUrl: 'https://www.taipeiblockchainweek.com', tier: 'community' },
  { id: 'xomnft', name: 'XomNFT', logoUrl: '/images/partners/XomNFT.png', websiteUrl: 'https://x.com/xomnft_', tier: 'community' },
  { id: '8sian-magazine', name: '8sian Magazine', logoUrl: '/images/partners/8sian-magazine.png', websiteUrl: 'https://8sian.io', tier: 'community' },
  { id: 'cryptopolitan', name: 'Cryptopolitan', logoUrl: '/images/partners/cryptopolitan.png', websiteUrl: 'https://www.cryptopolitan.com', tier: 'community' },
  { id: 'cryptonomads', name: 'CryptoNomads', logoUrl: '/images/partners/cryptonomads.png', websiteUrl: 'https://cryptonomads.org', tier: 'community' },
  { id: 'blockdev', name: 'BlockDevID', logoUrl: '/images/partners/blockdev.png', websiteUrl: 'https://blockdev.id', tier: 'community' },
  { id: 'incrypted', name: 'Incrypted', logoUrl: '/images/partners/incrypted.png', websiteUrl: 'https://incrypted.com', tier: 'community' },
  { id: 'sotamedia', name: 'SotaMedia', logoUrl: '/images/partners/sotamedia.png', websiteUrl: 'https://sota.media', tier: 'community' },
  { id: 'dcent', name: "D'cent Wallet", logoUrl: '/images/partners/dcent.png', websiteUrl: 'https://dcentwallet.com', tier: 'community' },
  { id: 'conviction', name: 'Conviction', logoUrl: '/images/partners/conviction.png', websiteUrl: 'https://www.conviction.vn', tier: 'community' },
  { id: 'coin68', name: 'Coin68', logoUrl: '/images/partners/Coin68.svg', websiteUrl: 'https://coin68.com', tier: 'community' },
  { id: 'techflow', name: 'TechFlow', logoUrl: '/images/partners/techflow.png', websiteUrl: 'https://www.techflowpost.com', tier: 'community' },
];

export function getPartnersByTier(tier: Partner['tier']): Partner[] {
  return partners.filter((p) => p.tier === tier);
}
