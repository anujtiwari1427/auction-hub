'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronDown,
  MapPin,
  Building2,
  TrendingUp,
  Filter,
  Sparkles,
} from 'lucide-react';
import { PropertyCard } from '@/components/features/PropertyCard';
import { properties } from '@/data/properties';
import { Property, PropertyType, AuctionStatus } from '@/types';
import { cn } from '@/lib/utils';

const cities = ['All Cities', 'Mumbai', 'Pune', 'Thane', 'Navi Mumbai'];
const types: (PropertyType | '')[] = ['', 'Residential', 'Commercial', 'Land', 'Industrial'];
const statuses: (AuctionStatus | '')[] = ['', 'Live', 'Upcoming'];
const sortOptions = [
  { value: 'discount', label: 'Highest Discount' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'score', label: 'Investment Score' },
  { value: 'roi', label: 'Highest ROI' },
  { value: 'date-asc', label: 'Auction Date: Soonest' },
];

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('');
  const [status, setStatus] = useState<AuctionStatus | ''>('');
  const [sortBy, setSortBy] = useState('discount');
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [minScore, setMinScore] = useState(0);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.locality.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.bankName.toLowerCase().includes(q) ||
          p.subType.toLowerCase().includes(q)
      );
    }

    if (city !== 'All Cities') {
      result = result.filter((p) => p.location.city === city);
    }

    if (propertyType) {
      result = result.filter((p) => p.propertyType === propertyType);
    }

    if (status) {
      result = result.filter((p) => p.auctionStatus === status);
    }

    result = result.filter((p) => p.auctionPrice <= maxPrice);
    result = result.filter((p) => p.investmentScore.overall >= minScore);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.auctionPrice - b.auctionPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.auctionPrice - a.auctionPrice);
        break;
      case 'score':
        result.sort((a, b) => b.investmentScore.overall - a.investmentScore.overall);
        break;
      case 'roi':
        result.sort((a, b) => b.expectedROI - a.expectedROI);
        break;
      case 'discount':
        result.sort((a, b) => b.savingsPercent - a.savingsPercent);
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.auctionDate).getTime() - new Date(b.auctionDate).getTime());
        break;
    }

    return result;
  }, [search, city, propertyType, status, sortBy, maxPrice, minScore]);

  const activeFilters = [city !== 'All Cities', propertyType !== '', status !== '', minScore > 0, maxPrice < 50000000].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Page Header */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-2">
            Bank Auction Properties
          </h1>
          <p className="text-text-secondary">
            Discover {properties.length}+ verified auction properties across Maharashtra
          </p>

          {/* Search + Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-6">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-bg-primary border border-border">
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by location, property type, bank..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-text-muted hover:text-text-primary">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                  showFilters || activeFilters > 0
                    ? 'border-primary/40 text-primary-light bg-primary/5'
                    : 'border-border text-text-secondary hover:text-text-primary hover:bg-white/5'
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-bg-primary border border-border text-sm text-text-secondary focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-bg-primary border border-border">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    'w-9 h-9 rounded-md flex items-center justify-center transition-all',
                    view === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    'w-9 h-9 rounded-md flex items-center justify-center transition-all',
                    view === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-5 rounded-xl bg-bg-primary border border-border animate-fade-in-down">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-secondary border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType | '')}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-secondary border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">All Types</option>
                    {types.filter(Boolean).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Auction Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AuctionStatus | '')}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-secondary border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">All Status</option>
                    {statuses.filter(Boolean).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Max Budget</label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-secondary border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value={50000000}>No Limit</option>
                    <option value={2500000}>Under ₹25L</option>
                    <option value={5000000}>Under ₹50L</option>
                    <option value={10000000}>Under ₹1Cr</option>
                    <option value={25000000}>Under ₹2.5Cr</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block">Min Score</label>
                  <select
                    value={minScore}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-secondary border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value={0}>Any Score</option>
                    <option value={7}>7+ Score</option>
                    <option value={8}>8+ Score</option>
                    <option value={9}>9+ Score</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-sm text-text-muted">{filtered.length} properties found</span>
                <button
                  onClick={() => {
                    setCity('All Cities');
                    setPropertyType('');
                    setStatus('');
                    setMaxPrice(50000000);
                    setMinScore(0);
                  }}
                  className="text-sm text-primary-light hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-text-primary mb-2">No properties found</h3>
            <p className="text-text-secondary mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => {
                setSearch('');
                setCity('All Cities');
                setPropertyType('');
                setStatus('');
                setMaxPrice(50000000);
                setMinScore(0);
              }}
              className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={cn(
            'grid gap-5',
            view === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl'
          )}>
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant={view === 'list' ? 'compact' : 'default'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
