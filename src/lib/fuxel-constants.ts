// ── Brand ──────────────────────────────────────────────────────────
export const ACCENT = "#FF6B00";

// ── Collection facts (edit here — used across all components) ──────
export const SUPPLY = "1,555";
export const CHAIN = "Robinhood Chain";
export const MINT_PRICE = "TBA";
export const PLATFORM = "OpenSea";

// Set this once the collection is actually listed. Until then, the UI
// shows a "launching soon" pill instead of a dead link.
export const OPENSEA_URL: string | null = null;

// ── Social / campaign links ─────────────────────────────────────────
export const POST_URL = "https://x.com/FuxelFox/status/2091924978161590365";
export const COMMENT_POST_URL = "https://x.com/FuxelFox/status/2091924978161590365";
export const FOLLOW_URL = "https://x.com/FuxelFox";
export const FOLLOW_HANDLE = "@FuxelFox";

// ── Local storage key for "already submitted" gate ──────────────────
export const LS_KEY = "fuxel_submitted";

// ── Gallery images (public/Fuxel-1.jpg … Fuxel-8.jpg) ────────────────
export const GALLERY = Array.from({ length: 8 }, (_, i) => `/Fuxel-${i + 1}.jpg`);
