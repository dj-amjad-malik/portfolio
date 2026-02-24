import { Calendar, Music, Users, Building, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Calendar,
    title: "Weddings & Receptions",
    description:
      "Make your special day unforgettable with perfectly curated music that matches every moment.",
    features: [
      "Ceremony music",
      "Reception sets",
      "Custom playlists",
      "MC services",
    ],
    duration: "4-8 hours",
    venues: "Taj, ITC, Marriott venues",
  },
  {
    icon: Building,
    title: "Corporate Events",
    description:
      "Professional entertainment for conferences, galas, and company celebrations.",
    features: [
      "Award ceremonies",
      "Product launches",
      "Team parties",
      "Brand events",
    ],
    duration: "3-6 hours",
    venues: "Conference halls, hotels",
  },
  {
    icon: Users,
    title: "Private Parties",
    description:
      "Birthdays, anniversaries, and special celebrations with personalized entertainment.",
    features: [
      "Birthday parties",
      "Anniversary events",
      "House parties",
      "Theme nights",
    ],
    duration: "3-5 hours",
    venues: "Private venues, farmhouses",
  },
  {
    icon: Music,
    title: "Club & Festival",
    description:
      "High-energy performances for nightclubs, festivals, and large-scale events.",
    features: [
      "Club residencies",
      "Festival sets",
      "Pool parties",
      "New Year events",
    ],
    duration: "4-8 hours",
    venues: "BLVD, Zega, Diablo",
  },
];

const ServicesGrid = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background (matches About / Stats vibe) */}
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

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              What I Offer
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4">
            Service Packages
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored entertainment solutions for every celebration
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="
                relative overflow-hidden
                glass-card rounded-2xl p-8 md:p-10
                transition-all duration-500
                hover:-translate-y-1
                bg-gradient-to-br from-background/60 to-background/30
                group
              "
              style={{
                animation: "fade-in-up 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Hover ambient gradient similar to StatsBar */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-500
                "
              >
                {/* soft radial gradient glow */}
                <div className="absolute -inset-10 bg-gradient-to-br from-primary/12 via-secondary/8 to-transparent blur-2xl" />
                {/* optional subtle dot texture on hover */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1.5px 1.5px, rgba(220,38,127,0.7) 1.5px, transparent 0)",
                    backgroundSize: "36px 36px",
                  }}
                />
              </div>

              {/* Card content */}
              <div className="relative z-10">
                {/* Icon and Title in One Line */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-cta flex items-center justify-center glow-pink group-hover:animate-pulse-glow flex-shrink-0">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary/20 rounded-full">
                    {service.duration}
                  </span>
                  <span className="px-3 py-1 bg-secondary/20 rounded-full">
                    {service.venues}
                  </span>
                </div>
                <a href="/booking" className="mt-6 inline-block">
                  <Button variant="outline-glow" size="sm">
                    Book This Service
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesGrid;
