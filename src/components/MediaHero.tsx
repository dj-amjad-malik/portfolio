import { Camera } from "lucide-react";

const MediaHero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="assets/media-tech.avif"
          alt="Media Hero"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
        {/* Only bottom fade to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-5 md:px-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg">
            <Camera
              className="w-3.5 h-3.5 text-white"
              style={{ animation: "hero-spin 8s linear infinite" }}
            />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              Gallery & Technical
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Media & Tech
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="h-px w-16 bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="h-px w-10 bg-gradient-to-r from-white/40 to-transparent" />
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-white/75 max-w-lg mx-auto leading-relaxed">
            Gallery, press features, and technical requirements for venue coordinators
          </p>
        </div>
      </div>

      <style>{`
        @keyframes hero-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default MediaHero;
