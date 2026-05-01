import { DebateSession } from '@/types';

export const debates: DebateSession[] = [
  {
    id: 'debate-1',
    sessionId: 'debate-1',
    question: 'Can decentralized protocols reliably automate national-scale financial settlement and mitigate the risks of autonomous AI agents by 2030?',
    context: 'As DeFi infrastructure matures and AI agents begin operating financial systems autonomously, a critical question emerges: can smart contracts and decentralized networks handle the reliability, compliance, and scale requirements of sovereign financial settlement?',
    bullSummary: 'Yes — by 2030, modular blockchain architecture, ZK proofs, and formal verification will reach the reliability bar required for national settlement. AI agents operating within auditable on-chain rails are more transparent and tamper-resistant than legacy systems.',
    bearSummary: 'No — national-scale settlement demands near-zero latency, regulatory certainty, and legal recourse that permissionless protocols fundamentally cannot provide. Autonomous AI agents introduce systemic risk that no on-chain governance can reliably contain.',
  },
  {
    id: 'debate-2',
    sessionId: 'debate-2',
    question: 'Is the race for higher on-chain yield sustainable, or are points programs and incentive-driven returns inflating a mercenary-capital bubble destined to unwind?',
    context: 'Points programs, looped staking, and ever-higher LRT-style yields have fueled a yield arms race across DeFi. The debate: are these programs bootstrapping durable liquidity and real users, or are they front-loaded subsidies that vanish the moment incentives end?',
    bullSummary: 'Yes — incentive programs are how every successful network bootstraps liquidity. Today\'s points and yield campaigns are funding real protocol traction, sticky users, and infrastructure that will compound long after rewards taper. The "war" produces winners.',
    bearSummary: 'No — most current "yield" is recycled token emissions and reflexive leverage, not real economic return. When incentives end, TVL and users will follow. We are watching a coordination failure dressed up as innovation.',
  },
  {
    id: 'debate-3',
    sessionId: 'debate-3',
    question: 'Is AI making Web3 protocols more or less secure?',
    context: 'AI now sits on both sides of Web3 security — accelerating audits, fuzzing, and monitoring on the defensive side, while also enabling automated exploit discovery, prompt-injection of agentic protocols, and AI-driven social engineering on the offensive side. The net effect on protocol safety is contested.',
    bullSummary: 'More secure — AI compresses audit cycles, surfaces vulnerabilities before mainnet, and enables real-time anomaly detection at a scale humans cannot match. Defenders ship faster guardrails, formal verification, and monitoring than attackers can weaponize.',
    bearSummary: 'Less secure — AI lowers the cost of attack faster than the cost of defense. Automated exploit discovery, agentic-protocol prompt injection, and AI-generated phishing scale offense disproportionately. Net result: a wider, faster-moving threat surface.',
  },
];

export function getDebateById(id: string): DebateSession | undefined {
  return debates.find((d) => d.id === id);
}
