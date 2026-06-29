'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Brain,
  Scale,
  Landmark,
  Calculator,
  Phone,
  MessageCircle,
  Star,
  Zap,
  Clock,
  MapPin,
  ChevronRight,
  Home,
  Factory,
  TreePine,
  Store,
  Users,
  CheckCircle,
  BarChart3,
  Globe,
  Bot,
  Search,
  FileText,
  Mic,
  Heart,
  Eye,
} from 'lucide-react';
import { SearchBar } from '@/components/features/SearchBar';
import { PropertyCard } from '@/components/features/PropertyCard';
import { EMICalculator } from '@/components/features/EMICalculator';
import {
  getFeaturedProperties,
  getHotDeals,
  getLuxuryProperties,
  getLiveAuctions,
  getTopInvestments,
  getBestDiscounts,
} from '@/data/properties';
import { banks } from '@/data/banks';
import { testimonials } from '@/data/testimonials';
import { formatPrice, cn } from '@/lib/utils';

const stats = [
  { value: '10,000+', label: 'Properties Listed', icon: Building2 },
  { value: '50+', label: 'Partner Banks', icon: Landmark },
  { value: '₹2,000Cr+', label: 'Property Worth', icon: TrendingUp },
  { value: '15,000+', label: 'Happy Customers', icon: Users },
];

const categories = [
  { icon: Home, label: 'Residential', count: '6,500+', color: 'from-blue-500 to-blue-700', href: '/properties?type=Residential' },
  { icon: Store, label: 'Commercial', count: '2,100+', color: 'from-purple-500 to-purple-700', href: '/properties?type=Commercial' },
  { icon: TreePine, label: 'Land & Plots', count: '1,800+', color: 'from-emerald-500 to-emerald-700', href: '/properties?type=Land' },
  { icon: Factory, label: 'Industrial', count: '600+', color: 'from-orange-500 to-orange-700', href: '/properties?type=Industrial' },
];

const aiFeatures = [
  {
    icon: Brain,
    title: 'AI Property Search',
    description: 'Just say "2 BHK under 40 lakh in Thane" and SIA finds the best matches instantly.',
    color: 'text-blue-400 bg-blue-400/10',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisor',
    description: 'AI analyzes ROI, rental yield, risk, and future appreciation for every property.',
    color: 'text-emerald-400 bg-emerald-400/10',
  },
  {
    icon: Scale,
    title: 'Legal Assistant',
    description: 'Upload documents — AI explains legal terms, flags risks, and verifies compliance.',
    color: 'text-amber-400 bg-amber-400/10',
  },
  {
    icon: Bot,
    title: 'SIA — AI Assistant',
    description: 'Your 24/7 real estate expert. Answers questions, books visits, calculates EMI.',
    color: 'text-purple-400 bg-purple-400/10',
  },
  {
    icon: BarChart3,
    title: 'Price Prediction',
    description: 'AI forecasts future property values based on market trends and infrastructure projects.',
    color: 'text-cyan-400 bg-cyan-400/10',
  },
  {
    icon: Mic,
    title: 'Voice Calls',
    description: 'SIA can call you, book site visits, send reminders, and follow up automatically.',
    color: 'text-pink-400 bg-pink-400/10',
  },
];

const steps = [
  { step: '01', title: 'Discover', description: 'Search 10,000+ auction properties with AI-powered filters', icon: Search },
  { step: '02', title: 'Analyze', description: 'Get AI investment scores, ROI predictions, and legal verification', icon: BarChart3 },
  { step: '03', title: 'Finance', description: 'Compare loans, calculate EMI, and get pre-approval', icon: Calculator },
  { step: '04', title: 'Own It', description: 'Participate in auction, complete documentation, and get possession', icon: CheckCircle },
];

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  return <span className="font-display text-3xl lg:text-4xl font-bold text-text-primary">{target}</span>;
}

