'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  ChevronDown,
  Home,
  Calculator,
  Scale,
  CalendarDays,
  Mic,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  { icon: Home, label: 'Find properties', prompt: 'Show me the best auction properties in Mumbai' },
  { icon: Calculator, label: 'Calculate EMI', prompt: 'Calculate EMI for a ₹50 lakh property' },
  { icon: Scale, label: 'Legal help', prompt: 'How do I verify the legal status of an auction property?' },
  { icon: CalendarDays, label: 'Auction guide', prompt: 'Explain how bank property auctions work' },
];

const siaResponses: Record<string, string> = {
  default: "Hello! I'm SIA, your AI real estate assistant. 🏠\n\nI can help you with:\n• Finding auction properties\n• Investment analysis\n• EMI calculations\n• Legal guidance\n• Auction process explained\n\nWhat would you like to know?",
  properties: "Great choice! 🏠 Here are some amazing deals I found:\n\n🔥 **3 BHK in Worli** - ₹3.25 Cr (32% below market!)\n💎 **2 BHK in Andheri West** - ₹85L (28% savings)\n⚡ **1 BHK in Thane** - ₹22L (35% discount!)\n\nWould you like more details on any of these? Or I can search with specific filters like budget, location, or property type.",
  emi: "Let me calculate that for you! 📊\n\n**Loan Amount:** ₹50,00,000\n**Interest Rate:** 8.5% p.a.\n**Tenure:** 20 years\n\n**Monthly EMI: ₹43,391**\n\n📋 Total Interest: ₹54,13,840\n📋 Total Payment: ₹1,04,13,840\n\nWant me to compare rates from different banks? SBI, HDFC, and ICICI currently offer the best rates for auction properties.",
  legal: "Great question! Here's how to verify legal status: ⚖️\n\n**1. Title Verification**\nCheck the sale deed history for the last 30 years.\n\n**2. Encumbrance Certificate**\nGet an EC from the sub-registrar's office.\n\n**3. SARFAESI Compliance**\nEnsure the bank followed proper Section 13(2) and 13(4) procedures.\n\n**4. No Pending Litigation**\nVerify no stay orders exist from any court.\n\n✅ On AuctionHub, all properties marked 'Verified' have been through our legal team's review.\n\nWant me to explain any of these in detail?",
  auction: "Here's how bank property auctions work in India: 🏛️\n\n**Step 1:** Bank issues a SARFAESI notice (Section 13(2))\n**Step 2:** If borrower doesn't respond in 60 days, bank takes possession\n**Step 3:** Property is listed for e-auction\n**Step 4:** You pay EMD (Earnest Money Deposit) — usually 10% of reserve price\n**Step 5:** Participate in the online auction\n**Step 6:** Highest bidder wins!\n**Step 7:** Pay remaining amount within 15 days\n**Step 8:** Bank issues sale certificate\n\n💡 **Pro Tip:** Auction properties are typically 20-40% below market value!\n\nWant to know more about any specific step?",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('property') || lower.includes('find') || lower.includes('show') || lower.includes('search') || lower.includes('bhk') || lower.includes('mumbai') || lower.includes('pune')) {
    return siaResponses.properties;
  }
  if (lower.includes('emi') || lower.includes('calculate') || lower.includes('loan') || lower.includes('interest')) {
    return siaResponses.emi;
  }
  if (lower.includes('legal') || lower.includes('verify') || lower.includes('title') || lower.includes('document')) {
    return siaResponses.legal;
  }
  if (lower.includes('auction') || lower.includes('how') || lower.includes('process') || lower.includes('work') || lower.includes('explain')) {
    return siaResponses.auction;
  }
  return "I'd love to help you with that! 😊\n\nCould you tell me more about what you're looking for? I can help with:\n\n• **Property search** — Tell me your budget and preferred location\n• **Investment analysis** — I'll find the best ROI deals\n• **EMI calculation** — Quick loan calculations\n• **Legal guidance** — Understanding auction documentation\n• **Auction process** — Step-by-step guide";
}

export function SiaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: siaResponses.default,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300',
          isOpen
            ? 'bg-bg-card border border-border rotate-0'
            : 'gradient-primary shadow-primary/40 hover:shadow-primary/60 hover:scale-110'
        )}
        aria-label="Chat with SIA"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-text-secondary" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-primary animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-border flex flex-col bg-bg-primary animate-scale-in">
          {/* Header */}
          <div className="gradient-primary px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                SIA
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </h3>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Online · 10 AM – 10 PM
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all"
              aria-label="Close chat"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-2.5',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                    msg.role === 'user'
                      ? 'bg-primary/20 text-primary-light'
                      : 'bg-accent/20 text-accent'
                  )}
                >
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-bg-card border border-border text-text-primary rounded-bl-md'
                  )}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line.startsWith('**') ? (
                        <strong>{line.replace(/\*\*/g, '')}</strong>
                      ) : line.startsWith('•') || line.startsWith('📋') || line.startsWith('✅') || line.startsWith('💡') || line.startsWith('🔥') || line.startsWith('💎') || line.startsWith('⚡') ? (
                        <span className="block py-0.5">{line}</span>
                      ) : (
                        line
                      )}
                      {line === '' && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => sendMessage(prompt.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card border border-border text-xs text-text-secondary hover:text-primary-light hover:border-primary/30 transition-all whitespace-nowrap shrink-0"
                >
                  <prompt.icon className="w-3 h-3" />
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all shrink-0"
                aria-label="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask SIA anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0',
                  input.trim()
                    ? 'gradient-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-bg-card border border-border text-text-muted'
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
