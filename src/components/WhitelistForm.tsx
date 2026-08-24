import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import FuxelMark from "@/components/FuxelMark";
import { ACCENT, CHAIN, COMMENT_POST_URL, FOLLOW_URL, LS_KEY, POST_URL } from "@/lib/fuxel-constants";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Styles scoped to this component so it can be dropped in anywhere.
const formStyles = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .wl-task-card { animation: slideDown 0.35s cubic-bezier(0.4,0,0.2,1) both; }
  .wl-fade-in { animation: fadeIn 0.4s ease both; }

  .wl-form input, .wl-form textarea {
    font-family: 'Space Grotesk', sans-serif;
    transition: border-color 0.2s;
  }
  .wl-form input:focus, .wl-form textarea:focus {
    outline: none;
    border-color: ${ACCENT} !important;
  }
  .wl-form input::placeholder, .wl-form textarea::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .wl-submit-btn { transition: background 0.2s, box-shadow 0.2s; }
  .wl-submit-btn:hover:not(:disabled) {
    background: #FF8533 !important;
    box-shadow: 0 4px 24px rgba(255,107,0,0.35) !important;
  }
  .wl-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .wl-task-btn { transition: background 0.15s, border-color 0.15s; }
  .wl-task-btn:hover {
    background: rgba(255,107,0,0.15) !important;
    border-color: rgba(255,107,0,0.6) !important;
  }
