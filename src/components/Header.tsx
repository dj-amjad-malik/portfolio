import { useState, useEffect } from "react";
import { Music, Instagram } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services & Portfolio", path: "/services-portfolio" },
  { name: "Media & Tech", path: "/media-tech" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  // Update active path based on current URL
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 glass border-b border-secondary/20">
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="h-full max-w-[1920px] mx-auto px-5 md:px-20 flex items-center justify-between">
          {/* Logo with enhanced effects */}
          <a href="/" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-cta opacity-30 blur-md group-hover:blur-lg transition-all duration-300" />

              {/* Logo image */}
              <img
                src="assets/log.jpeg"
                alt="Amjad Malik"
                className="relative w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <span className="font-heading font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
              Amjad Malik
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`relative font-body text-base font-medium transition-all duration-300 group ${activePath === item.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-secondary"
                  }`}
              >
                {item.name}

                {/* Underline animation */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-cta rounded-full transition-all duration-300 ${activePath === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative z-50">
            {/* Instagram with glow */}
            <a
              href="https://www.instagram.com/amjad_maliik"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-10 h-10 items-center justify-center text-primary hover:scale-110 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <Instagram className="w-6 h-6 relative z-10" />
            </a>

            {/* Book Now Button - Enhanced */}
            <a href="/booking" className="hidden md:block">
              <button className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm overflow-hidden group">
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-primary/50 transition-opacity duration-300" />
              </button>
            </a>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-secondary/20 border border-secondary/30 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated hamburger/close icon */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`} />
                <span className={`absolute w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                <span className={`absolute w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transition-all duration-500 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop with blur */}
        <div
          className={`absolute inset-0 bg-background/95 backdrop-blur-2xl transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Animated background effects */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isMenuOpen ? "opacity-100" : "opacity-0"
          }`}>
          <div className="absolute top-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        {/* Menu Content - Better aligned and sized */}
        <nav className={`relative h-full flex flex-col items-center justify-center gap-6 px-8 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}>
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`relative group text-center transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className={`font-heading text-2xl sm:text-3xl font-bold transition-all duration-300 ${activePath === item.path
                  ? "heading-gradient"
                  : "text-foreground group-hover:text-primary"
                }`}>
                {item.name}
              </span>

              {/* Hover line */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-cta rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Mobile Book Now Button */}
          <a
            href="/booking"
            onClick={() => setIsMenuOpen(false)}
            className={`mt-4 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            style={{ transitionDelay: `${navItems.length * 100}ms` }}
          >
            <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base overflow-hidden group">
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </a>

          {/* Mobile Social Links */}
          <div className={`flex items-center gap-6 mt-4 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${(navItems.length + 1) * 100}ms` }}>
            <a
              href="https://www.instagram.com/amjad_maliik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/20 border border-secondary/30 hover:border-primary/50 text-primary hover:scale-110 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <Instagram className="w-6 h-6 relative z-10" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
