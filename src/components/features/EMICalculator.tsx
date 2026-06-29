'use client';

import { useState, useMemo } from 'react';
import { Calculator, Percent, CalendarDays, IndianRupee, PieChart, TrendingDown, Building2 } from 'lucide-react';
import { formatPrice, calculateEMI, cn } from '@/lib/utils';

interface EMICalculatorProps {
  defaultAmount?: number;
  compact?: boolean;
}

const bankRates = [
  { name: 'State Bank of India', rate: 8.40, maxTenure: 30 },
  { name: 'HDFC Bank', rate: 8.50, maxTenure: 30 },
  { name: 'ICICI Bank', rate: 8.60, maxTenure: 30 },
  { name: 'Bank of Baroda', rate: 8.45, maxTenure: 25 },
  { name: 'Punjab National Bank', rate: 8.55, maxTenure: 25 },
  { name: 'Axis Bank', rate: 8.70, maxTenure: 30 },
];

export function EMICalculator({ defaultAmount = 5000000, compact = false }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenure), [loanAmount, interestRate, tenure]);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;
  const principalPercent = Math.round((loanAmount / totalPayment) * 100);

  return (
    <div className={cn('clay-card rounded-2xl', compact ? 'p-4' : 'p-6 lg:p-8')}>
      <h3 className="font-display font-bold text-text-primary flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary-light" />
        EMI Calculator
      </h3>

      <div className={cn('grid gap-8', !compact && 'lg:grid-cols-2')}>
        {/* Sliders */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-text-secondary flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5" />
                Loan Amount
              </label>
              <span className="text-sm font-bold text-primary-light">{formatPrice(loanAmount)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-primary"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>₹5L</span>
              <span>₹5Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-text-secondary flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" />
                Interest Rate (p.a.)
              </label>
              <span className="text-sm font-bold text-primary-light">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={6}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-primary"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>6%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-text-secondary flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Tenure
              </label>
              <span className="text-sm font-bold text-primary-light">{tenure} years</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-primary"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>1 yr</span>
              <span>30 yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* EMI Display */}
          <div className="bg-bg-primary rounded-xl p-5 text-center border border-border">
            <p className="text-sm text-text-muted mb-1">Monthly EMI</p>
            <p className="text-3xl font-display font-bold gradient-text">{formatPrice(emi)}</p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-primary rounded-xl p-4 border border-border">
              <p className="text-xs text-text-muted mb-0.5">Principal</p>
              <p className="text-sm font-bold text-primary-light">{formatPrice(loanAmount)}</p>
            </div>
            <div className="bg-bg-primary rounded-xl p-4 border border-border">
              <p className="text-xs text-text-muted mb-0.5">Total Interest</p>
              <p className="text-sm font-bold text-accent">{formatPrice(totalInterest)}</p>
            </div>
          </div>

          {/* Visual breakdown bar */}
          <div>
            <div className="flex justify-between text-xs text-text-muted mb-2">
              <span>Total Payment: {formatPrice(totalPayment)}</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden flex bg-border">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-l-full"
                style={{ width: `${principalPercent}%` }}
              />
              <div
                className="h-full bg-accent transition-all duration-500 rounded-r-full"
                style={{ width: `${100 - principalPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-primary-light flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                Principal ({principalPercent}%)
              </span>
              <span className="text-xs text-accent flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                Interest ({100 - principalPercent}%)
              </span>
            </div>
          </div>

          {/* Bank comparison */}
          {!compact && (
            <div>
              <p className="text-xs font-semibold text-text-secondary mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Compare Bank Rates
              </p>
              <div className="space-y-1.5">
                {bankRates.slice(0, 4).map((bank) => {
                  const bankEMI = calculateEMI(loanAmount, bank.rate, tenure);
                  return (
                    <div key={bank.name} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-bg-primary border border-border">
                      <span className="text-text-secondary">{bank.name.split(' ').slice(0, 2).join(' ')}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted">{bank.rate}%</span>
                        <span className="font-bold text-text-primary">{formatPrice(bankEMI)}/mo</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
