import clsx from 'clsx';

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: boolean;
}

export default function SectionHeader({ children, className, size = 'md', accent = true }: SectionHeaderProps) {
  return (
    <div className={clsx('mb-6', className)}>
      <h2
        className={clsx(
          'font-[family-name:var(--font-anton)] text-white leading-tight tracking-wide uppercase',
          size === 'sm' && 'text-xl',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-3xl',
        )}
      >
        {children}
      </h2>
      {accent && <div className="mt-2 w-10 h-0.5 bg-[#FFB800]" />}
    </div>
  );
}
