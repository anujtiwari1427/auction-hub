import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Briefcase,
  Camera,
  Play,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const footerLinks = {
  'Properties': [
    { label: 'Residential', href: '/properties?type=Residential' },
    { label: 'Commercial', href: '/properties?type=Commercial' },
    { label: 'Land & Plots', href: '/properties?type=Land' },
    { label: 'Industrial', href: '/properties?type=Industrial' },
    { label: 'Luxury Deals', href: '/properties?luxury=true' },
    { label: 'Hot Deals', href: '/properties?hot=true' },
  ],
  'AI Features': [
    { label: 'AI Property Search', href: '/ai-search' },
    { label: 'Investment Advisor', href: '/investment-advisor' },
    { label: 'EMI Calculator', href: '/calculator' },
    { label: 'Auction Calendar', href: '/auction-calendar' },
    { label: 'Talk to SIA', href: '#sia' },
  ],
  'Resources': [
    { label: 'Auction Guide', href: '/blog' },
    { label: 'Investment Tips', href: '/blog' },
    { label: 'Legal Guide', href: '/blog' },
    { label: 'Market Updates', href: '/blog' },
    { label: 'FAQs', href: '/about' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/about' },
    { label: 'Partner With Us', href: '/about' },
    { label: 'Contact', href: '/about' },
    { label: 'Privacy Policy', href: '/about' },
    { label: 'Terms of Service', href: '/about' },
  ],
};

const cities = ['Mumbai', 'Pune', 'Thane', 'Navi Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];

export function Footer() {
  return (
    <footer className="relative bg-bg-secondary border-t border-border">
      {/* Newsletter Section */}
      <div className="container-custom py-12 lg:py-16">
        <div className="glass-card rounded-2xl p-8 lg:p-12 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Stay Updated
              </div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-2">
                Get the Best Auction Deals
              </h3>
              <p className="text-text-secondary max-w-md">
                Subscribe to receive AI-curated property alerts, market insights, and exclusive deals directly in your inbox.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 lg:w-72 px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <button className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] flex items-center gap-2 shrink-0">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-text-muted mt-2">
                Join 50,000+ smart investors. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/logo.png" 
                alt="Auction-Hub" 
                width={200} 
                height={50} 
                className="h-12 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-text-secondary mb-4 max-w-xs">
              India&apos;s first AI-powered bank auction property marketplace. Making real estate investment simple, transparent, and accessible.
            </p>
            <div className="space-y-2 text-sm text-text-secondary">
              <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary-light" />
                +91 99999 99999
              </a>
              <a href="mailto:hello@auctionhub.ai" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary-light" />
                hello@auctionhub.ai
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-light shrink-0" />
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-text-primary mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities */}
        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Available Cities</h4>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/properties?city=${city}`}
                className="px-3 py-1.5 rounded-lg bg-bg-card text-xs text-text-secondary hover:text-primary-light hover:bg-primary/5 border border-border transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} AuctionHub AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Globe, MessageCircle, Camera, Briefcase, Play].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all"
                aria-label="Social media"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
