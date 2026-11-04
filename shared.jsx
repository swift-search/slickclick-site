// Shared product data + icon set for all three Sinope homepage directions.
// Icons are line-art SVGs that adopt the local stroke color via currentColor.

const SINOPE_PRODUCTS = [
  {
    id: 'swift-search',
    name: 'Swift Search',
    tag: 'Search reimagined',
    short: 'Type once, jump anywhere.',
    long: 'A keyboard-first command bar that searches your tabs, history, bookmarks, and the open web in one breath. No mouse required.',
    stats: { users: '180K', rating: '4.9', size: '92 KB' },
    badge: 'Featured',
  },
  {
    id: 'pocketpane',
    name: 'Pocketpane',
    tag: 'Side-by-side tabs',
    short: 'Split the screen, not your focus.',
    long: 'Pin any tab to a slim companion pane. Reference docs while you work, watch while you write, compare without the cmd-tab gymnastics.',
    stats: { users: '64K', rating: '4.8', size: '110 KB' },
  },
  {
    id: 'quietread',
    name: 'Quietread',
    tag: 'Distraction dieting',
    short: 'Make the internet shut up.',
    long: 'A reader mode that does more than strip ads — it dims the world. Banners, popups, infinite scroll: gone. Words: stay.',
    stats: { users: '210K', rating: '4.9', size: '78 KB' },
  },
];

// Each icon is a self-contained <svg>; pass size + (optionally) strokeWidth.
// Drawn within a 64×64 viewBox; uses currentColor so it inherits ink color.
const IconSwiftSearch = ({ size = 64, strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="27" cy="27" r="15" />
    <path d="M38 38l13 13" />
    <path d="M19 24l5 5 9-12" />
    <path d="M55 14l-4 4M58 22h-5M50 8v5" opacity="0.55" />
  </svg>
);

const IconPocketpane = ({ size = 64, strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="12" width="52" height="40" rx="5" />
    <path d="M36 12v40" />
    <path d="M12 22h16M12 28h12M12 34h16" opacity="0.7" />
    <path d="M42 22h10M42 28h8M42 34h10M42 40h6" opacity="0.45" />
  </svg>
);

const IconQuietread = ({ size = 64, strokeWidth = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 16c6-2 14-2 22 2v34c-8-4-16-4-22-2zM54 16c-6-2-14-2-22 2v34c8-4 16-4 22-2z" />
    <path d="M17 26h10M17 32h10M17 38h6" opacity="0.55" />
    <path d="M37 26h10M37 32h10M37 38h6" opacity="0.55" />
  </svg>
);

const PRODUCT_ICONS = {
  'swift-search': IconSwiftSearch,
  'pocketpane': IconPocketpane,
  'quietread': IconQuietread,
};

// Small helper: scroll-reveal hook. Tries IntersectionObserver, but ALWAYS
// shows after a short delay — these artboards live inside a zoomed design
// canvas where IO can never fire (the artboards are scaled below threshold
// or sit outside the visible viewport), so we can't rely on it alone.
function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) { setShown(true); return; }
    let done = false;
    const show = () => { if (!done) { done = true; setShown(true); } };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show(); io.disconnect(); } }, { threshold });
    io.observe(el);
    // Safety net: reveal after 400ms regardless. Within a design canvas the
    // artboards typically render below the IO threshold, so this is the path
    // that actually triggers — the IO is just a nicety for real viewport use.
    const t = setTimeout(show, 400);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [threshold]);
  return [ref, shown];
}

// Tiny browser chrome SVG used as a frame around product mockups.
const BrowserChrome = ({ children, style = {} }) => (
  <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 30px 60px -30px rgba(20,15,10,0.25), 0 1px 2px rgba(20,15,10,0.08)', background: '#fff', border: '1px solid rgba(20,15,10,0.06)', ...style }}>
    <div style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, background: 'rgba(20,15,10,0.04)', borderBottom: '1px solid rgba(20,15,10,0.05)' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <span style={{ width: 9, height: 9, borderRadius: 5, background: '#FF5F57' }} />
        <span style={{ width: 9, height: 9, borderRadius: 5, background: '#FEBC2E' }} />
        <span style={{ width: 9, height: 9, borderRadius: 5, background: '#28C840' }} />
      </div>
      <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(20,15,10,0.06)', marginLeft: 14, maxWidth: 260, fontSize: 10, color: 'rgba(20,15,10,0.4)', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>sinope.studio</div>
    </div>
    {children}
  </div>
);

Object.assign(window, { SINOPE_PRODUCTS, PRODUCT_ICONS, IconSwiftSearch, IconPocketpane, IconQuietread, useReveal, BrowserChrome });
