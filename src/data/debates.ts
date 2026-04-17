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
    question: 'Should yield-bearing RWAs be regulated as banking products to preserve traditional deposit stability?',
    context: 'Tokenized real-world assets offering yields are rapidly attracting capital that previously sat in bank deposits. Regulators face a dilemma: apply banking-style rules and preserve systemic stability, or treat RWAs as securities and risk missing the innovation window.',
    bullSummary: 'Yes — yield-bearing RWAs function economically like deposits and money market instruments. Regulating them under banking frameworks protects consumers, prevents systemic risk, and gives institutions the clarity needed for large-scale adoption.',
    bearSummary: 'No — over-regulating RWAs as banking products stifles innovation and misses the point. RWAs are fundamentally different from deposits: they are programmable, composable, and transparent. A bespoke regulatory framework would better serve the ecosystem.',
  },
  {
    id: 'debate-3',
    sessionId: 'debate-3',
    question: 'Can smart-contract-based governance effectively mitigate risks of autonomous AI agents?',
    context: 'AI agents are increasingly being given on-chain capabilities — from executing trades to managing treasuries. On-chain governance via DAOs and smart contracts has been proposed as a safety mechanism, but whether it can keep pace with AI decision speed remains contested.',
    bullSummary: 'Yes — smart contract constraints, multi-sig kill switches, and DAO-governed parameter limits create verifiable, enforceable guardrails for AI agents. Transparency of on-chain actions makes AI behavior auditable in ways that closed systems cannot match.',
    bearSummary: 'No — governance is slow and AI is fast. By the time a DAO votes on an anomalous AI agent action, the damage is done. Effective AI risk mitigation requires off-chain circuit breakers, regulatory oversight, and probabilistic monitoring — not blockchain governance.',
  },
];

export function getDebateById(id: string): DebateSession | undefined {
  return debates.find((d) => d.id === id);
}
