'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Send, Bot, User, Mic, Search, ArrowRight,
  Building2, TrendingUp, MapPin, IndianRupee, Brain,
} from 'lucide-react';
import { PropertyCard } from '@/components/features/PropertyCard';
import { searchProperties, properties, getTopInvestments, getBestDiscounts } from '@/data/properties';
import { Property } from '@/types';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  properties?: Property[];
}

const exampleQueries = [
  { icon: Building2, text: '2 BHK under 40 lakh in Thane' },
  { icon: TrendingUp, text: 'Best investment property in Pune' },
  { icon: IndianRupee, text: 'Commercial space under 1 crore' },
  { icon: MapPin, text: 'Properties near Mumbai metro' },
  { icon: Brain, text: 'Show me highest ROI deals' },
  { icon: Building2, text: 'Luxury villa in Lonavala' },
];

function getAISearchResults(query: string): { text: string; results: Property[] } {
  const q = query.toLowerCase();
  let results: Property[] = [];
  let text = '';

  if (q.includes('investment') || q.includes('roi') || q.includes('best')) {
    results = getTopInvestments();
    text = `Great question! 🎯 I've analyzed all our properties and found the **top investment opportunities** based on ROI, rental yield, and future appreciation potential. Here are the best picks:`;
  } else if (q.includes('discount') || q.includes('cheap') || q.includes('deal')) {
    results = getBestDiscounts();
    text = `Here are the properties with the **biggest discounts** compared to market value! 🔥 Some of these are offering up to 40% off — that's an incredible deal:`;
  } else if (q.includes('luxury') || q.includes('villa') || q.includes('penthouse')) {
    results = properties.filter(p => p.isLuxury);
    text = `Here are our **premium luxury properties** 💎 — from sea-facing apartments to hilltop villas. These are the finest auction finds:`;
  } else if (q.includes('commercial') || q.includes('office') || q.includes('shop')) {
    results = properties.filter(p => p.propertyType === 'Commercial');
    text = `Found some excellent **commercial properties**! 🏢 These are great for passive rental income:`;
  } else {
    results = searchProperties(query);
    if (results.length === 0) results = properties.slice(0, 4);
    text = `I found **${results.length} properties** matching your search! Here are the best matches:`;
  }

  return { text, results: results.slice(0, 4) };
}

export default function AISearchPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm **SIA**, your AI property search assistant 🏠✨\n\nInstead of using complex filters, just tell me what you're looking for in plain language!\n\nFor example:\n• *\"2 BHK under 40 lakh in Thane\"*\n• *\"Best investment property in Pune\"*\n• *\"Commercial space with high rental yield\"*\n\nWhat are you looking for today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setInput('');

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setIsSearching(true);

    setTimeout(() => {
      const { text, results } = getAISearchResults(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        properties: results,
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom max-w-5xl py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Search
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-3">
            Search with <span className="gradient-text-gold">Natural Language</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Just describe what you&apos;re looking for — SIA will find the perfect properties for you.
          </p>
        </div>

        {/* Chat Area */}
        <div className="clay-card rounded-2xl overflow-hidden">
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}>
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1',
                  msg.role === 'user' ? 'bg-primary/20 text-primary-light' : 'bg-accent/20 text-accent'
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={cn('max-w-[90%] space-y-4', msg.role === 'user' && 'text-right')}>
                  <div className={cn(
                    'inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-bg-card border border-border text-text-primary rounded-bl-md'
                  )}>
                    {msg.content.split('\n').map((line, i) => (
                      <span key={i} className="block">{line || <br />}</span>
                    ))}
                  </div>
                  {msg.properties && msg.properties.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {msg.properties.map((p) => (
                        <PropertyCard key={p.id} property={p} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isSearching && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Search className="w-4 h-4 animate-pulse" />
                    Searching properties...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Example Queries */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-text-muted mb-3">✨ Try these:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {exampleQueries.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => handleSearch(q.text)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-bg-primary border border-border text-xs text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all text-left"
                  >
                    <q.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-6 py-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(input); }} className="flex items-center gap-3">
              <button type="button" className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary-light transition-all shrink-0" aria-label="Voice input">
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Try: "2 BHK under 40 lakh in Thane"'
                className="flex-1 px-4 py-3 rounded-xl bg-bg-primary border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all',
                  input.trim()
                    ? 'gradient-primary text-white shadow-lg shadow-primary/25 hover:scale-[1.02]'
                    : 'bg-bg-card border border-border text-text-muted'
                )}
              >
                <Sparkles className="w-4 h-4" />
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
