'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, MapPin, Building2, Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const suggestions = [
  '2 BHK under 40 lakh in Thane',
  '3 BHK sea-facing in Mumbai',
  'Commercial property in Pune',
  'Best investment under 50 lakh',
  'Plots near Navi Mumbai Airport',
  'Villa in Lonavala',
];

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function SearchBar({ variant = 'hero', className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isAIMode, setIsAIMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    if (isAIMode) {
      router.push(`/ai-search?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/properties?search=${encodeURIComponent(q)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (variant === 'compact') {
    return (
      <div className={cn('relative', className)}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-card border border-border">
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search properties..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => setIsAIMode(true)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            isAIMode
              ? 'gradient-primary text-white shadow-lg shadow-primary/25'
              : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
          )}
        >
          <Sparkles className="w-4 h-4" />
          AI Search
        </button>
        <button
          onClick={() => setIsAIMode(false)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            !isAIMode
              ? 'gradient-primary text-white shadow-lg shadow-primary/25'
              : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
          )}
        >
          <Search className="w-4 h-4" />
          Classic Search
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="clay-panel rounded-2xl p-1.5 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 bg-bg-secondary rounded-xl px-5 py-4">
            {isAIMode ? (
              <Sparkles className="w-5 h-5 text-accent shrink-0 animate-pulse" />
            ) : (
              <Search className="w-5 h-5 text-text-muted shrink-0" />
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder={
                isAIMode
                  ? 'Ask SIA: "2 BHK under 40 lakh in Thane"...'
                  : 'Search by location, property type, bank...'
              }
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-base focus:outline-none"
            />
            <button
              type="button"
              className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all shrink-0"
              aria-label="Voice search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSearch()}
              className="px-6 py-2.5 rounded-xl gradient-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] flex items-center gap-2 shrink-0"
            >
              {isAIMode ? 'Ask SIA' : 'Search'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 clay-panel rounded-xl overflow-hidden z-20 p-2">
            <p className="px-3 py-1.5 text-xs text-text-muted font-medium">
              {isAIMode ? '✨ Try asking SIA:' : '🔍 Popular searches:'}
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  handleSearch(s);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all text-left"
              >
                {isAIMode ? (
                  <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                ) : (
                  <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
                )}
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick filters */}
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        {['Mumbai', 'Pune', 'Thane', '2 BHK', '3 BHK', 'Under 50L', 'Commercial'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              handleSearch(tag);
            }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-border text-xs text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
