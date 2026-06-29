'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Menu,
  X,
  Building2,
  Brain,
  Calculator,
  Calendar,
  LayoutDashboard,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Phone,
  Bell,
  User,
  Heart,
} from 'lucide-react';

const navLinks = [
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/ai-search', label: 'AI Search', icon: Brain, highlight: true },
  { href: '/investment-advisor', label: 'Investment Advisor', icon: TrendingUp },
  { href: '/calculator', label: 'EMI Calculator', icon: Calculator },
  { href: '/auction-calendar', label: 'Auction Calendar', icon: Calendar },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image 
                src="/logo.png" 
                alt="Auction-Hub" 
                width={200} 
                height={50} 
                className="h-10 w-auto object-contain" 
                priority 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.highlight
                      ? 'text-accent hover:bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.highlight && (
                    <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                className="hidden md:flex relative items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>

              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                aria-label="Favorites"
              >
                <Heart className="w-4 h-4" />
              </button>

              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-bg-secondary border-l border-border shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full pt-20 px-4 pb-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      link.highlight
                        ? 'text-accent bg-accent/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                    {link.highlight && (
                      <span className="ml-auto px-2 py-0.5 rounded-md bg-accent/20 text-accent text-xs font-bold">
                        AI
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-primary/25"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard
                </Link>
                <a
                  href="tel:+919999999999"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border text-text-secondary text-sm font-medium hover:bg-white/5 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Us: +91 99999 99999
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
