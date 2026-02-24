import { useEffect, useRef, useState } from "react";
import { Star, Quote, Disc3 } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "Kotak Mahindra Bank",
    event: "Corporate Annual Party",
    rating: 5,
    quote:
      "DJ Amjad made our corporate event unforgettable! His ability to read the crowd and keep everyone on their feet was incredible. Highly professional.",
  },
  {
    name: "Priya Reddy",
    company: "IBS Hyderabad",
    event: "College Festival",
    rating: 5,
    quote:
      "The energy he brought to our college fest was unmatched! Students were raving about it for weeks. Definitely booking him again next year.",
  },
  {
    name: "Vikram Patel",
    company: "BLVD Club",
    event: "Saturday Night Residency",
    rating: 5,
    quote:
      "Amjad is our go-to DJ for weekend nights. His tech house sets are fire and he always packs the dancefloor. True professional.",
  },
];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Floating micro-dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              animation: `ts-float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.2) % 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">

        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "ts-spin 8s linear infinite" }}
            />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              What Clients Say
            </span>
            <Disc3
              className="w-3.5 h-3.5 text-primary"
              style={{ animation: "ts-spin 8s linear infinite reverse" }}
            />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-2">
            Client Testimonials
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real events
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative glass-card rounded-2xl p-8 border border-border hover:glow-primary transition-all duration-500 hover:scale-[1.02] overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Hover inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 group-hover:border-primary/50 rounded-tl-lg transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/20 group-hover:border-secondary/50 rounded-br-lg transition-colors duration-300" />

              {/* Sweep shine */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

              {/* Quote icon */}
              <div className="mb-6 relative inline-block">
                <div
                  className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-cta flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-foreground/80 leading-relaxed mb-8 text-sm md:text-base italic font-light group-hover:text-foreground transition-colors duration-500">
                "{testimonial.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-current transition-transform duration-300 group-hover:scale-110"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-5 group-hover:via-primary/60 transition-all duration-500" />

              {/* Author */}
              <div className="space-y-1.5">
                <p className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {testimonial.company}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">
                    {testimonial.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex items-center gap-4 mt-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-primary/40 shadow-lg shadow-primary/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes ts-float {
          0%, 100% { transform: translateY(0) scale(1);       opacity: 0.2; }
          50%       { transform: translateY(-18px) scale(1.2); opacity: 0.5; }
        }
        @keyframes ts-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .glow-primary {
          box-shadow: 0 0 20px rgba(220, 38, 127, 0.15);
        }
        .glow-primary:hover {
          box-shadow: 0 0 30px rgba(220, 38, 127, 0.25);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
