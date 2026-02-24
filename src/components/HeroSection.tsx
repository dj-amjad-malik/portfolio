import { useEffect, useState } from "react";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const genres = ["TECHHOUSE", "AFRO HOUSE", "HIP HOP", "BOLLYWOOD", "TOLLYWOOD"];

// Particle component for background effect
const Particle = ({ delay }: { delay: number }) => {
  const randomLeft = Math.random() * 100;
  const randomSize = Math.random() * 8 + 4;
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-tertiary"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`absolute rounded-full ${randomColor} opacity-60`}
      style={{
        left: `${randomLeft}%`,
        bottom: "-20px",
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        animation: `particle-float 10s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

// Sound wave bars animation
const SoundWave = ({ delay }: { delay: number }) => {
  return (
    <div
      className="w-1 bg-gradient-to-t from-primary via-secondary to-accent rounded-full"
      style={{
        animation: `wave 1.5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const HeroSection = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Reduced delay intervals for faster particle appearance
    setParticles(Array.from({ length: 30 }, (_, i) => i * 0.2));
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />

      {/* Animated mesh overlay for depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,127,0.3),transparent_50%)] animate-pulse-glow" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.3),transparent_50%)] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.3),transparent_50%)] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/90" />

      {/* Decorative Circles with enhanced glow */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      {/* Sound wave visualizer - left side */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex gap-2 h-32 items-end opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <SoundWave key={i} delay={i * 0.1} />
        ))}
      </div>

      {/* Sound wave visualizer - right side */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex gap-2 h-32 items-end opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <SoundWave key={i} delay={i * 0.1 + 0.05} />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((delay, i) => (
          <Particle key={i} delay={delay} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-20 pt-32 md:pt-40 pb-32 md:pb-40 text-center">
        {/* Main Heading - fixed overflow */}
        <h1 className="heading-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] mb-6 animate-fade-in-up leading-[1.1] py-4 overflow-visible font-heading font-bold">
          Amjad Malik
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-body mb-10 animate-fade-in-up animation-delay-200">
          Hyderabad's Premier DJ | <span className="text-primary">500+</span> Successful Gigs
        </p>

        {/* Genre Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 animate-fade-in-up animation-delay-300">
          {genres.map((genre) => (
            <span key={genre} className="genre-pill text-xs md:text-sm">
              {genre}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in-up animation-delay-400">
          <a href="/booking">
            <Button variant="cta" size="xl" className="group">
              Book Your Event
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <Link to="/media-tech">
            <Button variant="outline-glow" size="xl" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Media & Tech
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary opacity-70 hover:opacity-100 transition-opacity animate-bounce-subtle"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      {/* CSS for animations */}
      <style>{`
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes wave {
          0%, 100% {
            height: 20px;
          }
          50% {
            height: 100px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
