import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Play, Pause, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";

const videoGallery = [
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771924051/v1_svfsxe.mp4", thumb: "assets/thumbnails/v1_thumb.jpg", orientation: "landscape" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771925623/v2_pds1sd.mp4", thumb: "assets/thumbnails/v2_thumb.png", orientation: "portrait" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923945/v3_rvhyst.mp4", thumb: "assets/thumbnails/v3_thumb.jpg", orientation: "landscape" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923909/v4_zyhte3.mp4", thumb: "assets/thumbnails/v4_thumb.jpg", orientation: "landscape" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771924062/v5_kivc9p.mp4", thumb: "assets/thumbnails/v5_thumb.jpg", orientation: "landscape" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923945/v6_e84h9i.mp4", thumb: "assets/thumbnails/v6_thumb.jpg", orientation: "portrait" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923996/v7_lzilms.mp4", thumb: "assets/thumbnails/v7_thumb.jpg", orientation: "portrait" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923878/v8_pw9hfq.mp4", thumb: "assets/thumbnails/v8_thumb.jpg", orientation: "portrait" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771923903/v9_q9cf1a.mp4", thumb: "assets/thumbnails/v9_thumb.jpg", orientation: "portrait" },
  { src: "https://res.cloudinary.com/dcglpl1qn/video/upload/v1771924089/v10_h63ivu.mp4", thumb: "assets/thumbnails/v10_thumb.jpg", orientation: "portrait" },
];

const LANDSCAPE_RATIO = 16 / 9;
const PORTRAIT_RATIO = 9 / 16;
const TARGET_H = 300;
const GAP = 3;
const MIN_H = 180;
const MAX_H = 440;

type GalleryItem = typeof videoGallery[0];

