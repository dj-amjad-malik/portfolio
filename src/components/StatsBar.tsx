import { useEffect, useRef, useState } from "react";
import { Calendar, Users, MapPin, Trophy } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "Events", icon: Calendar },
  { value: 50, suffix: "+", label: "Clients", icon: Users },
  { value: 20, suffix: "+", label: "Venues", icon: MapPin },
  { value: 10, suffix: "+", label: "Years", icon: Trophy },
];

const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let frame: number;
    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({
  value, suffix, label, delay, isVisible,
  icon: Icon,
}: {
  value: number; suffix: string; label: string;
  delay: number; isVisible: boolean; icon: React.ElementType;
}) => {
  const count = useCountUp(value, 2000, isVisible);
  return (
    <div className="text-center group cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
      {/* Icon with orbit ring */}
      <div className="relative inline-flex mb-5">
        {/* Orbit dashed ring */}
        <div
          className="absolute -inset-3 rounded-full border border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300"
          style={{ animation: isVisible ? "stats-orbit 10s linear infinite" : "none" }}
        />
        {/* Pulse ring on reveal */}
        {isVisible && (
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
        )}
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-50 transition-opacity duration-300" />
        {/* Icon container */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/60 transition-all duration-300">
          <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
        </div>
      </div>

      {/* Number */}
      <div className="stat-number text-4xl sm:text-5xl md:text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {count}{suffix}
      </div>

      {/* Label */}
      <div className="font-accent text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors duration-300">
        {label}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-[2px] w-full bg-secondary/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          style={{
            width: isVisible ? "100%" : "0%",
            transition: "width 1.2s ease-out",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const StatsBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative z-20 -mt-16 md:-mt-20 px-5 md:px-20 mb-16 md:mb-24">
      {/* Ambient glow behind card */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
      >
        {/* Top/bottom decorative gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />

        {/* Corner accents (shared pattern) */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-secondary/30 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/30 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-tertiary/30 rounded-br-xl" />

        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1.5px 1.5px, rgba(220,38,127,0.8) 1.5px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        {/* Inner floating micro-dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/25 rounded-full"
              style={{
                left: `${(i * 5.3) % 100}%`,
                top: `${(i * 7.1) % 100}%`,
                animation: `stats-float ${3 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.15) % 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              <StatItem {...stat} delay={i * 120} isVisible={isVisible} />
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes stats-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50%       { transform: translateY(-20px) translateX(8px); opacity: 0.7; }
        }
        @keyframes stats-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StatsBar;
