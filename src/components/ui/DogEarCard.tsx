import clsx from 'clsx';

interface DogEarCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
  onClick?: () => void;
}

export default function DogEarCard({ children, className, gold, onClick }: DogEarCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative bg-[#0D0D10] transition-all duration-300',
        '[clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]',
        gold && 'border border-[#FFB800]/30',
        onClick && 'cursor-pointer hover:-translate-y-1 active:scale-[0.98]',
        className
      )}
    >
      {/* Gold dog-ear triangle */}
      <div
        className="absolute top-0 right-0 w-4 h-4 bg-[#FFB800] opacity-60"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />
      {children}
    </div>
  );
}
