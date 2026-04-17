import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center">
      <p className="font-[family-name:var(--font-anton)] text-[#FFB800] text-6xl mb-4">404</p>
      <h1 className="font-[family-name:var(--font-anton)] text-white text-2xl uppercase mb-2">Page Not Found</h1>
      <p className="text-[#A1A1AA] text-sm mb-8">This block doesn&apos;t exist on-chain either.</p>
      <Link
        href="/"
        className="bg-[#FFB800] text-black font-semibold text-sm px-6 py-3
          [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]
          hover:-translate-y-0.5 transition-transform duration-200"
      >
        Back to Home
      </Link>
    </PageWrapper>
  );
}
