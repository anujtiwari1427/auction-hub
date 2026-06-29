'use client';

import { useState } from 'react';
import { Upload, MapPin, Building, IndianRupee, CheckCircle2, ChevronRight, FileImage, ImagePlus } from 'lucide-react';
import Link from 'next/link';

export default function ListPropertyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'media'>('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 container-custom flex flex-col items-center justify-center text-center">
        <div className="clay-card p-12 max-w-lg w-full flex flex-col items-center animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Property Listed Successfully!</h1>
          <p className="text-text-secondary mb-8">
            Your property/plot details and uploaded documents have been securely saved. Our AI valuation team will review and verify your listing within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => setIsSubmitted(false)}
              className="flex-1 px-6 py-3 rounded-xl clay-panel font-semibold hover-lift"
            >
              List Another
            </button>
            <Link 
              href="/dashboard"
              className="flex-1 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover-lift shadow-lg shadow-primary/25 text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen mesh-bg">
      <div className="container-custom max-w-4xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            List Your <span className="gradient-text">Property or Plot</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Upload your property details securely. Reach thousands of verified buyers and investors across India in our next mega auction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
          {/* Tab Navigation */}
          <div className="flex p-2 rounded-2xl clay-panel mx-auto max-w-md mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'details' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'
              }`}
            >
              Basic Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'media' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'
              }`}
            >
              Media & Plots
            </button>
          </div>

          <div className="clay-card p-6 md:p-10">
            {activeTab === 'details' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Section 1 */}
                <div>
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                    <Building className="text-primary w-5 h-5" /> Property Info
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Property Title</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. 5000 sq.ft Prime NA Plot in Wakad" 
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Property Type</label>
                      <select required className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option value="">Select Type</option>
                        <option value="plot">Land / Plot</option>
                        <option value="residential">Residential House/Flat</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                    <MapPin className="text-primary w-5 h-5" /> Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">City</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Pune" 
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Locality / Address</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Hinjewadi Phase 1" 
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                    <IndianRupee className="text-primary w-5 h-5" /> Financials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Expected Reserve Price (₹)</label>
                      <input 
                        required
                        type="number" 
                        placeholder="e.g. 5000000" 
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Total Area (sq.ft)</label>
                      <input 
                        required
                        type="number" 
                        placeholder="e.g. 1500" 
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('media')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover-lift shadow-lg shadow-primary/25"
                  >
                    Continue to Uploads <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                    <FileImage className="text-primary w-5 h-5" /> Plot Documents & Legal
                  </h3>
                  <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl p-10 text-center clay-light">
                    <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Upload Plot Layouts & Documents</h4>
                    <p className="text-sm text-text-secondary mb-6">Drag and drop PDFs or images here, or click to browse</p>
                    <button type="button" className="px-6 py-2 rounded-lg bg-bg-secondary border border-border-light text-sm font-medium hover:bg-border transition-colors">
                      Browse Files
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 border-b border-border-light pb-4">
                    <ImagePlus className="text-primary w-5 h-5" /> High-Res Photos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-pointer clay-light">
                      <ImagePlus className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Add Photo</span>
                    </div>
                    <div className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-pointer clay-light">
                      <ImagePlus className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Add Photo</span>
                    </div>
                    <div className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-pointer clay-light">
                      <ImagePlus className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Add Photo</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-border-light">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="px-6 py-3 rounded-xl clay-panel font-semibold hover-lift"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 rounded-xl gradient-primary text-white font-bold hover-lift shadow-lg shadow-primary/25"
                  >
                    Submit Property
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
