'use client';

import { useEffect, useState } from 'react';

interface QRPosterProps {
  url: string;
  size?: number;
}

export default function QRPoster({ url, size = 180 }: QRPosterProps) {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const QRCode = (await import('qrcode')).default;
      const png = await QRCode.toDataURL(url, {
        margin: 1,
        width: size,
        color: { dark: '#000000', light: '#FFB800' },
      });
      if (!cancelled) setDataUrl(png);
    })();
    return () => { cancelled = true; };
  }, [url, size]);

  return (
    <div
      className="bg-[#FFB800] p-2 rounded-sm"
      style={{ width: size + 16, height: size + 16 }}
    >
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt="Scan to submit a question" width={size} height={size} />
      ) : (
        <div className="w-full h-full bg-[#FFB800]" />
      )}
    </div>
  );
}
