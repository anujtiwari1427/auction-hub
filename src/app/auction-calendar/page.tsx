'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Building2, IndianRupee } from 'lucide-react';
import { properties } from '@/data/properties';
import { formatPrice, formatDate, cn } from '@/lib/utils';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AuctionCalendarPage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const auctionDates = new Map<string, typeof properties>();
  properties.forEach((p) => {
    const date = new Date(p.auctionDate);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!auctionDates.has(key)) auctionDates.set(key, []);
    auctionDates.get(key)!.push(p);
  });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const selectedAuctions = selectedDate
    ? auctionDates.get(selectedDate) || []
    : [];

  const upcomingAuctions = properties
    .filter(p => new Date(p.auctionDate) >= now)
    .sort((a, b) => new Date(a.auctionDate).getTime() - new Date(b.auctionDate).getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom py-8 lg:py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Never Miss an Auction
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-3">
            Auction <span className="gradient-text">Calendar</span>
          </h1>
          <p className="text-text-secondary">View upcoming auctions and set reminders.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-display font-bold text-xl text-text-primary">
                  {months[currentMonth]} {currentYear}
                </h3>
                <button onClick={nextMonth} className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-text-muted py-2">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const key = `${currentYear}-${currentMonth}-${day}`;
                  const hasAuctions = auctionDates.has(key);
                  const count = auctionDates.get(key)?.length || 0;
                  const isToday = day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();
                  const isSelected = selectedDate === key;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(key)}
                      className={cn(
                        'aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all text-sm',
                        isToday && 'ring-1 ring-primary',
                        isSelected ? 'bg-primary text-white' : hasAuctions
                          ? 'bg-primary/10 text-primary-light hover:bg-primary/20'
                          : 'text-text-secondary hover:bg-white/5'
                      )}
                    >
                      {day}
                      {hasAuctions && (
                        <span className={cn(
                          'absolute bottom-1.5 w-1.5 h-1.5 rounded-full',
                          isSelected ? 'bg-white' : 'bg-accent'
                        )} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected date auctions */}
            {selectedDate && selectedAuctions.length > 0 && (
              <div className="mt-6 space-y-3 animate-fade-in">
                <h3 className="font-display font-bold text-text-primary">
                  {selectedAuctions.length} auction{selectedAuctions.length > 1 ? 's' : ''} on this date
                </h3>
                {selectedAuctions.map((p) => (
                  <Link key={p.id} href={`/properties/${p.id}`} className="block glass-card rounded-xl p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${p.thumbnail})` }} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text-primary text-sm truncate">{p.title}</h4>
                        <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {p.location.locality}, {p.location.city}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-primary-light">{formatPrice(p.auctionPrice)}</p>
                        <p className="text-xs text-success">{p.savingsPercent}% off</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming List */}
          <div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-light" />
                Upcoming Auctions
              </h3>
              <div className="space-y-3">
                {upcomingAuctions.map((p) => (
                  <Link key={p.id} href={`/properties/${p.id}`} className="block p-3 rounded-xl bg-bg-primary border border-border hover:border-primary/30 transition-all">
                    <p className="text-sm font-semibold text-text-primary truncate">{p.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-text-muted">{formatDate(p.auctionDate)}</span>
                      <span className="text-xs font-bold text-primary-light">{formatPrice(p.auctionPrice)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
