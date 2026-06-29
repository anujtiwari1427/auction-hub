// ============================================
// AuctionHub AI — Type Definitions
// ============================================

export type PropertyType = 'Residential' | 'Commercial' | 'Land' | 'Industrial';
export type PropertySubType = 
  | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5+ BHK'
  | 'Studio' | 'Penthouse' | 'Villa' | 'Row House' | 'Bungalow'
  | 'Office Space' | 'Shop' | 'Showroom' | 'Warehouse' | 'Godown'
  | 'Plot' | 'Agricultural Land' | 'Industrial Land'
  | 'Factory' | 'Industrial Unit';

export type AuctionStatus = 'Live' | 'Upcoming' | 'Ended' | 'Cancelled';
export type LegalStatus = 'Verified' | 'Under Review' | 'Clear' | 'Dispute';
export type FurnishingStatus = 'Furnished' | 'Semi Furnished' | 'Unfurnished';
export type PossessionStatus = 'Ready' | 'Under Construction' | 'Immediate';

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  locality: string;
}

export interface InvestmentScore {
  overall: number;       // 0-10
  roi: number;           // 1-5 stars
  rental: number;        // 1-5 stars
  risk: 'Low' | 'Medium' | 'High';
  legalStatus: LegalStatus;
  futureGrowth: 'Excellent' | 'Good' | 'Average' | 'Below Average';
  appreciationRate: number; // annual % estimated
}

export interface NearbyAmenity {
  name: string;
  type: 'School' | 'Hospital' | 'Metro' | 'Railway' | 'Mall' | 'Park' | 'Airport';
  distance: string;      // e.g., "1.2 km"
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  aiSummary: string;

  // Type
  propertyType: PropertyType;
  subType: PropertySubType;
  furnishing: FurnishingStatus;
  possession: PossessionStatus;

  // Location
  location: GeoLocation;

  // Pricing
  auctionPrice: number;
  marketPrice: number;
  savings: number;          // marketPrice - auctionPrice
  savingsPercent: number;
  emd: number;              // Earnest Money Deposit
  reservePrice: number;

  // Details
  area: number;             // sq ft
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  parking?: number;
  yearBuilt?: number;

  // Auction
  auctionDate: string;
  auctionEndDate: string;
  auctionStatus: AuctionStatus;
  bankName: string;
  bankLogo: string;
  borrowerName?: string;

  // Media
  images: string[];
  thumbnail: string;
  hasVideo: boolean;
  has360Tour: boolean;

  // Investment
  investmentScore: InvestmentScore;
  rentalYield: number;       // annual %
  expectedROI: number;       // annual %
  estimatedRent: number;     // monthly ₹

  // Legal
  legalStatus: LegalStatus;
  legalVerified: boolean;
  courtCase: boolean;

  // Loan
  loanAvailable: boolean;
  maxLoanPercent: number;

  // Nearby
  nearbyAmenities: NearbyAmenity[];

  // Meta
  views: number;
  favorites: number;
  isHotDeal: boolean;
  isFeatured: boolean;
  isLuxury: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  totalAuctions: number;
  activeAuctions: number;
  cities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  propertyType: string;
  savings: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export interface LoanOffer {
  bankName: string;
  interestRate: number;
  maxTenure: number;
  maxAmount: number;
  processingFee: number;
  approvalChance: 'High' | 'Medium' | 'Low';
}

export interface FilterState {
  search: string;
  city: string;
  propertyType: PropertyType | '';
  subType: PropertySubType | '';
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bedrooms: string;
  bathrooms: string;
  bankName: string;
  auctionStatus: AuctionStatus | '';
  legalVerified: boolean | null;
  loanAvailable: boolean | null;
  furnishing: FurnishingStatus | '';
  possession: PossessionStatus | '';
  minInvestmentScore: number;
  sortBy: 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | 'roi' | 'score' | 'discount';
}

export interface SearchSuggestion {
  text: string;
  type: 'location' | 'property' | 'bank' | 'query';
  icon?: string;
}

export interface SiaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  properties?: Property[];
}

export interface DashboardStats {
  totalProperties: number;
  totalBanks: number;
  totalWorth: string;
  avgDiscount: number;
  activeCities: number;
}
