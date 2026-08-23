import { useState } from "react";
import { ACCENT, CHAIN, MINT_PRICE, PLATFORM, SUPPLY } from "@/lib/fuxel-constants";

// Edit questions/answers here. Answers pull live values (supply, chain,
// mint price, platform) from lib/fuxel-constants.ts, so those stay in
// sync automatically if you update the constants.
const FAQS = [
  {
    q: "What is Fuxel?",
    a: `Fuxel is a collection of ${SUPPLY} hand-crafted foxes living on ${CHAIN}.`,
  },
  {
    q: "What's the mint price?",
    a: `Mint price is ${MINT_PRICE}. We'll confirm it here and on X before minting opens.`,
  },
  {
    q: "Where can I mint?",
    a: `Fuxel mints on ${PLATFORM}. The link will be shared here and on X once it's live.`,
  },
  {
    q: "How do I get on the whitelist?",
    a: "Tap \"Join Whitelist\" above, then follow @FuxelFox, like & retweet the pinned post, comment tagging 2 frens, and submit your wallet address.",
  },
  {
    q: "How many spots are there?",
    a: "Spots are limited and given out on a first-come basis — the earlier you apply, the better your odds.",
  },
  {
    q: "I got an error saying my wallet or X username is already used — why?",
    a: "Each wallet address and X username can only submit once. If you think this is a mistake, reach out to us on X.",
  },
];

const faqStyles = `
  .faq-item { transition: border-color 0.2s; }
  .faq-item:hover { border-color: rgba(255,107,0,0.25) !important; }
  .faq-toggle { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1); }
`;

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px" }}>
      <style>{faqStyles}</style>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          FAQ
        </p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, color: "#fff" }}>
          Frequently asked <span style={{ color: ACCENT }}>questions.</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={item.q}
              className="faq-item"
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 18px", background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", textAlign: "left",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{item.q}</span>
                <span
                  className="faq-toggle"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    fontSize: 18, color: ACCENT, flexShrink: 0, marginLeft: 12, lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px" }}>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