export default function HomePage() {
  const featured = getFeaturedProperties();
  const hotDeals = getHotDeals();
  const luxury = getLuxuryProperties();
  const liveAuctions = getLiveAuctions();
  const topInvestments = getTopInvestments();
  const bestDiscounts = getBestDiscounts();

  return (
    <div className="relative">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center mesh-bg overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 container-custom py-20 lg:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-text-secondary">
              India&apos;s First AI-Powered Property Auction Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up">
            <span className="text-text-primary">Discover Properties at</span>
            <br />
            <span className="gradient-text">20-40% Below Market</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            AI-powered search, investment analysis, legal verification & loan assistance.
            Everything you need to buy bank auction properties — in one platform.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in-up stagger-3">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16 max-w-4xl mx-auto animate-fade-in-up stagger-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-4 lg:p-5 text-center">
                <stat.icon className="w-6 h-6 text-primary-light mx-auto mb-2" />
                <AnimatedCounter target={stat.value} />
                <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LIVE AUCTIONS ==================== */}
      {liveAuctions.length > 0 && (
        <section className="py-16 lg:py-20 bg-bg-secondary">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Live Now</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
                  Ending Today — Act Fast!
                </h2>
              </div>
              <Link
                href="/properties?status=Live"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {liveAuctions.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-3">
              Explore by Category
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              From apartments to warehouses — find every type of auction property across India.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group glass-card rounded-2xl p-6 lg:p-8 text-center hover-lift"
              >
                <div className={cn(
                  'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110',
                  cat.color
                )}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg mb-1">{cat.label}</h3>
                <p className="text-sm text-text-muted">{cat.count} properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED AUCTIONS ==================== */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-2">
                Featured Auctions
              </h2>
              <p className="text-text-secondary">Handpicked premium properties with the best value.</p>
            </div>
            <Link
              href="/properties?featured=true"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI FEATURES SHOWCASE ==================== */}
      <section className="py-16 lg:py-24 mesh-bg relative overflow-hidden">
        <div className="relative z-10 container-custom">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-4">
              AI That Thinks Like a <span className="gradient-text-gold">Real Estate Expert</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              From finding properties to predicting prices — our AI handles the complex stuff so you don&apos;t have to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiFeatures.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover-lift group"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-primary-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BEST DISCOUNTS ==================== */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">Today&apos;s Best Deals</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">
                Biggest Discounts Right Now
              </h2>
            </div>
            <Link
              href="/properties?sort=discount"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestDiscounts.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              From discovery to ownership — simplified into 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card mb-5 group-hover:border-primary/40 transition-all">
                  <step.icon className="w-8 h-8 text-primary-light" />
                </div>
                <span className="text-xs font-bold text-primary-light uppercase tracking-widest block mb-2">
                  Step {step.step}
                </span>
                <h3 className="font-display font-bold text-text-primary text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EMI CALCULATOR ==================== */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-3">
              Calculate Your EMI
            </h2>
            <p className="text-text-secondary">Plan your finances with our intelligent loan calculator.</p>
          </div>
          <EMICalculator />
        </div>
      </section>

      {/* ==================== BANK PARTNERS ==================== */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-3">
              Trusted Bank Partners
            </h2>
            <p className="text-text-secondary">Auction properties from India&apos;s leading banks.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {banks.map((bank) => (
              <div
                key={bank.id}
                className="glass-card rounded-xl p-5 text-center hover-lift cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <Landmark className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm">{bank.shortName}</h3>
                <p className="text-xs text-text-muted mt-1">{bank.activeAuctions.toLocaleString()} auctions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-16 lg:py-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-3">
              What Our Customers Say
            </h2>
            <p className="text-text-secondary">Real stories from real buyers who saved big.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < t.rating ? 'fill-accent text-accent' : 'text-border'
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.avatar}</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.role}, {t.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Saved</p>
                    <p className="text-sm font-bold gradient-text-emerald">{t.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 lg:py-28 mesh-bg relative overflow-hidden">
        <div className="relative z-10 container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-text-primary mb-6">
              Ready to Find Your <span className="gradient-text">Dream Property</span>?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
              Join 15,000+ smart buyers who saved crores on their property purchase through bank auctions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Properties
              </Link>
              <Link
                href="/ai-search"
                className="px-8 py-4 rounded-xl border border-border text-text-primary font-semibold text-lg hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-accent" />
                Try AI Search
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
