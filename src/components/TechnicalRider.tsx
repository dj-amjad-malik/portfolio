import { useEffect, useRef, useState } from "react";
import { Volume2, Disc, Usb, CheckCircle, Disc3, Download } from "lucide-react";

const soundRequirements = [
  "Professional PA system",
  "DJ Booth Monitors ×1 pair",
  "Independent booth control",
  "Clean XLR to FOH",
];

const preferredSetups = [
  "Pioneer CDJ-3000 ×2 + DJM-900 Nexus / NXS2",
  "Pioneer CDJ-2000 Nexus / NXS2 ×2 + DJM-900",
  "Pioneer XDJ-XZ (Standalone USB preferred)",
];

const mediaRequirements = [
  "USB (FAT32 / exFAT)",
  "Rekordbox-analysed music",
  "WAV / AIFF / MP3 formats",
  "Laptop backup available",
];

const sections = [
  { icon: Volume2, title: "Sound Requirements", items: soundRequirements },
  { icon: Disc, title: "Preferred Console Setups", items: preferredSetups },
  { icon: Usb, title: "Media Requirements", items: mediaRequirements },
];

const TechnicalRider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

      {/* Dot grid */}
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

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl -translate-y-1/2 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">

        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "tr-spin 8s linear infinite" }}
            />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              Technical Requirements
            </span>
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "tr-spin 8s linear infinite reverse" }}
            />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-2">
            DJ Technical Rider
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Equipment and setup requirements for the best performance experience
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`group relative glass-card rounded-2xl p-8 md:p-10 border border-border hover:glow-primary transition-all duration-500 hover:scale-[1.02] overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 group-hover:border-primary/50 rounded-tl-lg transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/20 group-hover:border-secondary/50 rounded-br-lg transition-colors duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-cta flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {section.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tr-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .glow-primary { box-shadow: 0 0 20px rgba(220,38,127,0.15); }
        .glow-primary:hover { box-shadow: 0 0 30px rgba(220,38,127,0.25); }
      `}</style>
    </section>
  );
};

export default TechnicalRider;

