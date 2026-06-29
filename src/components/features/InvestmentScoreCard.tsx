'use client';

import { Star, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { InvestmentScore } from '@/types';
import { cn, getScoreColor, getRiskColor } from '@/lib/utils';

interface InvestmentScoreCardProps {
  score: InvestmentScore;
  compact?: boolean;
}

export function InvestmentScoreCard({ score, compact = false }: InvestmentScoreCardProps) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score.overall / 10) * circumference;

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-3.5 h-3.5',
          i < count ? 'fill-accent text-accent' : 'text-border'
        )}
      />
    ));
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-bg-card border border-border">
        <div className="relative w-12 h-12 score-ring">
          <svg width="48" height="48">
            <circle cx="24" cy="24" r="20" className="stroke-border" />
            <circle
              cx="24" cy="24" r="20"
              className={cn('transition-all duration-1000', getScoreColor(score.overall))}
              style={{
                strokeDasharray: `${2 * Math.PI * 20}`,
                strokeDashoffset: `${2 * Math.PI * 20 - (score.overall / 10) * 2 * Math.PI * 20}`,
                stroke: 'currentColor',
              }}
            />
          </svg>
          <span className={cn('absolute inset-0 flex items-center justify-center text-sm font-bold', getScoreColor(score.overall))}>
            {score.overall}
          </span>
        </div>
        <div className="text-xs">
          <p className="font-semibold text-text-primary">Investment Score</p>
          <p className={cn('font-medium', getRiskColor(score.risk).split(' ')[0])}>
            {score.risk} Risk
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="clay-card rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-text-primary flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-light" />
          Investment Score
        </h3>
        <span className={cn('px-3 py-1 rounded-lg text-xs font-bold', getRiskColor(score.risk))}>
          {score.risk} Risk
        </span>
      </div>

      {/* Score Ring */}
      <div className="flex items-center justify-center">
        <div className="relative score-ring">
          <svg width="120" height="120">
            <circle cx="60" cy="60" r="40" className="stroke-border" strokeWidth="6" />
            <circle
              cx="60" cy="60" r="40"
              className={cn('transition-all duration-1000', getScoreColor(score.overall))}
              strokeWidth="6"
              style={{
                strokeDasharray: `${circumference}`,
                strokeDashoffset: `${offset}`,
                stroke: 'currentColor',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-3xl font-display font-bold', getScoreColor(score.overall))}>
              {score.overall}
            </span>
            <span className="text-xs text-text-muted">/10</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">ROI Potential</span>
          <div className="flex">{renderStars(score.roi)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Rental Income</span>
          <div className="flex">{renderStars(score.rental)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Legal Status</span>
          <span className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md',
            score.legalStatus === 'Verified' ? 'bg-success/10 text-success' : 'bg-amber-500/10 text-amber-400'
          )}>
            <Shield className="w-3 h-3" />
            {score.legalStatus}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Future Growth</span>
          <span className={cn(
            'text-xs font-bold',
            score.futureGrowth === 'Excellent' ? 'text-success' :
            score.futureGrowth === 'Good' ? 'text-primary-light' : 'text-amber-400'
          )}>
            {score.futureGrowth}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Appreciation Rate</span>
          <span className="text-xs font-bold text-success flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {score.appreciationRate}% / year
          </span>
        </div>
      </div>
    </div>
  );
}
