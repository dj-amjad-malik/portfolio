import { useEffect, useRef, useState, useMemo } from "react";
import { X, ZoomIn } from "lucide-react";

// Set orientation per image to match your actual photo dimensions
const galleryImages = [
  { src: "assets/photos/p1.jpeg", orientation: "landscape" },
  { src: "assets/photos/p2.jpeg", orientation: "portrait" },
  { src: "assets/photos/p3.jpeg", orientation: "landscape" },
  { src: "assets/photos/p4.jpeg", orientation: "landscape" },
  { src: "assets/photos/p5.jpeg", orientation: "landscape" },
  { src: "assets/photos/p6.jpg", orientation: "portrait" },
  { src: "assets/photos/p7.png", orientation: "portrait" },
  { src: "assets/photos/p8.jpeg", orientation: "landscape" },
  { src: "assets/photos/p9.jpeg", orientation: "portrait" },
  { src: "assets/photos/p10.jpeg", orientation: "landscape" },
  { src: "assets/photos/p11.jpeg", orientation: "portrait" },
  { src: "assets/photos/p12.jpeg", orientation: "landscape" },
  { src: "assets/photos/p13.jpg", orientation: "portrait" },
];

const LANDSCAPE_RATIO = 3 / 2;   // typical camera ~1.5 — adjust if yours differ
const PORTRAIT_RATIO = 2 / 3;   // ~0.667
const TARGET_H = 320;
const GAP = 3;
const MIN_H = 200;
const MAX_H = 480;

type PhotoItem = typeof galleryImages[0];

function buildRows(items: PhotoItem[], cw: number): { items: PhotoItem[]; height: number }[] {
  if (cw < 1) return [];
  const natW = (v: PhotoItem) =>
    v.orientation === "landscape" ? TARGET_H * LANDSCAPE_RATIO : TARGET_H * PORTRAIT_RATIO;

  const rows: { items: PhotoItem[]; height: number }[] = [];
  let i = 0;
  while (i < items.length) {
    let acc = 0, j = i;
    while (j < items.length) {
      acc += natW(items[j]) + (j > i ? GAP : 0);
      j++;
      if (acc >= cw) break;
    }
    const rowItems = items.slice(i, j);
    const totalGaps = (rowItems.length - 1) * GAP;
    const totalNat = rowItems.reduce((s, v) => s + natW(v), 0);
    const isLast = j >= items.length;
    const incomplete = isLast && (totalNat + totalGaps) / cw < 0.6;
    const h = incomplete
      ? Math.min(TARGET_H, MAX_H)
      : Math.max(MIN_H, Math.min(MAX_H, TARGET_H * ((cw - totalGaps) / totalNat)));
    rows.push({ items: rowItems, height: h });
    i = j;
  }
  return rows;
}

// ─── PhotoCard ────────────────────────────────────────────────────────────────

