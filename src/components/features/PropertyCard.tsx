'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Building2,
  Eye,
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, getTimeRemaining, getStatusColor, cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured' | 'compact';
}

export function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const timeRemaining = getTimeRemaining(property.auctionEndDate);
  const isEndingSoon = timeRemaining.days <= 1 && timeRemaining.total > 0;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  if (variant === 'compact') {
    return (
      <Link href={`/properties/${property.id}`} className="block group">
        <div className="clay-card rounded-xl overflow-hidden flex gap-4 p-3">
          <div className="relative w-28 h-28 rounded-lg overflow-hidden shrink-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${property.images[0]})` }}
            />
            <div className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusColor(property.auctionStatus)}`}>
              {property.auctionStatus}
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-primary-light transition-colors">
                {property.title}
              </h3>
              <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {property.location.locality}, {property.location.city}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-primary-light">{formatPrice(property.auctionPrice)}</span>
                <span className="text-xs text-text-muted line-through ml-1.5">{formatPrice(property.marketPrice)}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-success/10 text-success text-xs font-bold">
                {property.savingsPercent}% off
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="clay-card rounded-2xl overflow-hidden hover-lift">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${property.images[currentImage]})` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Navigation arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
                {property.images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentImage ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getStatusColor(property.auctionStatus)}`}>
              {property.auctionStatus === 'Live' && '● '}
              {property.auctionStatus}
            </span>
            {property.isHotDeal && (
              <span className="px-2.5 py-1 rounded-lg bg-orange-500/90 text-white text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" /> Hot Deal
              </span>
            )}
            {property.legalVerified && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1">
                <Shield className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          {/* Like button */}
          <button
            onClick={toggleLike}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
            aria-label="Save property"
          >
            <Heart className={cn('w-4 h-4 transition-all', liked && 'fill-red-500 text-red-500')} />
          </button>

          {/* Bottom bar on image */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{formatPrice(property.auctionPrice)}</span>
                <span className="px-2 py-0.5 rounded-md bg-success/20 text-success-light text-xs font-bold backdrop-blur-sm">
                  {property.savingsPercent}% off
                </span>
              </div>
              <span className="text-xs text-white/60 line-through">{formatPrice(property.marketPrice)}</span>
            </div>
            {isEndingSoon && timeRemaining.total > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/20 backdrop-blur-sm">
                <Clock className="w-3 h-3 text-red-400" />
                <span className="text-xs font-bold text-red-400">
                  {timeRemaining.hours}h {timeRemaining.minutes}m left
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-primary-light transition-colors line-clamp-2 text-[15px] leading-snug">
              {property.title}
            </h3>
            <p className="text-sm text-text-muted flex items-center gap-1 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-light shrink-0" />
              {property.location.locality}, {property.location.city}
            </p>
          </div>

          {/* Details Row */}
          <div className="flex items-center gap-3 text-text-secondary text-sm">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                {property.bedrooms} BHK
              </span>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {property.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              {property.area.toLocaleString()} sqft
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
                <TrendingUp className="w-3 h-3 text-primary-light" />
                <span className="text-xs font-bold text-primary-light">{property.investmentScore.overall}/10</span>
              </div>
              {property.expectedROI > 0 && (
                <span className="text-xs text-success font-medium">{property.expectedROI}% ROI</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-text-muted text-xs">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {property.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {property.bankName.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
