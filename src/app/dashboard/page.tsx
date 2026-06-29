'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Heart, Eye, Calendar, Bell, Settings, LogOut,
  Building2, TrendingUp, Clock, MapPin, ChevronRight, Star,
  IndianRupee, FileText, Shield, Sparkles,
} from 'lucide-react';
import { PropertyCard } from '@/components/features/PropertyCard';
import { getFeaturedProperties, getLiveAuctions, properties } from '@/data/properties';
import { formatPrice, formatDate, cn } from '@/lib/utils';

const tabs = [
  { id: 'saved', label: 'Saved Properties', icon: Heart },
  { id: 'auctions', label: 'My Auctions', icon: Calendar },
  { id: 'visits', label: 'Site Visits', icon: Eye },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const notifications = [
  { id: 1, title: 'Auction Starting Soon', desc: '3 BHK in Worli — auction starts in 2 hours', time: '2 hours ago', type: 'urgent' },
  { id: 2, title: 'Price Drop Alert', desc: '2 BHK in Andheri West price reduced by ₹5L', time: '5 hours ago', type: 'deal' },
  { id: 3, title: 'New Properties in Pune', desc: '12 new auction listings added in Pune', time: '1 day ago', type: 'info' },
  { id: 4, title: 'Loan Pre-Approved', desc: 'SBI has pre-approved your loan of ₹35L', time: '2 days ago', type: 'success' },
  { id: 5, title: 'Site Visit Confirmed', desc: 'Visit scheduled for Plot in Wakad on Jul 5', time: '3 days ago', type: 'info' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('saved');
  const savedProperties = properties.slice(0, 4);
  const liveAuctions = getLiveAuctions();

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom py-8">
        {/* Welcome */}
        <div className="glass-card rounded-2xl p-6 lg:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/30">
                R
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-display font-bold text-text-primary">
                  Welcome back, Rajesh! 👋
                </h1>
                <p className="text-sm text-text-secondary">Track your properties, auctions, and investments.</p>
              </div>
            </div>
            <Link
              href="/properties"
              className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Explore Properties
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Saved Properties', value: '12', icon: Heart, color: 'text-red-400' },
              { label: 'Active Bids', value: '3', icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'Site Visits', value: '5', icon: Eye, color: 'text-blue-400' },
              { label: 'Potential Savings', value: '₹48L', icon: IndianRupee, color: 'text-accent' },
            ].map((stat) => (
              <div key={stat.label} className="bg-bg-primary rounded-xl p-4 border border-border text-center">
                <stat.icon className={cn('w-5 h-5 mx-auto mb-2', stat.color)} />
                <p className="text-xl font-display font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-bg-card border border-border mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fade-in">
            {savedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {activeTab === 'auctions' && (
          <div className="space-y-4 animate-fade-in">
            {liveAuctions.map((p) => (
              <Link key={p.id} href={`/properties/${p.id}`} className="block glass-card rounded-xl p-5 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${p.thumbnail})` }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-red-400">LIVE</span>
                    </div>
                    <h3 className="font-semibold text-text-primary truncate">{p.title}</h3>
                    <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {p.location.locality}, {p.location.city}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-primary-light">{formatPrice(p.auctionPrice)}</p>
                    <p className="text-xs text-success font-medium">{p.savingsPercent}% below market</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="glass-card rounded-2xl p-8 text-center animate-fade-in">
            <Eye className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">No Site Visits Scheduled</h3>
            <p className="text-text-secondary mb-6">Book a site visit from any property page to see it here.</p>
            <Link href="/properties" className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold inline-flex items-center gap-2">
              Browse Properties <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3 animate-fade-in">
            {notifications.map((n) => (
              <div key={n.id} className="glass-card rounded-xl p-4 flex items-start gap-3 hover:border-primary/30 transition-all">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  n.type === 'urgent' ? 'bg-red-500/10 text-red-400' :
                  n.type === 'deal' ? 'bg-accent/10 text-accent' :
                  n.type === 'success' ? 'bg-success/10 text-success' :
                  'bg-primary/10 text-primary-light'
                )}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{n.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{n.desc}</p>
                </div>
                <span className="text-xs text-text-muted shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
