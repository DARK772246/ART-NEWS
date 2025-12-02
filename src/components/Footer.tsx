import { Facebook, Youtube, MessageCircle, Instagram } from "lucide-react";

const footerLinks = {
  categories: ["Latest", "Pakistan", "World", "Technology", "Business", "Entertainment", "Sports", "Opinion"],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1KUxa9TyUA/", label: "Facebook" },
  { icon: MessageCircle, href: "https://whatsapp.com/channel/0029Vb2YzFv05MUaWg7c6I1l", label: "WhatsApp" },
  { icon: Instagram, href: "https://www.instagram.com/yaseenkhan9063?utm_source=qr&igsh=MTVudGJyNWZ4Zngybw==", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@rtnews2016?si=gOnpLZRtZjQPVqAE", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="headline-serif text-2xl mb-4">
              RT <span className="text-primary">NEWS</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Delivering accurate, unbiased news coverage from around the world. Your trusted source
              for breaking news, analysis, and in-depth reporting.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground mb-8">
          <p>© {new Date().getFullYear()} RT NEWS. All rights reserved.</p>
          <p>
            Made with precision. Delivered with integrity.
          </p>
        </div>

        {/* Developer Section */}
        <div className="border-t border-border pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-3">Developed by</h3>
            <h2 className="headline-serif text-2xl mb-2 text-primary">Salman Khan</h2>
            <p className="text-muted-foreground text-sm mb-4">
              AI & Web Developer | Basketball Enthusiast | Full-Stack Engineer
            </p>
            <p className="text-xs text-muted-foreground">
              Passionate about building innovative digital solutions and creating exceptional user experiences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
