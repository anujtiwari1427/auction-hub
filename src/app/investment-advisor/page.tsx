'use client';

import { useState } from 'react';
import {
  TrendingUp, Brain, Sparkles, Target, Shield, IndianRupee,
  BarChart3, ArrowRight, Zap, Star, Building2,
} from 'lucide-react';
import { PropertyCard } from '@/components/features/PropertyCard';
import { InvestmentScoreCard } from '@/components/features/InvestmentScoreCard';
import { getTopInvestments, getHighestROI, getBestDiscounts, properties } from '@/data/properties';
import { formatPrice, cn } from '@/lib/utils';

const budgetOptions = [
  { label: 'Under ₹25L', value: 2500000 },
  { label: '₹25L - 50L', value: 5000000 },
  { label: '₹50L - 1Cr', value: 10000000 },
  { label: '₹1Cr - 3Cr', value: 30000000 },
  { label: '₹3Cr+', value: 100000000 },
];

const riskOptions = ['Low', 'Medium', 'Any'];
const goalOptions = ['Maximum ROI', 'Rental Income', 'Capital Appreciation', 'Safe Investment'];

export default function InvestmentAdvisorPage() {
  const [budget, setBudget] = useState(5000000);
  const [risk, setRisk] = useState('Low');
  const [goal, setGoal] = useState('Maximum ROI');
  const [showResults, setShowResults] = useState(false);

  const getRecommendations = () => {
    let results = [...properties];

    results = results.filter(p => p.auctionPrice <= budget);

    if (risk !== 'Any') {
      results = results.filter(p => p.investmentScore.risk === risk);
    }

    switch (goal) {
      case 'Maximum ROI':
        results.sort((a, b) => b.expectedROI - a.expectedROI);
        break;
      case 'Rental Income':
        results.sort((a, b) => b.rentalYield - a.rentalYield);
        break;
      case 'Capital Appreciation':
        results.sort((a, b) => b.investmentScore.appreciationRate - a.investmentScore.appreciationRate);
        break;
      case 'Safe Investment':
        results.sort((a, b) => b.investmentScore.overall - a.investmentScore.overall);
        break;
    }

    return results.slice(0, 6);
  };

  const recommendations = showResults ? getRecommendations() : [];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            AI Investment Advisor
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-3">
            Smart Investment <span className="gradient-text-emerald">Recommendations</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Tell us your budget and goals — our AI will find the best auction properties for your portfolio.
          </p>
        </div>

        {/* Input Panel */}
        <div className="clay-card rounded-2xl p-8 max-w-3xl mx-auto mb-12">
          <div className="space-y-8">
            {/* Budget */}
            <div>
              <label className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-3">
                <IndianRupee className="w-4 h-4 text-primary-light" />
                What&apos;s your budget?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBudget(opt.value)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-all border',
                      budget === opt.value
                        ? 'border-primary bg-primary/10 text-primary-light'
                        : 'border-border text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk */}
            <div>
              <label className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-primary-light" />
                Risk tolerance?
              </label>
              <div className="flex gap-2">
                {riskOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRisk(opt)}
                    className={cn(
                      'flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all border',
                      risk === opt
                        ? 'border-primary bg-primary/10 text-primary-light'
                        : 'border-border text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                  >
                    {opt} Risk
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary-light" />
                Investment goal?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {goalOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setGoal(opt)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-all border',
                      goal === opt
                        ? 'border-primary bg-primary/10 text-primary-light'
                        : 'border-border text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="w-full px-6 py-4 rounded-xl gradient-primary text-white font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5" />
              Get AI Recommendations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && recommendations.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
                🎯 Top {recommendations.length} Recommendations
              </h2>
              <p className="text-text-secondary">
                Based on budget {formatPrice(budget)}, {risk.toLowerCase()} risk, {goal.toLowerCase()}.
              </p>
            </div>

            {/* Top pick highlight */}
            {recommendations[0] && (
              <div className="clay-card rounded-2xl p-6 mb-8 border-accent/30 border">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold text-accent">AI Top Pick</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PropertyCard property={recommendations[0]} />
                  <InvestmentScoreCard score={recommendations[0].investmentScore} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendations.slice(1).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

        {showResults && recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-text-secondary">No properties match your criteria. Try adjusting your budget or risk level.</p>
          </div>
        )}
      </div>
    </div>
  );
}
