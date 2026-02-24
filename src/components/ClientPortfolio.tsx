import { useEffect, useRef, useState } from "react";
import { Building, GraduationCap, Music, Sparkles } from "lucide-react";

const corporateClients = [
  "Kotak Mahindra Bank",
  "Accenture Hyderabad",
  "ACC Cement",
  "Fybro's",
  "Times of India",
  "Workafella",
  "State Bank of India",
  "UltraTech Cement",
  "Tech Mahindra",
  "Wild Waters",
  "Ramoji Film City",
];

const collegeClients = [
  "IBS Hyderabad",
  "University of Hyderabad",
  "Vignan Bharati Institute",
  "Sardar Vallabhbhai Patel Police Academy",
  "Sri Sai College of Dental",
  "St. Peter's College",
  "NMIMS Hyderabad",
];

const clubClients = [
  "BLVD Club",
  "Xenia Cafe Lounge",
  "Bounce",
  "Zega",
  "Sheraton",
  "Absorb",
  "OTM.in",
  "Toast & Tonic Pub",
  "Amigos Bar & Kitchen",
  "Grease Monkey",
  "Diablo",
  "FOT (Front On Top)",
  "Nouba",
  "Night Owl",
];

const categories = [
  { icon: Building, title: "Corporate Events", clients: corporateClients },
  { icon: GraduationCap, title: "College Events", clients: collegeClients },
  { icon: Music, title: "Club & Lounge", clients: clubClients },
];

const ClientPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">

        {/* ── Section Header (all second-version elements kept) ── */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-6 shadow-lg shadow-primary/5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              Trusted by the Best
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-2">
            Client Portfolio
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Proud to have performed at some of the most prestigious venues and events
          </p>
        </div>

        {/* ── Categories Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-8">
          {categories.map((category, catIndex) => {
            const Icon = category.icon;

            return (
              <div
                key={catIndex}
                className={`group relative glass-card rounded-2xl p-8 md:p-10 border border-border bg-background/60 transition-all duration-500 hover:scale-[1.02] hover:glow-primary overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${catIndex * 120}ms` }}
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 group-hover:border-primary/50 rounded-tl-lg transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/20 group-hover:border-secondary/50 rounded-br-lg transition-colors duration-300" />

                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative flex-shrink-0">
                    {/* Icon glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    {/* Icon container — first version style */}
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-cta flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Client Tags — first version text colors */}
                <div className="flex flex-wrap gap-2">
                  {category.clients.map((client, tagIndex) => (
                    <span
                      key={client}
                      className="px-4 py-2 rounded-lg text-sm bg-secondary/5 border border-border text-foreground/80 transition-all duration-300 hover:bg-secondary/10 hover:border-primary/30 hover:text-foreground hover:scale-105 cursor-default"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.4s ease-out ${catIndex * 100 + tagIndex * 30}ms`,
                      }}
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="flex items-center gap-4 mt-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-primary/40 shadow-lg shadow-primary/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
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

export default ClientPortfolio;
