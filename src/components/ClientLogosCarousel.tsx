import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const allClients = [
  { name: "Kotak Mahindra Bank", logo: "https://brandlogos.net/wp-content/uploads/2022/04/kotak_mahindra_bank-logo-brandlogos.net_.png" },
  { name: "Accenture", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzLNUo1hLlXy0jXmo4yfJHzvUwPC2JnNWToQ&s" },
  { name: "Tech Mahindra", logo: "https://etedge-insights.com/wp-content/uploads/2025/10/TM_Logo_Color_Pos_RGB.jpg" },
  { name: "Ramoji Film City", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfqABjhLwE-H_lDOA05gLOcsxx1r7j_JNdbQ&s" },
  { name: "IBS Hyderabad", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtInC3MiUKVGqFeM_s3Z95Jsly0Fif1w7dTw&s" },
  { name: "NMIMS Hyderabad", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwoCLzq7oepNVCwTkOirP5tDZx12LOR4Id0Q&s" },
  { name: "Xenia Cafe Lounge", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-Fm9m-YDf1SnMs2Yl0OLLJ-AauRqYOyHmw&s" },
  { name: "Zega", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtxBLrZis32j30LDCvgzDMP6nfmBfIYttCw&s" },
  { name: "Sheraton", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAJ7T4LkRwspjNFD_lGVIwOxVGWwOIsUPqg&s" },
  { name: "Times of India", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStg6KGL9c11WQf5zWoe0R7ChBnR8MZLfv0vQ&s" },
  { name: "State Bank of India", logo: "https://wordzz.com/wp-content/uploads/2016/10/sbi.jpg" },
  { name: "UltraTech Cement", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Ultratech_Cement_Logo.svg/1280px-Ultratech_Cement_Logo.svg.png" },
  { name: "University of Hyderabad", logo: "https://upload.wikimedia.org/wikipedia/ta/9/9e/University_of_Hyderabad_Logo.png" },
  { name: "Toast & Tonic Pub", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_PmROyS3MdddN8mOEb6mE7uO9__YdYBX6WQ&s" },
  { name: "Diablo", logo: "https://content.jdmagicbox.com/comp/indore/r2/0731px731.x731.221112170505.u3r2/catalogue/diablo-indore-pubs-p59o3zbdfl.jpg" },
  { name: "ACC Cement", logo: "https://etimg.etb2bimg.com/photo/122878619.cms" },
  { name: "Fybros", logo: "https://media.licdn.com/dms/image/v2/C510BAQEB-Nt78wOCnQ/company-logo_200_200/company-logo_200_200/0/1630570751367/fybros_kundancab_logo" },
];

const LogoCard = ({
  client, id, glowFrom, glowTo, hoveredIndex, setHoveredIndex,
}: {
  client: { name: string; logo: string };
  id: string;
  glowFrom: string;
  glowTo: string;
  hoveredIndex: string | null;
  setHoveredIndex: (v: string | null) => void;
}) => (
  <div
    className="flex-shrink-0 group relative cursor-pointer"
    onMouseEnter={() => setHoveredIndex(id)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    {/* Outer glow blur */}
    <div
      className={`absolute -inset-[3px] bg-gradient-to-br ${glowFrom} rounded-[18px] opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`}
    />
    {/* Sharp border glow */}
    <div
      className={`absolute -inset-px bg-gradient-to-br ${glowTo} rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />

    {/* Card */}
    <div className="logo-card relative rounded-[15px] bg-background/90 backdrop-blur-md border border-white/8 group-hover:border-transparent transition-all duration-300 shadow-xl shadow-black/20">
      <div className="absolute inset-0 rounded-[15px] overflow-hidden">
        <img
          src={client.logo}
          alt={client.name}
          className="w-full h-full object-contain p-3 opacity-80 group-hover:opacity-100 transition-all duration-500"
        />
        {/* Sweep shine */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
      </div>
      {/* Name on hover */}
      <div className="absolute bottom-0 left-0 right-0 rounded-b-[15px] overflow-hidden">
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pt-3 pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-[9px] sm:text-[10px] font-semibold truncate text-center leading-tight">
            {client.name}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ClientLogosCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const row1 = allClients.slice(0, 9);
  const row2 = allClients.slice(9);

  return (
    <section ref={ref} className="relative py-16 md:py-28 lg:py-32 overflow-hidden">
      {/* Background — slightly different from MusicStyles to give rhythm */}
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

      {/* Diagonal stripes (shared pattern) */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.025] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${8 + i * 16}%`, left: "-10%", right: "-10%", transform: "rotate(-6deg)" }}
          />
        ))}
      </div>

      {/* Glow orbs (shared pattern) */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/8 blur-[120px] animate-pulse-glow"
      />
      <div
        className="absolute bottom-[-80px] left-[-80px] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-secondary/8 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-20">

        {/* ── Header ── */}
        <div
          className={`text-center mb-10 md:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Section badge (shared pattern) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm mb-5 shadow-lg shadow-primary/5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Trusted Partnerships</span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient mb-4 leading-tight py-1">
            Leading Brands & Venues
          </h2>

          {/* Decorative divider (shared pattern) */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-secondary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <div className="h-px w-10 bg-gradient-to-r from-secondary/50 to-transparent" />
          </div>

          <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-2">
            Delivering exceptional performances for prestigious organisations and venues across India
          </p>
        </div>

        {/* ── Row 1 (left-scroll) ── */}
        <div className="relative overflow-hidden mb-3 sm:mb-4">
          <div className="absolute left-0 top-0 bottom-0 cl-mask-left  z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 cl-mask-right z-10 pointer-events-none" />
          <div
            className={`flex gap-3 sm:gap-4 md:gap-5 cl-scroll-r1 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {[...row1, ...row1].map((client, i) => (
              <LogoCard
                key={`r1-${i}`}
                id={`r1-${i}`}
                client={client}
                glowFrom="from-primary/40 via-secondary/30 to-accent/40"
                glowTo="from-primary/60 to-secondary/60"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>

        {/* ── Row 2 (right-scroll) ── */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 cl-mask-left  z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 cl-mask-right z-10 pointer-events-none" />
          <div
            className={`flex gap-3 sm:gap-4 md:gap-5 cl-scroll-r2 transition-opacity duration-700 delay-150 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {[...row2, ...row2].map((client, i) => (
              <LogoCard
                key={`r2-${i}`}
                id={`r2-${i}`}
                client={client}
                glowFrom="from-secondary/40 via-accent/30 to-primary/40"
                glowTo="from-secondary/60 to-accent/60"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>

        {/* Bottom accent (shared pattern) */}
        <div className="flex items-center gap-4 mt-8 md:mt-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-primary/40 shadow-lg shadow-primary/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      </div>

      <style>{`
        /* Card sizes */
        .logo-card                        { width: 108px; height: 68px;  }
        @media (min-width: 480px)  { .logo-card { width: 136px; height: 86px;  } }
        @media (min-width: 768px)  { .logo-card { width: 170px; height: 106px; } }
        @media (min-width: 1024px) { .logo-card { width: 208px; height: 128px; } }

        /* Gradient masks */
        .cl-mask-left  { width: 28px;  background: linear-gradient(to right, var(--color-card, #1a1a2e), transparent); }
        .cl-mask-right { width: 28px;  background: linear-gradient(to left,  var(--color-card, #1a1a2e), transparent); }
        @media (min-width: 480px)  { .cl-mask-left,.cl-mask-right { width: 56px;  } }
        @media (min-width: 768px)  { .cl-mask-left,.cl-mask-right { width: 100px; } }
        @media (min-width: 1024px) { .cl-mask-left,.cl-mask-right { width: 140px; } }

        /* Scroll animations (uniquely prefixed) */
        @keyframes cl-scroll-fwd { 0% { transform: translateX(0);    } 100% { transform: translateX(-50%); } }
        @keyframes cl-scroll-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0);    } }

        .cl-scroll-r1 { animation: cl-scroll-fwd 20s linear infinite; }
        .cl-scroll-r2 { animation: cl-scroll-rev 22s linear infinite; }

        @media (min-width: 768px) {
          .cl-scroll-r1 { animation-duration: 38s; }
          .cl-scroll-r2 { animation-duration: 43s; }
        }

        .cl-scroll-r1:hover,
        .cl-scroll-r2:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default ClientLogosCarousel;