const PhotoCard = ({
  photo, index, width, height, onOpen,
}: {
  photo: PhotoItem; index: number; width: number; height: number;
  onOpen: (src: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pg-card"
      style={{ width, height, flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(photo.src)}
    >
      {/* Placeholder while loading */}
      <div className="pg-placeholder" style={{ opacity: loaded ? 0 : 1 }} aria-hidden="true" />

      {inView && (
        <img
          src={photo.src}
          alt=""
          aria-hidden="true"
          className="pg-img"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            filter: hovered ? "saturate(1.05) brightness(0.95)" : "saturate(0.52) brightness(0.75)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}

      <div className="pg-grad" style={{ opacity: hovered ? 1 : 0 }} />
      <div className="pg-shimmer" style={{ opacity: hovered ? 1 : 0 }} />
      <div className="pg-corner tl" style={{ opacity: hovered ? 1 : 0 }} />
      <div className="pg-corner br" style={{ opacity: hovered ? 1 : 0 }} />

      <div
        className="pg-zoom"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.7})`,
        }}
      >
        <ZoomIn size={15} style={{ color: "hsl(var(--foreground)/0.85)" }} />
      </div>

      <div
        className="pg-border-ov"
        style={{
          borderColor: hovered ? "hsl(var(--primary)/0.4)" : "transparent",
          boxShadow: hovered ? "inset 0 0 28px hsl(var(--primary)/0.05)" : "none",
        }}
      />

      <span className="pg-idx" style={{ opacity: hovered ? 1 : 0 }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
};

const GlitchText = ({ children }: { children: string }) => (
  <span className="pg-glitch" data-text={children}>{children}</span>
);

// ─── Gallery ──────────────────────────────────────────────────────────────────

const PhotoGallery = () => {
  const [visible, setVisible] = useState(false);
  const [containerW, setContainerW] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lbReady, setLbReady] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setLbReady(true), 10);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setLbReady(false);
    }
  }, [lightbox]);

  const openLightbox = (src: string) => { setLbReady(false); setLightbox(src); };
  const closeLightbox = () => setLightbox(null);

  const rows = useMemo(() => buildRows(galleryImages, containerW), [containerW]);

  let gIdx = 0;

  return (
    <>
      <style>{`

        .pg-wrap::before {
          content:''; position:fixed; inset:-50%; width:200%; height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.022; pointer-events:none; z-index:200;
          animation:pg-grain .45s steps(2) infinite;
        }
        @keyframes pg-grain {
          0%,100%{transform:translate(0,0)}  20%{transform:translate(-1%,-2%)}
          40%{transform:translate(2%,1%)}    60%{transform:translate(-1%,2%)}
          80%{transform:translate(1%,-1%)}
        }

        .pg-scan {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px);
        }

        .pg-blob { position:absolute; border-radius:50%; filter:blur(70px); pointer-events:none; contain:strict;}
        .pg-blob-a {
          width:600px; height:600px; top:-120px; right:-160px;
          background:radial-gradient(circle,hsl(var(--primary)/0.07) 0%,transparent 70%);
          animation:pg-bblob 9s ease-in-out infinite;
        }
        .pg-blob-b {
          width:500px; height:500px; bottom:-100px; left:-120px;
          background:radial-gradient(circle,hsl(var(--secondary)/0.06) 0%,transparent 70%);
          animation:pg-bblob 12s ease-in-out infinite reverse;
        }
        @keyframes pg-bblob {
          0%,100%{transform:scale(1) translate(0,0)}
          50%{transform:scale(1.18) translate(12px,-14px)}
        }

        /* Header */
        .pg-eyebrow {
          font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.45em;
          color:hsl(var(--primary)); text-transform:uppercase; margin-bottom:12px;
          opacity:0; transform:translateY(10px);
          transition:opacity .55s ease, transform .55s ease;
        }
        .pg-eyebrow.on { opacity:1; transform:translateY(0); }

        .pg-h2 {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,8.5vw,96px);
          line-height:.88; letter-spacing:.045em; color:hsl(var(--foreground));
          opacity:0; transform:translateY(30px);
          transition:opacity .75s cubic-bezier(.16,1,.3,1) .08s,
                      transform .75s cubic-bezier(.16,1,.3,1) .08s;
        }
        .pg-h2.on { opacity:1; transform:translateY(0); }

        .pg-ghost {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,8.5vw,96px);
          line-height:.88; letter-spacing:.045em; color:transparent;
          -webkit-text-stroke:1px hsl(var(--primary)/0.28);
          opacity:0; transform:translateY(30px);
          transition:opacity .75s cubic-bezier(.16,1,.3,1) .18s,
                      transform .75s cubic-bezier(.16,1,.3,1) .18s;
        }
        .pg-ghost.on { opacity:1; transform:translateY(0); }

        .pg-rule {
          flex:1; height:1px;
          background:linear-gradient(90deg,hsl(var(--primary)/0.5),transparent);
          opacity:0; transition:opacity .8s ease .35s;
        }
        .pg-rule.on { opacity:1; }

        .pg-glitch { position:relative; display:inline-block; }
        .pg-glitch::before,.pg-glitch::after {
          content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%;
        }
        .pg-glitch::before {
          left:2px; color:hsl(var(--primary)/0.7); clip:rect(0,9999px,0,0);
          animation:pg-gl1 6s infinite linear alternate-reverse;
        }
        .pg-glitch::after {
          left:-2px; color:hsl(var(--secondary)/0.7); clip:rect(0,9999px,0,0);
          animation:pg-gl2 6s infinite linear alternate-reverse;
        }
        @keyframes pg-gl1 {
          0%{clip:rect(14px,9999px,92px,0)} 10%{clip:rect(58px,9999px,26px,0)}
          20%{clip:rect(7px,9999px,39px,0)} 30%,100%{clip:rect(0,0,0,0)}
        }
        @keyframes pg-gl2 {
          0%{clip:rect(63px,9999px,97px,0)} 10%{clip:rect(39px,9999px,22px,0)}
          20%{clip:rect(76px,9999px,60px,0)} 30%,100%{clip:rect(0,0,0,0)}
        }

        /* Justified grid */
        .pg-justified {
          display:flex; flex-direction:column; gap:3px;
          opacity:0; transform:translateY(24px);
          transition:opacity .8s ease .18s, transform .8s ease .18s;
          contain:layout;
        }
        .pg-justified.on { opacity:1; transform:translateY(0); }
        .pg-row { display:flex; flex-direction:row; gap:3px; }

        /* Card */
        .pg-card {
          position:relative; overflow:hidden; cursor:pointer;
          background:hsl(var(--background)); user-select:none;
          will-change: auto;
        }
        
        .pg-card:hover { will-change: transform; }

        .pg-placeholder {
          position:absolute; inset:0; z-index:1;
          background:hsl(var(--background));
          transition:opacity .4s ease;
        }

        .pg-img {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; z-index:2;
          transition:opacity .4s ease, filter .38s ease, transform .75s cubic-bezier(.16,1,.3,1);
        }

        .pg-grad {
          position:absolute; inset:0; z-index:3; pointer-events:none;
          background:linear-gradient(to top,
            hsl(var(--background)/0.6) 0%, transparent 45%, hsl(var(--background)/0.08) 100%);
          transition:opacity .3s ease;
        }

        .pg-shimmer {
          position:absolute; top:0; left:0; right:0; height:1px; z-index:8;
          background:linear-gradient(90deg,transparent,hsl(var(--primary)),transparent);
          transition:opacity .3s ease; pointer-events:none;
        }

        .pg-corner {
          position:absolute; width:11px; height:11px; z-index:7;
          transition:opacity .3s ease; pointer-events:none;
        }
        .pg-corner.tl {
          top:9px; left:9px;
          border-top:1px solid hsl(var(--primary)/0.9);
          border-left:1px solid hsl(var(--primary)/0.9);
        }
        .pg-corner.br {
          bottom:9px; right:9px;
          border-bottom:1px solid hsl(var(--primary)/0.9);
          border-right:1px solid hsl(var(--primary)/0.9);
        }

        .pg-zoom {
          position:absolute; top:50%; left:50%; z-index:6;
          width:46px; height:46px; border-radius:50%;
          background:hsl(var(--background)/0.48);
          border:1px solid hsl(var(--primary)/0.52);
          backdrop-filter:blur(12px);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 0 22px hsl(var(--primary)/0.18);
          transition:opacity .28s ease,
                      transform .32s cubic-bezier(.34,1.56,.64,1),
                      background .2s, box-shadow .2s;
          pointer-events:none;
        }
        .pg-card:hover .pg-zoom {
          background:hsl(var(--primary)/0.14);
          border-color:hsl(var(--primary)/0.8);
          box-shadow:0 0 34px hsl(var(--primary)/0.26);
        }
        .pg-zoom::after {
          content:''; position:absolute; inset:-9px; border-radius:50%;
          border:1px solid hsl(var(--primary)/0.18);
          animation:pg-ring 2.2s ease-out infinite; opacity:0;
        }
        .pg-card:hover .pg-zoom::after { opacity:1; }
        @keyframes pg-ring {
          0%{transform:scale(.82);opacity:.45} 100%{transform:scale(1.55);opacity:0}
        }

        .pg-border-ov {
          position:absolute; inset:0; z-index:8;
          border:1px solid transparent; pointer-events:none;
          transition:border-color .28s ease, box-shadow .28s ease;
        }

        .pg-idx {
          position:absolute; bottom:9px; right:11px; z-index:9;
          font-family:'Space Mono',monospace; font-size:8px;
          letter-spacing:.18em; color:hsl(var(--foreground)/0.16);
          transition:opacity .28s ease; pointer-events:none;
        }

        /* Footer */
        .pg-footer {
          display:flex; align-items:center; gap:14px;
          opacity:0; transition:opacity .8s ease .48s;
        }
        .pg-footer.on { opacity:1; }
        .pg-fbar {
          flex:1; height:1px;
          background:linear-gradient(90deg,transparent,hsl(var(--primary)/0.22),transparent);
        }
        .pg-fcount {
          font-family:'Space Mono',monospace; font-size:9px;
          letter-spacing:.32em; color:hsl(var(--foreground)/0.18); text-transform:uppercase;
        }
        .pg-fdot {
          width:4px; height:4px; border-radius:50%;
          background:hsl(var(--primary));
          box-shadow:0 0 7px hsl(var(--primary));
          animation:pg-bdot 2.2s ease-in-out infinite 1.1s;
        }
        @keyframes pg-bdot { 0%,100%{opacity:1} 50%{opacity:.12} }

        /* Lightbox */
        .pg-lb {
          position:fixed; inset:0; z-index:1000;
          display:flex; align-items:center; justify-content:center; padding:32px;
          background:hsl(var(--background)/0.88);
          backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
          transition:opacity .25s ease;
        }
        .pg-lb-inner {
          position:relative; border-radius:3px; overflow:hidden;
          max-width:min(960px,94vw); max-height:90vh; width:100%;
          transition:transform .35s cubic-bezier(.34,1.56,.64,1);
          box-shadow:
            0 0 0 1px hsl(var(--primary)/0.2),
            0 0 80px hsl(var(--primary)/0.08),
            0 60px 120px rgba(0,0,0,0.75);
        }
        .pg-lb-tbar {
          position:absolute; top:0; left:0; right:0; height:1px; z-index:10;
          background:linear-gradient(90deg,transparent,hsl(var(--primary)),hsl(var(--secondary)),transparent);
        }
        .pg-lb-bbar {
          position:absolute; bottom:0; left:0; right:0; height:1px; z-index:10;
          background:linear-gradient(90deg,transparent,hsl(var(--secondary)/0.4),transparent);
        }
        .pg-lb-x {
          position:absolute; top:12px; right:12px; z-index:20;
          width:30px; height:30px; border-radius:2px;
          background:hsl(var(--background)/0.75);
          border:1px solid hsl(var(--primary)/0.3);
          color:hsl(var(--foreground)/0.7);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:all .2s ease; backdrop-filter:blur(8px);
        }
        .pg-lb-x:hover {
          background:hsl(var(--primary)/0.18); border-color:hsl(var(--primary));
          color:hsl(var(--foreground)); box-shadow:0 0 12px hsl(var(--primary)/0.3);
        }
        .pg-lb-tag {
          position:absolute; bottom:12px; left:12px; z-index:10;
          font-family:'Space Mono',monospace; font-size:8px;
          letter-spacing:.28em; color:hsl(var(--foreground)/0.18); text-transform:uppercase;
        }
        .pg-lb-img {
          display:block; width:100%; max-height:90vh;
          object-fit:contain; background:hsl(var(--background));
        }

        /* ✅ ADD — pause animations during scroll */
html.is-scrolling .pg-wrap::before { animation-play-state: paused; }
html.is-scrolling .pg-blob { animation-play-state: paused; }
        @media (max-width:768px) { .pg-justified,.pg-row { gap:2px !important; } }
        @media (max-width:480px) { .pg-lb { padding:12px; } }
      `}</style>

      <section ref={sectionRef} className="pg-wrap relative py-16 md:py-24 overflow-hidden bg-background">
        <div className="pg-scan" />
        <div className="pg-blob pg-blob-a" />
        <div className="pg-blob pg-blob-b" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">

          <div className="mb-12">
            <p className={`pg-eyebrow ${visible ? "on" : ""}`}>▸ Visual Archive</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "22px" }}>
              <h2 className={`pg-h2 ${visible ? "on" : ""}`}><GlitchText>GALLERY SHOTS</GlitchText></h2>
              <div className={`pg-rule ${visible ? "on" : ""}`} />
            </div>
          </div>

          <div ref={gridRef} className={`pg-justified ${visible ? "on" : ""}`}>
            {rows.map((row, ri) => {
              const totalGaps = (row.items.length - 1) * GAP;
              const totalNat = row.items.reduce(
                (s, v) => s + (v.orientation === "landscape"
                  ? row.height * LANDSCAPE_RATIO
                  : row.height * PORTRAIT_RATIO),
                0
              );
              const isLast = ri === rows.length - 1;
              const fillRatio = (totalNat + totalGaps) / containerW;
              const incomplete = isLast && fillRatio < 0.6;
              const sf = incomplete ? 1 : (containerW - totalGaps) / totalNat;

              return (
                <div key={ri} className="pg-row">
                  {row.items.map((photo) => {
                    const nat = photo.orientation === "landscape"
                      ? row.height * LANDSCAPE_RATIO
                      : row.height * PORTRAIT_RATIO;
                    const w = Math.round(nat * sf);
                    const h = Math.round(row.height);
                    const idx = gIdx++;
                    return (
                      <PhotoCard
                        key={idx}
                        photo={photo}
                        index={idx}
                        width={w}
                        height={h}
                        onOpen={openLightbox}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={`pg-footer mt-10 ${visible ? "on" : ""}`}>
            <div className="pg-fbar" />
            <div className="pg-fdot" />
            <span className="pg-fcount">{galleryImages.length} shots</span>
            <div className="pg-fdot" />
            <div className="pg-fbar" />
          </div>

        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="pg-lb"
            style={{ opacity: lbReady ? 1 : 0 }}
            onClick={closeLightbox}
          >
            <div
              className="pg-lb-inner"
              style={{ transform: lbReady ? "scale(1)" : "scale(0.92)" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="pg-lb-tbar" />
              <button className="pg-lb-x" onClick={closeLightbox}><X size={13} /></button>
              <img className="pg-lb-img" src={lightbox} alt="" />
              <div className="pg-lb-bbar" />
              <span className="pg-lb-tag">
                {String(galleryImages.findIndex(p => p.src === lightbox) + 1).padStart(2, "0")}
                {" / "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PhotoGallery;