interface VoteBarProps {
  bullPercent: number;
  totalVotes: number;
}

export default function VoteBar({ bullPercent, totalVotes }: VoteBarProps) {
  const bearPercent = 100 - bullPercent;

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-emerald-400 font-semibold">🐂 Bull {bullPercent}%</span>
        <span className="text-[#A1A1AA] text-[10px]">{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
        <span className="text-red-400 font-semibold">{bearPercent}% Bear 🐻</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-white/10 flex">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${bullPercent}%` }}
        />
        <div
          className="h-full bg-red-500 transition-all duration-500"
          style={{ width: `${bearPercent}%` }}
        />
      </div>
    </div>
  );
}
