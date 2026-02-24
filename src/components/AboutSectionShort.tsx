import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const AboutSectionShort = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">

        {/* ── Left — full-bleed image ── */}
        <div className="relative order-1 min-h-[400px] lg:min-h-full">
          <div className="absolute inset-0">
            <img
              src="assets/about.jpg"
              alt="Amjad Malik"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/60 lg:to-background/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Grid texture overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(220,38,127,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,127,0.5) 1px,transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Floating micro-dots */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${(i * 9.7) % 100}%`,
                  top: `${(i * 13.3) % 100}%`,
                  animation: `about-float ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.2) % 2}s`,
                }}
              />
            ))}
          </div>

          {/* Corner accent frame (shared pattern) */}
          <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-primary/40" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-secondary/40" />

          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* ── Right — content ── */}
        <div className="relative order-2 bg-card flex items-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

          {/* Dot grid texture (shared pattern) */}
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
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ top: `${10 + i * 18}%`, left: "-10%", right: "-10%", transform: "rotate(-6deg)" }}
              />
            ))}
          </div>

          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

          {/* Content */}
          <div
            className={`relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Section badge (shared pattern) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">About the Artist</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-gradient leading-tight py-2">
              Amjad Malik
            </h2>

            <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed mb-8">
              <p>
                <span className="text-primary font-semibold">Amjad Malik</span> is a highly experienced and dynamic DJ from{" "}
                <span className="text-primary font-semibold">Hyderabad, India</span>, who discovered his passion for music at{" "}
                <span className="text-primary font-semibold">Ramoji Film City</span>. With over{" "}
                <span className="text-primary font-semibold">500+ successful gigs</span>, he seamlessly blends Techhouse, Afro House, Hip Hop, Bollywood, and Tollywood.
              </p>
              <p>
                Renowned for his <span className="text-primary font-semibold">professionalism and dedication</span>, his exceptional ability to read the crowd delivers high-energy, unforgettable performances every time.
              </p>
            </div>

            {/* Quote */}
            <div className="relative mb-9">
              <div className="absolute -left-2 -top-6 text-7xl text-primary/20 font-serif leading-none select-none">"</div>
              <div className="relative pl-8 pr-6 py-5 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-l-4 border-primary rounded-r-2xl backdrop-blur-sm">
                <p className="text-sm md:text-base italic text-foreground/90 mb-3">
                  Every set is curated to build energy, create moments, and keep the dancefloor connected from start to finish.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-px bg-gradient-to-r from-primary to-transparent" />
                  <p className="font-accent font-semibold text-primary tracking-wide text-sm">Amjad Malik</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a href="/services-portfolio">
              <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 text-primary font-semibold hover:border-primary/60 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2">
                <span className="relative z-10">View Full Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes about-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50%       { transform: translateY(-25px) scale(1.2); opacity: 0.55; }
        }
      `}</style>
    </section>
  );
};

export default AboutSectionShort;