`;

// ── Input ────────────────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder, error, as = "input", rows = 3, onBlur, onKeyDown,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const shared: React.CSSProperties = {
    width: "100%",
    background: "#111",
    border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    padding: "11px 14px",
    fontFamily: "'Space Grotesk', sans-serif",
    resize: "none",
    display: "block",
  };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={shared} onBlur={onBlur} onKeyDown={onKeyDown} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={shared} onBlur={onBlur} onKeyDown={onKeyDown} />
      )}
      {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 5 }}>{error}</p>}
    </div>
  );
}

// ── Done badge ───────────────────────────────────────────────────
function DoneBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em" }}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      DONE
    </span>
  );
}

// ── Task card + header ─────────────────────────────────────────────
function TaskCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="wl-task-card" style={{
      animationDelay: `${delay}ms`,
      background: "#161616",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12,
      padding: "20px 22px",
    }}>
      {children}
    </div>
  );
}

function TaskHeader({ num, title, subtitle, done }: { num: string; title: string; subtitle: string; done: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: done ? 0 : 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: done ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${done ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700,
          color: done ? ACCENT : "rgba(255,255,255,0.3)",
          flexShrink: 0,
          transition: "all 0.3s",
        }}>
          {done
            ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            : num}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: done ? ACCENT : "#fff", transition: "color 0.3s" }}>{title}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{subtitle}</div>
        </div>
      </div>
      {done && <DoneBadge />}
    </div>
  );
}

// ── Success / already-submitted states ──────────────────────────────
// No fixed/minHeight:100vh styling here — these render inside whatever
// container hosts <WhitelistForm />, modal or full page alike.
function SuccessScreen({ wallet, xUsername, onClose }: { wallet: string; xUsername: string; onClose?: () => void }) {
  return (
    <div className="wl-fade-in" style={{ textAlign: "center", padding: "8px 4px" }}>
      <style>{formStyles}</style>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <div style={{ margin: "0 auto 24px" }}><FuxelMark size={56} /></div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 10 }}>You're on the list.</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 28 }}>
          Your spot is secured. We'll reach out when it's time to mint on {CHAIN}.
        </p>
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 18px", fontSize: 12, color: "rgba(255,255,255,0.4)", wordBreak: "break-all", textAlign: "left", marginBottom: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, display: "block", marginBottom: 4 }}>WALLET</span>
          {wallet}
        </div>
        {xUsername && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginBottom: onClose ? 24 : 0 }}>@{xUsername.replace(/^@/, "")}</div>
        )}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: 24, padding: "11px 28px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8, color: "rgba(255,255,255,0.6)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

function AlreadySubmitted({ onClose }: { onClose?: () => void }) {
  return (
    <div className="wl-fade-in" style={{ textAlign: "center", padding: "8px 4px" }}>
      <style>{formStyles}</style>
      <div style={{ maxWidth: 360, margin: "0 auto" }}>
        <div style={{ margin: "0 auto 24px" }}><FuxelMark size={56} /></div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Already submitted.</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
          You've already secured your whitelist spot. No need to submit again.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: 24, padding: "11px 28px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8, color: "rgba(255,255,255,0.6)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────
// Drop <WhitelistForm /> anywhere. It manages its own state, its own
// submission gate (localStorage), and renders full-bleed success /
// already-submitted screens when relevant — no props required.
export default function WhitelistForm({ onClose }: { onClose?: () => void } = {}) {
  const [alreadyDone] = useState(() => !!localStorage.getItem(LS_KEY));

  const [xUsername, setXUsername] = useState("");
  const [quoteLink, setQuoteLink] = useState("");
  const [commentLink, setCommentLink] = useState("");
  const [wallet, setWallet] = useState("");

  const [usernameLocked, setUsernameLocked] = useState(false);
  const [followDone, setFollowDone] = useState(false);
  const [likeQuoteDone, setLikeQuoteDone] = useState(false);
  const [commentDone, setCommentDone] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const step1Visible = true;
  const step2Visible = usernameLocked;
  const step3Visible = step2Visible && followDone;
  const step4Visible = step3Visible && likeQuoteDone;
  const step5Visible = step4Visible && commentDone;

  const openAndMark = (url: string, onDone: () => void) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(onDone, 1000);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!xUsername.trim()) e.xUsername = "Enter your X username.";
    if (!followDone) e.follow = "Follow @FuxelFox first.";
    if (!likeQuoteDone) e.likeQuote = "Like and retweet the post first.";
    if (!quoteLink.trim()) e.quoteLink = "Paste your retweet/quote link.";
    if (!commentDone) e.comment = "Comment on the post first.";
    if (!commentLink.trim()) e.commentLink = "Paste your comment link.";
    if (!wallet.trim()) e.wallet = "Enter your EVM wallet address.";
    else if (!/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) e.wallet = "Invalid address — must be 0x + 40 hex chars.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert({
        x_username: xUsername.trim().replace(/^@/, ""),
        quote_link: quoteLink.trim(),
        comment_link: commentLink.trim(),
        wallet: wallet.trim().toLowerCase(),
        follow_done: followDone,
        like_quote_done: likeQuoteDone,
        comment_done: commentDone,
      });
      if (error) throw error;
      localStorage.setItem(LS_KEY, "1");
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("applications_wallet_idx")) {
        setErrors({ submit: "This wallet is already on the whitelist." });
      } else if (msg.includes("applications_x_username_idx")) {
        setErrors({ submit: "This X username is already on the whitelist." });
      } else {
        setErrors({ submit: msg || "Something went wrong. Try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (alreadyDone) return <AlreadySubmitted onClose={onClose} />;
  if (submitted) return <SuccessScreen wallet={wallet} xUsername={xUsername} onClose={onClose} />;

  return (
    <div className="wl-form" style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: 10 }}>
      <style>{formStyles}</style>

      {/* Step 1 — X Username */}
      {step1Visible && (
        <TaskCard delay={0}>
          <TaskHeader num="01" title="Your X username" subtitle="So we know who you are" done={usernameLocked} />
          {!usernameLocked && (
            <Field
              label=""
              value={xUsername}
              onChange={v => { setXUsername(v); setErrors(e => ({ ...e, xUsername: "" })); }}
              placeholder="@yourhandle"
              error={errors.xUsername}
              onBlur={() => { if (xUsername.trim()) setUsernameLocked(true); }}
              onKeyDown={e => { if (e.key === "Enter" && xUsername.trim()) setUsernameLocked(true); }}
            />
          )}
        </TaskCard>
      )}

      {/* Step 2 — Follow */}
      {step2Visible && (
        <TaskCard delay={60}>
          <TaskHeader num="02" title="Follow @FuxelFox on X" subtitle="Join the den" done={followDone} />
          {!followDone && (
            <button
              className="wl-task-btn"
              onClick={() => openAndMark(FOLLOW_URL, () => setFollowDone(true))}
              style={{
                width: "100%", padding: "11px 0",
                background: "rgba(255,107,0,0.08)",
                border: `1px solid rgba(255,107,0,0.3)`,
                borderRadius: 8, color: ACCENT,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              Follow on X →
            </button>
          )}
          {errors.follow && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 8 }}>{errors.follow}</p>}
        </TaskCard>
      )}

      {/* Step 3 — Like & Retweet */}
      {step3Visible && (
        <TaskCard delay={60}>
          <TaskHeader num="03" title="Like & Retweet" subtitle="Like and retweet the pinned post" done={likeQuoteDone} />
          {!likeQuoteDone ? (
            <>
              <button
                className="wl-task-btn"
                onClick={() => openAndMark(POST_URL, () => setLikeQuoteDone(true))}
                style={{
                  width: "100%", padding: "11px 0", marginBottom: 12,
                  background: "rgba(255,107,0,0.08)",
                  border: "1px solid rgba(255,107,0,0.3)",
                  borderRadius: 8, color: ACCENT,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                View Post →
              </button>
              <Field
                label="Paste your retweet or quote link"
                value={quoteLink}
                onChange={v => { setQuoteLink(v); setErrors(e => ({ ...e, quoteLink: "" })); }}
                placeholder="https://x.com/..."
                error={errors.quoteLink}
              />
            </>
          ) : (
            <Field
              label="Paste your retweet or quote link"
              value={quoteLink}
              onChange={v => { setQuoteLink(v); setErrors(e => ({ ...e, quoteLink: "" })); }}
              placeholder="https://x.com/..."
              error={errors.quoteLink}
            />
          )}
        </TaskCard>
      )}

      {/* Step 4 — Comment & tag 2 frens */}
      {step4Visible && (
        <TaskCard delay={60}>
          <TaskHeader num="04" title="Comment & tag 2 frens" subtitle="Reply to the post and mention 2 people" done={commentDone} />
          {!commentDone ? (
            <>
              <button
                className="wl-task-btn"
                onClick={() => openAndMark(COMMENT_POST_URL, () => setCommentDone(true))}
                style={{
                  width: "100%", padding: "11px 0", marginBottom: 12,
                  background: "rgba(255,107,0,0.08)",
                  border: "1px solid rgba(255,107,0,0.3)",
                  borderRadius: 8, color: ACCENT,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                View Post →
              </button>
              <Field
                label="Paste your comment link"
                value={commentLink}
                onChange={v => { setCommentLink(v); setErrors(e => ({ ...e, commentLink: "" })); }}
                placeholder="https://x.com/..."
                error={errors.commentLink}
              />
            </>
          ) : (
            <Field
              label="Paste your comment link"
              value={commentLink}
              onChange={v => { setCommentLink(v); setErrors(e => ({ ...e, commentLink: "" })); }}
              placeholder="https://x.com/..."
              error={errors.commentLink}
            />
          )}
        </TaskCard>
      )}

      {/* Step 5 — Wallet */}
      {step5Visible && (
        <TaskCard delay={60}>
          <TaskHeader num="05" title="EVM Wallet Address" subtitle="This is where your Fox will land" done={false} />
          <Field
            label=""
            value={wallet}
            onChange={v => { setWallet(v); setErrors(e => ({ ...e, wallet: "" })); }}
            placeholder="0x..."
            error={errors.wallet}
          />
        </TaskCard>
      )}

      {/* Submit */}
      {step5Visible && (
        <div className="wl-task-card" style={{ animationDelay: "80ms", marginTop: 4 }}>
          {errors.submit && (
            <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{errors.submit}</p>
          )}
          <button
            className="wl-submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%", padding: "15px",
              background: ACCENT, borderRadius: 10,
              border: "none", color: "#000",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800, fontSize: 14,
              letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,107,0,0.25)",
            }}
          >
            {submitting ? "Submitting..." : "Secure My Spot"}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 10 }}>
            Double-check your wallet before submitting.
          </p>
        </div>
      )}

    </div>
  );
}
