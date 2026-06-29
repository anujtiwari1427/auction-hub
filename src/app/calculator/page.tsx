import { Calculator } from 'lucide-react';
import { EMICalculator } from '@/components/features/EMICalculator';

export const metadata = {
  title: 'EMI Calculator',
  description: 'Calculate your home loan EMI. Compare rates from top banks. Plan your auction property purchase.',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom max-w-5xl py-8 lg:py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Financial Planning
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-3">
            EMI & Loan <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Plan your finances with our intelligent calculator. Compare EMI across banks.
          </p>
        </div>
        <EMICalculator />
      </div>
    </div>
  );
}
