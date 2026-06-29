import {
  Building2, Users, Shield, Sparkles, Globe, Award, Target,
  TrendingUp, Heart, CheckCircle, Star, Zap, Brain,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'AuctionHub AI — India\'s first AI-powered bank auction property marketplace. Our mission, team, and vision.',
};

const values = [
  { icon: Shield, title: 'Transparency', desc: 'Every listing is verified. Every price is real. No hidden fees.' },
  { icon: Brain, title: 'AI-First', desc: 'We use AI to simplify every step of the property buying journey.' },
  { icon: Heart, title: 'Customer-Centric', desc: 'Your needs come first. SIA is always here to help.' },
  { icon: Globe, title: 'Accessibility', desc: 'Making bank auction properties accessible to every Indian.' },
];

const milestones = [
  { year: '2024', event: 'AuctionHub AI Founded', desc: 'Started with a vision to transform bank auction properties.' },
  { year: '2025', event: 'AI Engine Launched', desc: 'SIA, our AI assistant, went live with natural language property search.' },
  { year: '2025', event: '10,000+ Properties', desc: 'Crossed 10,000 verified auction listings across Maharashtra.' },
  { year: '2026', event: 'Nationwide Expansion', desc: 'Expanding to 8 major metros across India.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="mesh-bg relative py-20 lg:py-28">
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-panel text-sm text-text-secondary mb-6">
            <Building2 className="w-4 h-4 text-primary-light" />
            About AuctionHub AI
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 max-w-3xl mx-auto">
            Making Bank Auctions <span className="gradient-text">Simple & Accessible</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We&apos;re building India&apos;s first AI-powered real estate intelligence platform.
            Our mission is to make bank auction properties transparent and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="clay-card rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto">
            <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-4">Our Mission</h2>
            <blockquote className="text-xl lg:text-2xl text-text-secondary italic leading-relaxed">
              &ldquo;Making bank auction properties simple, transparent, and accessible for everyone.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="clay-card rounded-2xl p-6 text-center hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Properties Listed' },
              { value: '50+', label: 'Partner Banks' },
              { value: '15,000+', label: 'Happy Customers' },
              { value: '8', label: 'Cities & Growing' },
            ].map((s) => (
              <div key={s.label} className="clay-card rounded-2xl p-6 text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold gradient-text">{s.value}</p>
                <p className="text-sm text-text-muted mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30 shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-bold text-primary-light">{m.year}</span>
                  <h3 className="font-display font-bold text-text-primary text-lg mt-1">{m.event}</h3>
                  <p className="text-sm text-text-secondary mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 mesh-bg relative">
        <div className="relative z-10 container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/properties" className="px-8 py-4 rounded-xl gradient-primary text-white font-semibold shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all">
              Explore Properties
            </Link>
            <Link href="/ai-search" className="px-8 py-4 rounded-xl border border-border text-text-primary font-semibold hover:bg-white/5 transition-all flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Try AI Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