function buildRows(items: GalleryItem[], cw: number): { items: GalleryItem[]; height: number }[] {
  if (cw < 1) return [];

  const natW = (v: GalleryItem) =>
    v.orientation === "landscape" ? TARGET_H * LANDSCAPE_RATIO : TARGET_H * PORTRAIT_RATIO;

  const rows: { items: GalleryItem[]; height: number }[] = [];
  let i = 0;

  while (i < items.length) {
    let acc = 0;
    let j = i;
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

// ─── VideoCard ────────────────────────────────────────────────────────────────

// ✅ FIX 1: Added activeId and onPlay props
const VideoCard = ({
  video, index, width, height, activeId, onPlay,
}: {
  video: GalleryItem;
  index: number;
  width: number;
  height: number;
  activeId: number | null;         // ✅ FIX 1
  onPlay: (id: number | null) => void; // ✅ FIX 1
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showCtrl, setShowCtrl] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [inView, setInView] = useState(false);

  const ctrlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const fn = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    return () => document.removeEventListener("fullscreenchange", fn);
  }, []);

  // ✅ FIX 2: Pause this card when another becomes active
  useEffect(() => {
    if (activeId !== index && playing) {
      videoRef.current?.pause();
      setPlaying(false);
      setShowCtrl(true);
    }
  }, [activeId, index]);

  // ✅ FIX 3: Notify gallery when this card plays/pauses
  const togglePlay = () => {
    const v = videoRef.current; if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
      onPlay(null);          // release active lock
    } else {
      v.play().catch(() => {});
      setPlaying(true);
      onPlay(index);         // claim active lock
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current; if (!v) return;
    v.muted = !muted; setMuted(m => !m);
  };

  const toggleFs = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreen) {
      document.exitFullscreen?.();
    } else {
      containerRef.current?.requestFullscreen?.();
      setHovered(false);
    }
  };

  const onMove = () => {
    setShowCtrl(true);
    if (ctrlTimer.current) clearTimeout(ctrlTimer.current);
    if (playing) ctrlTimer.current = setTimeout(() => setShowCtrl(false), 2200);
  };

  const handleCanPlay = useCallback(() => setVideoReady(true), []);
  const ctrlVis = !playing || hovered || showCtrl;

  return (
    <div
      ref={containerRef}
      className="vg-card"
      style={{ width, height, flexShrink: 0 }}
      onMouseEnter={() => { setHovered(true); setShowCtrl(true); }}
      onMouseLeave={() => { setHovered(false); if (playing) setShowCtrl(false); }}
      onMouseMove={onMove}
      onClick={togglePlay}
    >
      <img
        src={video.thumb}
        alt=""
        aria-hidden="true"
        className="vg-thumb"
        style={{
          opacity: videoReady ? 0 : 1,
          filter: "saturate(0.48) brightness(0.7)",
          transform: !playing && hovered ? "scale(1.04)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />

      {inView && (
        <video
          ref={videoRef}
          src={video.src}
          loop
          playsInline
          muted={muted}
          preload="none"
          onCanPlay={handleCanPlay}
          // ✅ FIX 4: Also release active lock on video end
          onEnded={() => { setPlaying(false); setShowCtrl(true); onPlay(null); }}
          className="vg-video-el"
          style={{
            opacity: videoReady ? 1 : 0,
            filter: playing ? "brightness(0.93) saturate(1.04)" : "saturate(0.48) brightness(0.7)",
            transform: !playing && hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      )}

      <div className="vg-grad" style={{ opacity: ctrlVis ? 1 : 0 }} />
      <div className="vg-shimmer" style={{ opacity: hovered ? 1 : 0 }} />
      <div className="vg-corner tl" style={{ opacity: hovered ? 1 : 0 }} />
      <div className="vg-corner br" style={{ opacity: hovered ? 1 : 0 }} />

      <div className="vg-ctrl-row" style={{ opacity: ctrlVis ? 1 : 0 }} onClick={e => e.stopPropagation()}>
        {playing && (
          <button className="vg-btn" onClick={toggleMute}>
            {muted ? <VolumeX size={10} /> : <Volume2 size={10} />}
          </button>
        )}
        <button className="vg-btn" onClick={toggleFs}>
          {fullscreen ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
        </button>
      </div>

      <div
        className="vg-play-btn"
        style={{
          opacity: ctrlVis ? 1 : 0,
          transform: `translate(-50%,-50%) scale(${ctrlVis ? 1 : 0.7})`,
        }}
      >
        {playing
          ? <Pause size={16} fill="hsl(var(--foreground))" style={{ color: "hsl(var(--foreground))" }} />
          : <Play size={16} fill="hsl(var(--foreground))" style={{ color: "hsl(var(--foreground))", marginLeft: 3 }} />
        }
      </div>

      <div
        className="vg-border-ov"
        style={{
          borderColor: hovered ? "hsl(var(--secondary)/0.45)" : "transparent",
          boxShadow: hovered ? "inset 0 0 28px hsl(var(--secondary)/0.06)" : "none",
        }}
      />

      <span className="vg-idx" style={{ opacity: hovered && !playing ? 1 : 0 }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
};

const GlitchText = ({ children }: { children: string }) => (
  <span className="vg-glitch" data-text={children}>{children}</span>
);

// ─── Gallery ──────────────────────────────────────────────────────────────────

const VideoGallery = () => {
  const [visible, setVisible] = useState(false);
  const [containerW, setContainerW] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null); // ✅ FIX 5

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

  const rows = useMemo(() => buildRows(videoGallery, containerW), [containerW]);

  let gIdx = 0;

  return (
    <>
      <style>{`
        .vg-wrap::before {
          content:''; position:fixed; inset:-50%; width:200%; height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.022; pointer-events:none; z-index:200;
          animation:vg-grain .45s steps(2) infinite;
        }
        @keyframes vg-grain {
          0%,100%{transform:translate(0,0)}  20%{transform:translate(-1%,-2%)}
          40%{transform:translate(2%,1%)}    60%{transform:translate(-1%,2%)}
          80%{transform:translate(1%,-1%)}
        }

        .vg-scan {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px);
        }

        .vg-blob { position:absolute; border-radius:50%; filter:blur(70px); pointer-events:none; contain:strict; }
        .vg-blob-a {
          width:540px; height:540px; top:-120px; left:-80px;
          background:radial-gradient(circle,hsl(var(--secondary)/0.08) 0%,transparent 70%);
          animation:vg-bblob 9s ease-in-out infinite;
        }
        .vg-blob-b {
          width:480px; height:480px; bottom:-100px; right:-60px;
          background:radial-gradient(circle,hsl(var(--primary)/0.07) 0%,transparent 70%);
          animation:vg-bblob 12s ease-in-out infinite reverse;
        }
        @keyframes vg-bblob {
          0%,100%{transform:scale(1) translate(0,0)}
          50%{transform:scale(1.18) translate(12px,-14px)}
        }

        .vg-eyebrow {
          font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.45em;
          color:hsl(var(--secondary)); text-transform:uppercase; margin-bottom:12px;
          opacity:0; transform:translateY(10px);
          transition:opacity .55s ease, transform .55s ease;
        }
        .vg-eyebrow.on { opacity:1; transform:translateY(0); }

        .vg-h2 {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,8.5vw,96px);
          line-height:.88; letter-spacing:.045em; color:hsl(var(--foreground));
          opacity:0; transform:translateY(30px);
          transition:opacity .75s cubic-bezier(.16,1,.3,1) .08s,
                      transform .75s cubic-bezier(.16,1,.3,1) .08s;
        }
        .vg-h2.on { opacity:1; transform:translateY(0); }

        .vg-ghost {
          font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,8.5vw,96px);
          line-height:.88; letter-spacing:.045em; color:transparent;
          -webkit-text-stroke:1px hsl(var(--secondary)/0.28);
          opacity:0; transform:translateY(30px);
          transition:opacity .75s cubic-bezier(.16,1,.3,1) .18s,
                      transform .75s cubic-bezier(.16,1,.3,1) .18s;
        }
        .vg-ghost.on { opacity:1; transform:translateY(0); }

        .vg-rule {
          flex:1; height:1px;
          background:linear-gradient(90deg,hsl(var(--secondary)/0.5),transparent);
          opacity:0; transition:opacity .8s ease .35s;
        }
        .vg-rule.on { opacity:1; }

        .vg-glitch { position:relative; display:inline-block; }
        .vg-glitch::before,.vg-glitch::after {
          content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%;
        }
        .vg-glitch::before {
          left:2px; color:hsl(var(--secondary)/0.7); clip:rect(0,9999px,0,0);
          animation:vg-gl1 6s infinite linear alternate-reverse;
        }
        .vg-glitch::after {
          left:-2px; color:hsl(var(--primary)/0.7); clip:rect(0,9999px,0,0);
          animation:vg-gl2 6s infinite linear alternate-reverse;
        }
        @keyframes vg-gl1 {
          0%{clip:rect(14px,9999px,92px,0)} 10%{clip:rect(58px,9999px,26px,0)}
          20%{clip:rect(7px,9999px,39px,0)} 30%,100%{clip:rect(0,0,0,0)}
        }
        @keyframes vg-gl2 {
          0%{clip:rect(63px,9999px,97px,0)} 10%{clip:rect(39px,9999px,22px,0)}
          20%{clip:rect(76px,9999px,60px,0)} 30%,100%{clip:rect(0,0,0,0)}
        }

        .vg-justified {
          display:flex; flex-direction:column; gap:3px;
          opacity:0; transform:translateY(24px);
          transition:opacity .8s ease .18s, transform .8s ease .18s;
          contain:layout;
        }
        .vg-justified.on { opacity:1; transform:translateY(0); }
        .vg-row { display:flex; flex-direction:row; gap:3px; }

        .vg-card {
          position:relative; overflow:hidden; cursor:pointer;
          background:hsl(var(--background)); user-select:none;
          will-change:auto;
        }
        .vg-card:hover { will-change:transform; }
        .vg-card:fullscreen { width:100% !important; height:100% !important; }

        .vg-thumb {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; z-index:1;
          transition:opacity .4s ease, filter .38s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }

        .vg-video-el {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; z-index:2;
          transition:opacity .4s ease, filter .38s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }

        .vg-card:fullscreen .vg-video-el {
          object-fit:contain;
          background:#000;
          transform:none !important;
          filter:brightness(1) saturate(1) !important;
        }
        .vg-card:fullscreen .vg-thumb { display:none; }
        .vg-card:-webkit-full-screen .vg-video-el {
          object-fit:contain;
          background:#000;
          transform:none !important;
          filter:brightness(1) saturate(1) !important;
        }
        .vg-card:-webkit-full-screen .vg-thumb { display:none; }
        .vg-card:-moz-full-screen .vg-video-el {
          object-fit:contain;
          background:#000;
          transform:none !important;
        }
        .vg-card:-moz-full-screen .vg-thumb { display:none; }

        .vg-grad {
          position:absolute; inset:0; z-index:3; pointer-events:none;
          background:linear-gradient(to top,
            hsl(var(--background)/0.58) 0%, transparent 44%, hsl(var(--background)/0.1) 100%);
          transition:opacity .3s ease;
        }

        .vg-shimmer {
          position:absolute; top:0; left:0; right:0; height:1px; z-index:8;
          background:linear-gradient(90deg,transparent,hsl(var(--secondary)),transparent);
          transition:opacity .3s ease; pointer-events:none;
        }

        .vg-corner {
          position:absolute; width:11px; height:11px; z-index:7;
          transition:opacity .3s ease; pointer-events:none;
        }
        .vg-corner.tl {
          top:9px; left:9px;
          border-top:1px solid hsl(var(--secondary)/0.9);
          border-left:1px solid hsl(var(--secondary)/0.9);
        }
        .vg-corner.br {
          bottom:9px; right:9px;
          border-bottom:1px solid hsl(var(--secondary)/0.9);
          border-right:1px solid hsl(var(--secondary)/0.9);
        }

        .vg-ctrl-row {
          position:absolute; top:9px; right:9px; z-index:10;
          display:flex; align-items:center; gap:4px;
          transition:opacity .25s ease;
        }
        .vg-btn {
          width:24px; height:24px; border-radius:3px; cursor:pointer;
          background:hsl(var(--background)/0.65);
          border:1px solid hsl(var(--secondary)/0.28);
          color:hsl(var(--foreground)/0.65);
          display:flex; align-items:center; justify-content:center;
          backdrop-filter:blur(8px);
          transition:background .18s, border-color .18s, color .18s, box-shadow .18s;
        }
        .vg-btn:hover {
          background:hsl(var(--secondary)/0.22);
          border-color:hsl(var(--secondary)/0.65);
          color:hsl(var(--foreground));
          box-shadow:0 0 10px hsl(var(--secondary)/0.22);
        }

        .vg-play-btn {
          position:absolute; top:50%; left:50%; z-index:6;
          width:48px; height:48px; border-radius:50%;
          background:hsl(var(--background)/0.48);
          border:1px solid hsl(var(--secondary)/0.52);
          backdrop-filter:blur(12px);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 0 22px hsl(var(--secondary)/0.18);
          transition:opacity .28s ease,
                      transform .32s cubic-bezier(.34,1.56,.64,1),
                      background .2s, box-shadow .2s;
          pointer-events:none;
        }
        .vg-card:hover .vg-play-btn {
          background:hsl(var(--secondary)/0.16);
          border-color:hsl(var(--secondary)/0.8);
          box-shadow:0 0 34px hsl(var(--secondary)/0.28);
        }
        .vg-play-btn::after {
          content:''; position:absolute; inset:-9px; border-radius:50%;
          border:1px solid hsl(var(--secondary)/0.18);
          animation:vg-ring 2.2s ease-out infinite; opacity:0;
        }
        .vg-card:hover .vg-play-btn::after { opacity:1; }
        @keyframes vg-ring {
          0%{transform:scale(.82);opacity:.45} 100%{transform:scale(1.55);opacity:0}
        }

        .vg-border-ov {
          position:absolute; inset:0; z-index:8;
          border:1px solid transparent; pointer-events:none;
          transition:border-color .28s ease, box-shadow .28s ease;
        }

        .vg-idx {
          position:absolute; bottom:9px; right:11px; z-index:9;
          font-family:'Space Mono',monospace; font-size:8px;
          letter-spacing:.18em; color:hsl(var(--foreground)/0.16);
          transition:opacity .28s ease; pointer-events:none;
        }

        .vg-footer {
          display:flex; align-items:center; gap:14px;
          opacity:0; transition:opacity .8s ease .48s;
        }
        .vg-footer.on { opacity:1; }
        .vg-fbar {
          flex:1; height:1px;
          background:linear-gradient(90deg,transparent,hsl(var(--secondary)/0.22),transparent);
        }
        .vg-fcount {
          font-family:'Space Mono',monospace; font-size:9px;
          letter-spacing:.32em; color:hsl(var(--foreground)/0.18); text-transform:uppercase;
        }
        .vg-fdot {
          width:4px; height:4px; border-radius:50%;
          background:hsl(var(--secondary));
          box-shadow:0 0 7px hsl(var(--secondary));
          animation:vg-bdot 2.2s ease-in-out infinite 1.1s;
        }

        .vg-card:fullscreen .vg-grad { display:none; }
        .vg-card:fullscreen .vg-shimmer { display:none; }
        .vg-card:fullscreen .vg-corner { display:none; }
        .vg-card:fullscreen .vg-border-ov { display:none; }
        .vg-card:fullscreen .vg-idx { display:none; }
        .vg-card:-webkit-full-screen .vg-grad { display:none; }
        .vg-card:-webkit-full-screen .vg-shimmer { display:none; }
        .vg-card:-webkit-full-screen .vg-corner { display:none; }

        @keyframes vg-bdot { 0%,100%{opacity:1} 50%{opacity:.12} }
        html.is-scrolling .vg-wrap::before { animation-play-state:paused; }
        html.is-scrolling .vg-blob { animation-play-state:paused; }
        @media (max-width:768px) { .vg-justified,.vg-row { gap:2px !important; } }
        @media (max-width:480px) { .vg-justified,.vg-row { gap:2px !important; } }
      `}</style>

      <section ref={sectionRef} className="vg-wrap relative py-16 md:py-24 overflow-hidden bg-background">
        <div className="vg-scan" />
        <div className="vg-blob vg-blob-a" />
        <div className="vg-blob vg-blob-b" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">
          <div className="mb-12">
            <p className={`vg-eyebrow ${visible ? "on" : ""}`}>▸ Motion Reel</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "22px" }}>
              <h2 className={`vg-h2 ${visible ? "on" : ""}`}>
                <GlitchText>VIDEOS REELS</GlitchText>
              </h2>
              <div className={`vg-rule ${visible ? "on" : ""}`} />
            </div>
          </div>

          <div ref={gridRef} className={`vg-justified ${visible ? "on" : ""}`}>
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
                <div key={ri} className="vg-row">
                  {row.items.map((video) => {
                    const nat = video.orientation === "landscape"
                      ? row.height * LANDSCAPE_RATIO
                      : row.height * PORTRAIT_RATIO;
                    const w = Math.round(nat * sf);
                    const h = Math.round(row.height);
                    const idx = gIdx++;
                    return (
                      <VideoCard
                        key={idx}
                        video={video}
                        index={idx}
                        width={w}
                        height={h}
                        activeId={activeId}       // ✅ FIX 5
                        onPlay={setActiveId}      // ✅ FIX 5
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoGallery;
