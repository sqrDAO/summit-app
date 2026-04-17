import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'purple' | 'green' | 'red' | 'gray' | 'blue';
  className?: string;
}

const variantStyles: Record<string, string> = {
  gold: 'bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  red: 'bg-red-500/15 text-red-400 border border-red-500/30',
  gray: 'bg-white/5 text-[#A1A1AA] border border-white/10',
  blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
};

export default function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
