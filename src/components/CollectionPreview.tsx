import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACCENT, GALLERY, OPENSEA_URL, PLATFORM, SUPPLY } from "@/lib/fuxel-constants";

// Requires framer-motion. If it's not already in package.json:
//   npm install framer-motion

const previewStyles = `
  .opensea-btn { transition: background 0.2s, border-color 0.2s; }
  .opensea-btn:hover {
    background: rgba(255,107,0,0.1) !important;
    border-color: rgba(255,107,0,0.5) !important;
  }
`;

const CYCLE_MS = 3000;

export default function CollectionPreview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(prev => (prev + 1) % GALLERY.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 72px" }}>
      <style>{previewStyles}</style>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          Preview
        </p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, color: "#fff" }}>
          Meet a few of the <span style={{ color: ACCENT }}>foxes.</span>
        </h2>
      </div>

      <div style={{
        width: "100%", maxWidth: 380, aspectRatio: "1", margin: "0 auto",
        background: "#161616", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, overflow: "hidden", position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={GALLERY[idx]}
            alt={`Fuxel #${idx + 1}`}
            initial={{ y: -400, opacity: 0, rotate: -6, scale: 0.92 }}
            animate={{
              y: 0, opacity: 1, rotate: 0, scale: 1,
              transition: { type: "spring", stiffness: 130, damping: 11, mass: 1.4 },
            }}
            exit={{ y: 160, opacity: 0, transition: { duration: 0.25 } }}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              display: "block", position: "absolute", inset: 0,
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </AnimatePresence>
      </div>

      <p style={{
        textAlign: "center", marginTop: 20,
        fontSize: 11, color: "rgba(255,255,255,0.3)",
        letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
      }}>
        {SUPPLY} SUPPLY · MORE REVEALED SOON
      </p>

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
          // No live collection yet — non-clickable status pill instead of a
          // dead link. Set OPENSEA_URL in lib/fuxel-constants.ts once listed.
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
