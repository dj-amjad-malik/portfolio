import { Headphones, Radio, Disc3, Zap, Music2 } from "lucide-react";

const ServicesHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">

      {/* DJ Console Grid Pattern - Enhanced for Mobile */}
      <div className="absolute inset-0 opacity-[0.08] md:opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(220,38,127,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,38,127,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Mobile-Optimized Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] md:w-[800px] md:h-[400px] bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl" />

      {/* Mobile Floating Icons - Visible on Small Screens */}
      <div className="absolute top-16 right-6 opacity-15 md:hidden animate-float">
        <Music2 className="w-24 h-24 text-primary" style={{ animationDuration: '3s' }} />
      </div>

      <div className="absolute bottom-20 left-6 opacity-15 md:hidden animate-float" style={{ animationDelay: '1s' }}>
        <Zap className="w-20 h-20 text-secondary" style={{ animationDuration: '3.5s' }} />
      </div>

      {/* Desktop Floating Headphones Icon */}
      <div className="absolute top-20 right-20 opacity-10 hidden lg:block">
        <Headphones className="w-64 h-64 text-primary animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Vinyl Disc - Enhanced for Mobile */}
      <div className="absolute top-24 left-4 opacity-20 md:top-32 md:left-16 animate-spin-slow">
        <Disc3 className="w-32 h-32 md:w-48 md:h-48 text-secondary" />
      </div>

      {/* Radio Waves - Enhanced for Mobile */}
      <div className="absolute bottom-16 right-4 opacity-15 md:bottom-20 md:right-32 md:opacity-10 animate-pulse" style={{ animationDuration: '3s' }}>
        <Radio className="w-36 h-36 md:w-56 md:h-56 text-accent" />
      </div>

      {/* Animated Gradient Orbs - Mobile Optimized */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

      {/* Frequency Bars Background - Mobile Optimized */}
      <div className="absolute inset-0 flex items-end justify-center gap-1 pb-0 opacity-10 md:opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-2 md:w-3 bg-gradient-to-t from-primary via-secondary to-accent"
            style={{
              height: `${Math.random() * 100}%`,
              animation: `frequency-pulse ${0.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.02}s`
            }}
          />
        ))}
      </div>

      {/* Mobile Glow Effect Behind Text */}
      <div className="absolute inset-0 flex items-center justify-center md:hidden">
        <div className="w-[90%] h-[60%] rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-20 text-center py-16">

        {/* Main Title with Split Effect */}
        <div className="mb-8 animate-fade-in-up animation-delay-200">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-black mb-4 leading-[1.1]">
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-glow">
              CURATING
            </span>
            <span className="block text-foreground mt-2 drop-shadow-lg">
              SONIC
            </span>
            <span className="block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent drop-shadow-glow">
              EXPERIENCES
            </span>
          </h1>
        </div>

        {/* Subtitle - Enhanced for Mobile */}
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up animation-delay-300 px-4 md:px-0">
          Transforming events into unforgettable moments through <span className="text-primary font-semibold">masterful mixing</span> and <span className="text-secondary font-semibold">crowd connection</span>
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes frequency-pulse {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(220, 38, 127, 0.3));
        }

        /* Mobile-specific enhancements */
        @media (max-width: 768px) {
          .drop-shadow-glow {
            filter: drop-shadow(0 0 15px rgba(220, 38, 127, 0.4));
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesHero;