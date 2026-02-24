import { useEffect, useRef, useState, useCallback } from "react";
import { Music2, Radio, Disc3, Volume2, Play, Pause } from "lucide-react";

const musicStyles = [
  {
    name: "Tech House",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    icon: Music2,
    description: "Deep grooves & hypnotic beats",
    audio: "/audio/tech-house.mp3",
  },
  {
    name: "Afro House",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    icon: Radio,
    description: "Rhythmic percussion & energy",
    audio: "/audio/afro-house.mp3",
  },
  {
    name: "Hip Hop",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    icon: Disc3,
    description: "Urban beats & lyrical flow",
    audio: "/audio/hip-hop.mp3",
  },
  {
    name: "Bollywood",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    icon: Music2,
    description: "Vibrant melodies & dance",
    audio: "/audio/bollywood.mp3",
  },
  {
    name: "Tollywood",
    image: "https://images.unsplash.com/photo-1542628682-88321d2a4828?q=80&w=800&auto=format&fit=crop",
    icon: Radio,
    description: "Regional rhythms & culture",
    audio: "/audio/tollywood.mp3",
  },
  {
    name: "Commercial",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
    icon: Disc3,
    description: "Crowd-pleasing favourites",
    audio: "/audio/commerical.mp3",
  },
];

const MusicStylesVisual = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [progress, setProgress] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rotRafRef = useRef<number | null>(null);
  const progRafRef = useRef<number | null>(null);

  const clearAll = useCallback(() => {
    if (rotRafRef.current) {
      cancelAnimationFrame(rotRafRef.current);
      rotRafRef.current = null;
    }
    if (progRafRef.current) {
      cancelAnimationFrame(progRafRef.current);
      progRafRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingIndex(null);
    setProgress(0);
    clearAll();
  }, [clearAll]);

  const handlePlay = useCallback(
    (index: number) => {
      // Pause if same card clicked
      if (playingIndex === index) {
        stopAudio();
        return;
      }

      // Stop any currently playing
      stopAudio();

      const newAudio = new Audio(musicStyles[index].audio);
      newAudio.volume = 0.6;
      newAudio.preload = "metadata";
      audioRef.current = newAudio;
      setPlayingIndex(index);

      newAudio
        .play()
        .then(() => {
          // Vinyl rotation animation
          const rotate = () => {
            setRotation((prev) => (prev + 3) % 360);
            rotRafRef.current = requestAnimationFrame(rotate);
          };
          rotRafRef.current = requestAnimationFrame(rotate);

          // Progress bar animation
          const updateProgress = () => {
            if (newAudio.duration) {
              setProgress((newAudio.currentTime / newAudio.duration) * 100);
            }
            if (!newAudio.paused && !newAudio.ended) {
              progRafRef.current = requestAnimationFrame(updateProgress);
            }
          };
          progRafRef.current = requestAnimationFrame(updateProgress);
        })
        .catch((err) => {
          console.error("Audio play failed:", err);
          // Still show visual playing state
          const rotate = () => {
            setRotation((prev) => (prev + 3) % 360);
            rotRafRef.current = requestAnimationFrame(rotate);
          };
          rotRafRef.current = requestAnimationFrame(rotate);
        });

      // Auto-reset when track ends
      newAudio.addEventListener("ended", stopAudio, { once: true });
    },
    [playingIndex, stopAudio]
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);

    return () => {
      obs.disconnect();
      clearAll();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearAll]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, rgba(220,38,127,0.8) 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Diagonal stripes */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.025] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${8 + i * 16}%`,
              left: "-10%",
              right: "-10%",
              transform: "rotate(-6deg)",
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "music-spin 8s linear infinite" }}
            />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              Musical Expertise
            </span>
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "music-spin 8s linear infinite reverse" }}
            />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-2">
            Music Styles
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Click any card to preview each genre's signature vibe
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 max-w-6xl mx-auto">
          {musicStyles.map((style, index) => {
            const isHovered = hoveredIndex === index;
            const isPlaying = playingIndex === index;

            return (
              <div
                key={style.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handlePlay(index)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Outer glow */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent rounded-3xl blur-2xl transition-all duration-500 ${
                    isPlaying
                      ? "opacity-100 scale-110"
                      : isHovered
                      ? "opacity-70 scale-105"
                      : "opacity-0 scale-100"
                  }`}
                />

                {/* Card */}
                <div
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isPlaying
                      ? "border-primary shadow-2xl shadow-primary/40 scale-105"
                      : isHovered
                      ? "border-primary/60 shadow-xl shadow-primary/20"
                      : "border-primary/20 shadow-lg"
                  }`}
                >
                  {/* BG image */}
                  <div className="absolute inset-0">
                    <img
                      src={style.image}
                      alt={style.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered || isPlaying ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 transition-opacity duration-500 ${
                        isHovered || isPlaying ? "opacity-90" : "opacity-70"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-primary/40 mix-blend-overlay transition-opacity duration-500 ${
                        isHovered || isPlaying ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Vinyl rings when playing */}
                  {isPlaying && (
                    <div
                      className="absolute inset-8 rounded-full border-4 border-primary/30 opacity-30"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 rounded-full border border-primary/20"
                          style={{ margin: `${i * 6}px` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Card content */}
                  <div className="relative h-full flex flex-col justify-between p-5 md:p-6">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center transition-all duration-500 ${
                          isHovered || isPlaying ? "bg-primary/30 scale-110" : ""
                        }`}
                      >
                        <style.icon className="w-6 h-6 text-white" />
                      </div>

                      {isPlaying && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary backdrop-blur-sm animate-pulse">
                          <Volume2 className="w-3.5 h-3.5 text-white" />
                          <span className="text-xs font-bold text-white">LIVE</span>
                        </div>
                      )}
                    </div>

                    {/* Center play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`transition-all duration-500 ${
                          isHovered || isPlaying
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75"
                        }`}
                      >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                          {isPlaying ? (
                            <Pause className="w-10 h-10 text-white" />
                          ) : (
                            <Play className="w-10 h-10 text-white ml-1" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Equalizer bars when playing */}
                    {isPlaying && (
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 items-end h-10">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-2 bg-gradient-to-t from-primary to-white rounded-full"
                            style={{
                              animation: "music-eq-wave 0.6s ease-in-out infinite",
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Bottom text */}
                    <div>
                      <h3
                        className={`font-bold text-xl md:text-2xl text-white mb-1 transition-all duration-300 ${
                          isHovered || isPlaying
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-90"
                        }`}
                      >
                        {style.name}
                      </h3>
                      <p
                        className={`text-sm text-white/80 transition-all duration-500 ${
                          isHovered || isPlaying
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        {style.description}
                      </p>

                      {/* Progress bar */}
                      {isPlaying && (
                        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-white rounded-full transition-none"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Diagonal hover shine */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-500 pointer-events-none overflow-hidden ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: "translateX(-100%) rotate(45deg)" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes music-eq-wave {
          0%, 100% { height: 20%; }
          50%       { height: 100%; }
        }
        @keyframes music-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default MusicStylesVisual;
