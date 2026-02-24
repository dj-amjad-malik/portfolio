import { useEffect, useRef, useState } from "react";
import { Zap, Users, Music, Award, Clock, Headphones, Disc3 } from "lucide-react";

const allStrengths = [
  {
    icon: Zap,
    title: "High Energy Sets",
    description:
      "Electrifying performances that keep the crowd energized and moving from the first beat to the last drop. Every set is designed to create peak moments.",
  },
  {
    icon: Users,
    title: "Crowd Reading",
    description:
      "Exceptional ability to read the room and adapt music in real-time to the audience's energy and vibe, ensuring maximum engagement throughout.",
  },
  {
    icon: Music,
    title: "Genre Versatility",
    description:
      "Seamlessly blending Techhouse, Afro House, Hip Hop, Bollywood, and Tollywood to create unique, memorable experiences tailored to your event.",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    description:
      "500+ successful events with a reputation for reliability, punctuality, and flawless execution. Your event deserves nothing less than the best.",
  },
  {
    icon: Clock,
    title: "Perfect Timing",
    description:
      "Expert at building energy progressively throughout events, knowing exactly when to peak and when to let the crowd breathe.",
  },
  {
    icon: Headphones,
    title: "Premium Equipment",
    description:
      "Always performing with industry-standard Pioneer CDJ-3000/2000 setups, ensuring crystal-clear sound and seamless transitions.",
  },
];

const WhyChooseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false); // ← false until visible
  const ref = useRef<HTMLDivElement>(null);

  // Start auto-rotate ONLY when section comes into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          setAutoRotate(true); // ← starts here, not on page load
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % allStrengths.length),
      4000
    );
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    setAutoRotate(false);
    setTimeout(() => setAutoRotate(true), 10000);
  };

  const ActiveIcon = allStrengths[activeIndex].icon;

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

      {/* Rotating vinyl accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full rounded-full border-[35px] border-muted animate-spin"
          style={{ animationDuration: "20s" }}
        >
          {[10, 20, 30].map((m) => (
            <div
              key={m}
              className="absolute inset-0 rounded-full border border-muted-foreground/30"
              style={{ margin: `${m}px` }}
            />
          ))}
        </div>
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "wc-spin 8s linear infinite" }}
            />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              The Difference
            </span>
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "wc-spin 8s linear infinite reverse" }}
            />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-2">
            Why Choose Amjad
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience, dedication, and passion that sets every performance apart
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className={`
              group relative glass-card rounded-2xl p-8 md:p-10
              border border-border hover:glow-primary
              transition-all duration-700 overflow-hidden
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40" />

            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-secondary/30 rounded-tr-xl" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-accent/30 rounded-bl-xl" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-tertiary/30 rounded-br-xl" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-xl opacity-60 animate-pulse" />
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gradient-cta glow-primary flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    <ActiveIcon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {allStrengths[activeIndex].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {allStrengths[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-10">
          {allStrengths.map((strength, index) => {
            const Icon = strength.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => handleManualSelect(index)}
                className={`group relative transition-all duration-500 ${
                  isActive ? "scale-105" : "scale-100 hover:scale-105"
                }`}
                style={{
                  // ↓ Fix mobile yellow square
                  WebkitTapHighlightColor: "transparent",
                  outline: "none",
                  appearance: "none",
                  WebkitAppearance: "none",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? undefined : "translateY(20px)",
                  transition: `opacity 0.5s ease-out ${index * 80}ms, transform 0.5s ease-out ${
                    index * 80
                  }ms, scale 0.3s`,
                }}
              >
                {isActive && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-75 animate-pulse" />
                )}
                <div
                  className={`relative glass-card rounded-xl p-4 md:p-5 transition-all duration-300 ${
                    isActive ? "bg-gradient-cta glow-primary" : "hover:glow-primary"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 mx-auto mb-2 transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    strokeWidth={2}
                  />
                  <span
                    className={`block text-xs font-medium text-center transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {strength.title.split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress bar + pause/play */}
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-secondary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((activeIndex + 1) / allStrengths.length) * 100}%`,
              }}
            />
          </div>

          {/* ↓ Fixed pause button — no browser default styles */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            style={{
              WebkitTapHighlightColor: "transparent",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
            }}
            className="flex-shrink-0 px-4 py-2 rounded-lg glass-card hover:glow-primary border border-border transition-all text-xs font-medium text-muted-foreground focus:outline-none focus:ring-0 active:scale-95"
          >
            {autoRotate ? "⏸ Pause" : "▶ Play"}
          </button>

          <div className="text-xs text-muted-foreground font-medium min-w-[36px] text-right">
            {activeIndex + 1} / {allStrengths.length}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .glow-primary {
          box-shadow: 0 0 20px rgba(220, 38, 127, 0.15);
        }
        .glow-primary:hover {
          box-shadow: 0 0 30px rgba(220, 38, 127, 0.25);
        }
        /* ↓ Remove all browser default button focus styles globally for this section */
        button:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;
