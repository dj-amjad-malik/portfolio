import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, Music2 } from "lucide-react";

const CTASection = () => {
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
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
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
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${10 + i * 18}%`,
              left: "-10%",
              right: "-10%",
              transform: "rotate(-6deg)",
            }}
          />
        ))}
      </div>

      {/* Large center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse-glow" />

      {/* Side orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Floating micro-dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            style={{
              left: `${(i * 9.7) % 100}%`,
              top: `${(i * 13.3) % 100}%`,
              animation: `cta-float ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.2) % 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-20 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-8 shadow-lg shadow-primary/5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <Music2
            className="w-3.5 h-3.5 text-primary"
            style={{ animation: "cta-spin 6s linear infinite" }}
          />
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            Available for Bookings
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold heading-gradient mb-6 leading-tight py-2 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          Ready to Create Magic?
        </h2>

        {/* Decorative divider */}
        <div
          className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
          <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
        </div>

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          Let's make your next event unforgettable. Book Amjad Malik and experience the
          difference of a truly professional performance.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-14 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Primary */}
          <a href="/booking">
            <button className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base flex items-center gap-2 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Book Your Event
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </a>

          {/* Secondary */}
          <a href="/services-portfolio">
            <button className="group px-9 py-4 rounded-full border-2 border-primary/40 text-primary font-bold hover:border-primary/70 hover:bg-primary/5 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              View Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

        {/* Trust Indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {["500+ Events", "Quick Response", "Flexible Pricing", "Professional Setup"].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/70" />
                </span>
                {item}
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes cta-float {
          0%, 100% { transform: translateY(0) scale(1);       opacity: 0.2; }
          50%       { transform: translateY(-20px) scale(1.2); opacity: 0.5; }
        }
        @keyframes cta-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
