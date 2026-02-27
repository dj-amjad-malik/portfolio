import { Music, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-secondary/20 relative overflow-hidden">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-border" />

      <div className="max-w-[1920px] mx-auto px-5 md:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-12">

          {/* Brand Column */}
          <div className="space-y-6 lg:pr-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-cta opacity-30 blur-md group-hover:blur-lg transition-all duration-300" />
                <img
                  src="assets/log.jpeg"
                  alt="Amjad Malik"
                  className="relative w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-heading font-bold text-2xl text-foreground">
                Amjad Malik
              </span>
            </a>
            <p className="text-muted-foreground text-base leading-relaxed">
              Creating Unforgettable Experiences Through Music & Entertainment
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services-portfolio" },
                { name: "Media & Tech", path: "/media-tech" },
                { name: "Book Now", path: "/booking" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-base"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:amjadmalikji23@gmail.com"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="break-all text-sm">amjadmalikji23@gmail.com</span>
              </a>
              <a
                href="tel:+919989828508"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">+91 99898 28508</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Follow - Social Media */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Follow My Journey</h4>

            {/* Mobile: Icons only */}
            <div className="flex gap-3 md:hidden">
              {[
                { icon: Instagram, name: "Instagram", href: "https://instagram.com/amjad_maliik" },
                { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/111164770408022?ref=NONE_xav_ig_profile_page_web" },
                { icon: Youtube, name: "YouTube", href: "https://www.youtube.com/@amjadmalik6000" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-cta hover:border-transparent hover:scale-110 transition-all duration-300 hover:glow-pink"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Desktop: Full buttons */}
            <div className="hidden md:flex flex-col gap-3">
              {[
                { icon: Instagram, name: "Instagram", href: "https://instagram.com/amjad_maliik" },
                { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/111164770408022?ref=NONE_xav_ig_profile_page_web" },
                { icon: Youtube, name: "YouTube", href: "https://www.youtube.com/@amjadmalik6000" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/20 border border-secondary/30 text-muted-foreground hover:bg-gradient-cta hover:text-white hover:border-transparent hover:scale-105 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-secondary/20 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Amjad Malik | Hyderabad, India | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
