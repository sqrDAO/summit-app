import clsx from 'clsx';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      className={clsx(
        'min-h-screen bg-black',
        'px-4 pt-4 pb-[calc(80px+env(safe-area-inset-bottom,0px))]',
        'max-w-lg mx-auto',
        className
      )}
    >
      {children}
    </main>
  );
}
