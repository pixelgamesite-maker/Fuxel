import { useState } from "react";
import FuxelMark from "@/components/FuxelMark";
import WhitelistForm from "@/components/WhitelistForm";
import CollectionPreview from "@/components/CollectionPreview";
import FAQSection from "@/components/FAQSection";
import { ACCENT, CHAIN, FOLLOW_HANDLE, MINT_PRICE, PLATFORM, SUPPLY } from "@/lib/fuxel-constants";

// Page-level styles only. The whitelist form owns its own styles
// (see WhitelistForm.tsx) so the two can be edited independently.
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D0D; }
  ::selection { background: ${ACCENT}; color: #000; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,107,0,0.3); }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-overlay { animation: fadeIn 0.2s ease both; }
  .modal-card { animation: modalIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }

  .join-btn { transition: transform 0.2s, box-shadow 0.2s; }
  .join-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,107,0,0.35);
  }

  .modal-close-btn { transition: background 0.2s; }
  .modal-close-btn:hover { background: rgba(255,255,255,0.08) !important; }

  .stat-box { transition: border-color 0.2s, transform 0.2s; }
  .stat-box:hover {
    border-color: rgba(255,107,0,0.35) !important;
    transform: translateY(-2px);
  }
`;

// ── Hero stats grid — 3 boxes in a row, 1 centered below ────────────
function HeroStats() {
  const boxStyle: React.CSSProperties = {
    background: "#161010",
    border: "1px solid rgba(255,107,0,0.15)",
    borderRadius: 12,
    padding: "16px 12px",
    textAlign: "center",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.12em", textTransform: "uppercase",
    marginBottom: 6, fontWeight: 700,
  };
  const valueStyle: React.CSSProperties = { fontSize: 17, fontWeight: 800, color: "#fff" };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 10 }}>
        <div className="stat-box" style={boxStyle}>
          <div style={labelStyle}>Mint Price</div>
          <div style={valueStyle}>{MINT_PRICE}</div>
        </div>
        <div className="stat-box" style={boxStyle}>
          <div style={labelStyle}>Supply</div>
          <div style={valueStyle}>{SUPPLY}</div>
        </div>
        <div className="stat-box" style={boxStyle}>
          <div style={labelStyle}>Chain</div>
          <div style={valueStyle}>{CHAIN}</div>
        </div>
      </div>
      <div style={{ width: "60%", margin: "0 auto" }}>
        <div className="stat-box" style={boxStyle}>
          <div style={labelStyle}>Launchpad</div>
          <div style={valueStyle}>{PLATFORM}</div>
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{pageStyles}</style>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,13,13,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FuxelMark size={30} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.08em", color: "#fff" }}>FUXEL</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "56px 24px 48px", maxWidth: 480, margin: "0 auto" }}>
        {/* Character art */}
        <div style={{
          width: "clamp(200px, 46vw, 280px)", height: "clamp(200px, 46vw, 280px)",
          margin: "0 auto 28px", borderRadius: 28,
          background: `radial-gradient(circle at 50% 30%, rgba(255,107,0,0.18), transparent 70%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <img
            src="/Fuxel-1.jpg"
            alt="Fuxel"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const parent = el.parentElement;
              if (parent) parent.innerHTML = "<span style=\"font-size:96px\">🦊</span>";
            }}
          />
        </div>

        {/* Minting tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 22 }}>
          <span style={{ width: 6, height: 6, background: ACCENT, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
            Minting on {PLATFORM} · {FOLLOW_HANDLE}
          </span>
        </div>

        {/* Wordmark */}
        <h1 style={{ fontSize: "clamp(48px, 14vw, 76px)", fontWeight: 800, lineHeight: 0.95, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>
          FUXEL
        </h1>
        <p style={{ fontSize: 15, fontWeight: 700, color: ACCENT, letterSpacing: "0.02em", marginBottom: 20 }}>
          The Fox Den
        </p>

        {/* Description */}
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 360, margin: "0 auto 32px" }}>
          {SUPPLY} hand-crafted foxes on {CHAIN} — built for the ones who get in early.
        </p>

        {/* Stats */}
        <div style={{ marginBottom: 32 }}>
          <HeroStats />
        </div>

        {/* CTA */}
        <button
          className="join-btn"
          onClick={() => setShowModal(true)}
          style={{
            padding: "15px 40px",
            background: ACCENT, borderRadius: 12,
            border: "none", color: "#000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: 14,
            letterSpacing: "0.06em", textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,107,0,0.25)",
          }}
        >
          Join Whitelist →
        </button>
      </div>

      {/* Collection preview */}
      <CollectionPreview />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <div style={{ textAlign: "center", paddingBottom: 48 }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 24px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
            FUXEL · {SUPPLY} FOXES · {CHAIN.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Whitelist modal — form itself lives in WhitelistForm.tsx */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, overflowY: "auto",
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="modal-card" style={{
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            width: "100%", maxWidth: 560,
            maxHeight: "88vh", overflowY: "auto",
            padding: "32px 24px 28px",
            position: "relative",
          }}>
            <button
              onClick={() => setShowModal(false)}
              className="modal-close-btn"
              aria-label="Close"
              style={{
                position: "absolute", top: 16, right: 16,
                background: "transparent", border: "none",
                color: "rgba(255,255,255,0.4)", fontSize: 20, cursor: "pointer",
                width: 32, height: 32, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                Whitelist Application
              </p>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Join the Den</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Complete each step below. The next unlocks when you finish the last.
              </p>
            </div>

            <WhitelistForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
