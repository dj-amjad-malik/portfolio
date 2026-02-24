import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";

const ServicesCTA = () => {
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
    <section ref={ref} className="relative py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

      <div
        className={`relative z-10 max-w-5xl mx-auto px-5 md:px-20 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold heading-gradient mb-6 leading-tight py-2">
          Ready to Book Your Event?
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's create an unforgettable experience tailored to your event.
        </p>

        {/* Primary Button */}
        <div className="flex items-center justify-center mb-8">
          <a href="/booking">
            <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center gap-2 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Book Your Event
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </a>
        </div>

        {/* Secondary Link */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Want to see more?</span>
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <a
            href="/media-tech"
            className="text-primary/80 hover:text-primary font-medium hover:underline underline-offset-4 transition-colors duration-200 flex items-center gap-1 group"
          >
            View Media & Tech Setup
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
