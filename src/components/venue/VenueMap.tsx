'use client';

const VENUE_NAME = 'Risemount Premier Resort Da Nang';
const VENUE_ADDRESS = '120 Nguyen Van Thoai Street, Ngu Hanh Son, Da Nang, Vietnam';
const VENUE_QUERY = 'Risemount+Premier+Resort+Da+Nang';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_ADDRESS)}`;

export default function VenueMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const embedSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${VENUE_QUERY}&zoom=15`
    : null;

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 mb-4">
      {/* Map */}
      {embedSrc ? (
        <div className="w-full h-48">
          <iframe
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue map"
          />
        </div>
      ) : (
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-48 bg-zinc-900 flex items-center justify-center"
        >
          <div className="text-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-[#A1A1AA] text-xs">Tap to open in Google Maps</p>
          </div>
        </a>
      )}

      {/* Info bar */}
      <div className="bg-[#0D0D10] px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{VENUE_NAME}</p>
          <p className="text-[#A1A1AA] text-xs mt-0.5 leading-snug">{VENUE_ADDRESS}</p>
        </div>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 bg-[#FFB800] text-black text-xs font-bold px-3 py-2 rounded-lg active:scale-95 transition-transform"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          Directions
        </a>
      </div>
    </div>
  );
}
