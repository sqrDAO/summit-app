import clsx from 'clsx';

interface GoldButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function GoldButton({
  children,
  className,
  onClick,
  href,
  variant = 'primary',
  fullWidth,
  disabled,
}: GoldButtonProps) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300',
    'px-5 py-3 rounded-none',
    '[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]',
    fullWidth && 'w-full',
    disabled && 'opacity-40 pointer-events-none',
    variant === 'primary' && 'bg-[#FFB800] text-black hover:-translate-y-0.5 hover:bg-[#ffc929]',
    variant === 'outline' && 'border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10',
    variant === 'ghost' && 'text-[#FFB800] hover:bg-[#FFB800]/10',
    className
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
