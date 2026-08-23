// ── Fuxel mark (logo image with graceful fallback) ────────────────
export default function FuxelMark({ size = 56 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", flexShrink: 0,
    }}>
      <img
        src="/Fuxel-logo.jpg"
        alt="Fuxel"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent) parent.innerHTML = `<span style="font-size:${size * 0.42}px">🦊</span>`;
        }}
      />
    </div>
  );
}
