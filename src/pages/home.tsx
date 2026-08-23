import FuxelMark from "@/components/FuxelMark";
import WhitelistForm from "@/components/WhitelistForm";
import { ACCENT, CHAIN, GALLERY, MINT_PRICE, OPENSEA_URL, PLATFORM, SUPPLY } from "@/lib/fuxel-constants";

// Page-level styles only. The whitelist form owns its own styles
// (see WhitelistForm.tsx) so the two can be edited independently.
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D0D; }
  ::selection { background: ${ACCENT}; color: #000; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,107,0,0.3); }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .gallery-tile { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.25s; }
  .gallery-tile:hover {
    transform: translateY(-4px);
    border-color: rgba(255,107,0,0.5) !important;
  }

  .stat-item { transition: border-color 0.2s; }
  .stat-item:hover { border-color: rgba(255,107,0,0.35) !important; }

  .opensea-btn { transition: background 0.2s, border-color 0.2s; }
  .opensea-btn:hover {
    background: rgba(255,107,0,0.1) !important;
    border-color: rgba(255,107,0,0.5) !important;
  }
`;

// ── Stats strip ───────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { label: "Supply", value: SUPPLY },
    { label: "Chain", value: CHAIN },
    { label: "Mint Price", value: MINT_PRICE },
    { label: "Platform", value: PLATFORM },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: 10,
      margin: "0 auto 8px",
    }}>
      {stats.map(s => (
        <div key={s.label} className="stat-item" style={{
          background: "#131313",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "14px 16px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{s.value}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, fontWeight: 700 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────
function GallerySection() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 72px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          Preview
        </p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, color: "#fff" }}>
          Meet a few of the <span style={{ color: ACCENT }}>foxes.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {GALLERY.map((src, i) => (
          <div key={src} className="gallery-tile" style={{
            aspectRatio: "1", borderRadius: 10, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)", background: "#161616",
          }}>
            <img
              src={src}
              alt={`Fuxel #${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        {OPENSEA_URL ? (
          <a
            href={OPENSEA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="opensea-btn"
            style={{
              display: "inline-block", padding: "12px 28px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10, color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.04em", textDecoration: "none",
            }}
          >
            View on OpenSea →
          </a>
        ) : (
          // No live collection yet — show a non-clickable status pill instead
          // of a dead link. Swap OPENSEA_URL in lib/fuxel-constants.ts once
          // the collection is listed, and this reverts to a real button.
          <span style={{
            display: "inline-block", padding: "12px 28px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, color: "rgba(255,255,255,0.35)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
            letterSpacing: "0.04em",
          }}>
            Launching soon on {PLATFORM}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{pageStyles}</style>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,13,13,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FuxelMark size={30} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.08em", color: "#fff" }}>FUXEL</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.9)", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", fontWeight: 600 }}>WHITELIST OPEN</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "60px 24px 40px", maxWidth: 520, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
          {SUPPLY} Foxes · {CHAIN}
        </p>
        <h1 style={{ fontSize: "clamp(40px, 10vw, 64px)", fontWeight: 800, lineHeight: 1.05, color: "#fff", marginBottom: 16 }}>
          Secure your<br /><span style={{ color: ACCENT }}>whitelist spot.</span>
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 360, margin: "0 auto" }}>
          Complete the steps below. One per step — the next unlocks when you finish the last.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px 48px" }}>
        <StatsStrip />
      </div>

      {/* Whitelist form — fully separate component, see WhitelistForm.tsx */}
      <WhitelistForm />

      {/* Gallery */}
      <GallerySection />

      {/* Footer */}
      <div style={{ textAlign: "center", paddingBottom: 48 }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 24px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
            FUXEL · {SUPPLY} FOXES · {CHAIN.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
