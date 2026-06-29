'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Bed, Bath, Maximize2, Building2, Calendar, Clock, Shield,
  Heart, Share2, Phone, MessageCircle, Eye, ChevronLeft, ChevronRight, Star,
  TrendingUp, IndianRupee, Home, Car, Landmark, FileText, CheckCircle, AlertCircle,
  Zap, Globe, School, Train, Stethoscope, ShoppingBag, TreePine, Plane,
  Sparkles, Bot, Download, Video, RotateCcw,
} from 'lucide-react';
import { properties, getPropertyById } from '@/data/properties';
import { PropertyCard } from '@/components/features/PropertyCard';
import { InvestmentScoreCard } from '@/components/features/InvestmentScoreCard';
import { EMICalculator } from '@/components/features/EMICalculator';
import { formatPrice, formatDate, getTimeRemaining, getStatusColor, cn } from '@/lib/utils';

const amenityIcons: Record<string, React.ElementType> = {
  School, Metro: Train, Railway: Train, Hospital: Stethoscope,
  Mall: ShoppingBag, Park: TreePine, Airport: Plane,
};

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = getPropertyById(id);
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'investment' | 'legal' | 'loan'>('overview');

  if (!property) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-text-primary mb-4">Property Not Found</h1>
          <Link href="/properties" className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(property.auctionEndDate);
  const similar = properties.filter(p => p.id !== property.id && p.location.city === property.location.city).slice(0, 3);
  const loanAmount = Math.round(property.auctionPrice * (property.maxLoanPercent / 100));

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'investment' as const, label: 'Investment' },
    { id: 'legal' as const, label: 'Legal' },
    { id: 'loan' as const, label: 'Loan & EMI' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumb */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="container-custom py-3 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary-light transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="container-custom py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-bg-card">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${property.images[currentImage]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* Nav arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev + 1) % property.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getStatusColor(property.auctionStatus)}`}>
                  {property.auctionStatus === 'Live' && '● '}{property.auctionStatus}
                </span>
                {property.isHotDeal && (
                  <span className="px-3 py-1.5 rounded-lg bg-orange-500/90 text-white text-xs font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Hot Deal
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                {property.hasVideo && (
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60" aria-label="Video tour">
                    <Video className="w-4 h-4" />
                  </button>
                )}
                {property.has360Tour && (
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60" aria-label="360 tour">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60" aria-label="Save">
                  <Heart className={cn('w-4 h-4', liked && 'fill-red-500 text-red-500')} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      'w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all',
                      i === currentImage ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-2">
                {property.title}
              </h1>
              <p className="text-text-secondary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary-light" />
                {property.location.address}, {property.location.city} — {property.location.pincode}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {property.views.toLocaleString()} views</span>
                <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {property.favorites} saved</span>
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {property.bankName}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-bg-card border border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    activeTab === tab.id ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                {/* Details Grid */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-4">Property Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem icon={Home} label="Type" value={`${property.subType} ${property.propertyType}`} />
                    <DetailItem icon={Maximize2} label="Area" value={`${property.area.toLocaleString()} sq ft`} />
                    {property.bedrooms !== undefined && property.bedrooms > 0 && (
                      <DetailItem icon={Bed} label="Bedrooms" value={`${property.bedrooms}`} />
                    )}
                    {property.bathrooms !== undefined && property.bathrooms > 0 && (
                      <DetailItem icon={Bath} label="Bathrooms" value={`${property.bathrooms}`} />
                    )}
                    {property.floor && <DetailItem icon={Building2} label="Floor" value={`${property.floor} of ${property.totalFloors}`} />}
                    {property.parking !== undefined && <DetailItem icon={Car} label="Parking" value={`${property.parking} slots`} />}
                    <DetailItem icon={Home} label="Furnishing" value={property.furnishing} />
                    <DetailItem icon={CheckCircle} label="Possession" value={property.possession} />
                    {property.yearBuilt ? <DetailItem icon={Calendar} label="Year Built" value={`${property.yearBuilt}`} /> : null}
                  </div>
                </div>

                {/* AI Summary */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    AI Analysis
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{property.aiSummary}</p>
                </div>

                {/* Description */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-3">Description</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{property.description}</p>
                </div>

                {/* Nearby */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-4">Nearby Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.nearbyAmenities.map((a) => {
                      const Icon = amenityIcons[a.type] || MapPin;
                      return (
                        <div key={a.name} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-primary border border-border">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary-light" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text-primary">{a.name}</p>
                            <p className="text-xs text-text-muted">{a.type}</p>
                          </div>
                          <span className="text-xs font-bold text-primary-light">{a.distance}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'investment' && (
              <div className="space-y-6 animate-fade-in">
                <InvestmentScoreCard score={property.investmentScore} />
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-4">Returns Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem icon={TrendingUp} label="Expected ROI" value={`${property.expectedROI}% / year`} />
                    <DetailItem icon={IndianRupee} label="Estimated Rent" value={formatPrice(property.estimatedRent) + '/mo'} />
                    <DetailItem icon={TrendingUp} label="Rental Yield" value={`${property.rentalYield}%`} />
                    <DetailItem icon={IndianRupee} label="Your Savings" value={formatPrice(property.savings)} />
                    <DetailItem icon={TrendingUp} label="Appreciation" value={`${property.investmentScore.appreciationRate}%/yr`} />
                    <DetailItem icon={IndianRupee} label="5-Year Value" value={formatPrice(Math.round(property.auctionPrice * Math.pow(1 + property.investmentScore.appreciationRate / 100, 5)))} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Legal Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border">
                      <span className="text-sm text-text-secondary">Title Verification</span>
                      <span className={cn('px-3 py-1 rounded-lg text-xs font-bold', property.legalVerified ? 'bg-success/10 text-success' : 'bg-amber-500/10 text-amber-400')}>
                        {property.legalVerified ? '✓ Verified' : 'Under Review'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border">
                      <span className="text-sm text-text-secondary">Court Cases</span>
                      <span className={cn('px-3 py-1 rounded-lg text-xs font-bold', !property.courtCase ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400')}>
                        {property.courtCase ? 'Pending' : 'None'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border">
                      <span className="text-sm text-text-secondary">SARFAESI Compliance</span>
                      <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-xs font-bold">✓ Compliant</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border">
                      <span className="text-sm text-text-secondary">Encumbrance Check</span>
                      <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-xs font-bold">✓ Clear</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loan' && (
              <div className="animate-fade-in">
                <EMICalculator defaultAmount={loanAmount} />
              </div>
            )}

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-5">Similar Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {similar.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price Card */}
            <div className="glass-card rounded-2xl p-6 sticky top-20">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Auction Price</p>
                  <p className="text-3xl font-display font-bold gradient-text">{formatPrice(property.auctionPrice)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-text-muted line-through">{formatPrice(property.marketPrice)}</span>
                    <span className="px-2 py-0.5 rounded-md bg-success/10 text-success text-sm font-bold">
                      Save {property.savingsPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-success mt-1">
                    You save {formatPrice(property.savings)}
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">EMD Amount</span>
                    <span className="font-semibold text-text-primary">{formatPrice(property.emd)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Auction Date</span>
                    <span className="font-semibold text-text-primary">{formatDate(property.auctionDate)}</span>
                  </div>
                  {timeRemaining.total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Time Left</span>
                      <span className="font-semibold text-accent">
                        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Bank</span>
                    <span className="font-semibold text-text-primary">{property.bankName.split(' ').slice(0, 3).join(' ')}</span>
                  </div>
                  {property.loanAvailable && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Loan Available</span>
                      <span className="font-semibold text-success">Up to {property.maxLoanPercent}%</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <button className="w-full px-4 py-3 rounded-xl gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Site Visit
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl border border-primary/40 text-primary-light font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-success/10 text-success font-semibold hover:bg-success/20 transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl border border-border text-text-secondary font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Bot className="w-4 h-4 text-accent" />
                    Ask SIA
                  </button>
                </div>
              </div>
            </div>

            {/* Compact Investment Score */}
            <InvestmentScoreCard score={property.investmentScore} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary border border-border">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary-light" />
      </div>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
