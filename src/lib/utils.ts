// ============================================
// AuctionHub AI — Utility Functions
// ============================================

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatPriceShort(amount: number): string {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(0)}L`;
  }
  return `${(amount / 1000).toFixed(0)}K`;
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString('en-IN')} sq ft`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

export function getTimeRemaining(endDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const total = new Date(endDate).getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  if (monthlyRate === 0) return principal / months;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getDiscountBadgeColor(percent: number): string {
  if (percent >= 30) return 'text-emerald-400 bg-emerald-400/10';
  if (percent >= 20) return 'text-blue-400 bg-blue-400/10';
  if (percent >= 10) return 'text-amber-400 bg-amber-400/10';
  return 'text-slate-400 bg-slate-400/10';
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-blue-400';
  if (score >= 4) return 'text-amber-400';
  return 'text-red-400';
}

export function getRiskColor(risk: 'Low' | 'Medium' | 'High'): string {
  switch (risk) {
    case 'Low': return 'text-emerald-400 bg-emerald-400/10';
    case 'Medium': return 'text-amber-400 bg-amber-400/10';
    case 'High': return 'text-red-400 bg-red-400/10';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Live': return 'bg-red-500 text-white animate-pulse';
    case 'Upcoming': return 'bg-blue-500 text-white';
    case 'Ended': return 'bg-slate-600 text-slate-300';
    case 'Verified': return 'bg-emerald-500/20 text-emerald-400';
    default: return 'bg-slate-600 text-slate-300';
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
