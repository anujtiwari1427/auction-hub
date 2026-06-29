// ============================================
// AuctionHub AI — Mock Banks Data
// ============================================

import { Bank } from '@/types';

export const banks: Bank[] = [
  {
    id: 'bank-001',
    name: 'State Bank of India',
    shortName: 'SBI',
    logo: '/banks/sbi.svg',
    color: '#1a4d8f',
    totalAuctions: 12450,
    activeAuctions: 3200,
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata'],
  },
  {
    id: 'bank-002',
    name: 'HDFC Bank',
    shortName: 'HDFC',
    logo: '/banks/hdfc.svg',
    color: '#004c8f',
    totalAuctions: 8900,
    activeAuctions: 2100,
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'],
  },
  {
    id: 'bank-003',
    name: 'ICICI Bank',
    shortName: 'ICICI',
    logo: '/banks/icici.svg',
    color: '#f58220',
    totalAuctions: 7600,
    activeAuctions: 1800,
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'],
  },
  {
    id: 'bank-004',
    name: 'Punjab National Bank',
    shortName: 'PNB',
    logo: '/banks/pnb.svg',
    color: '#800000',
    totalAuctions: 6500,
    activeAuctions: 1500,
    cities: ['Delhi', 'Mumbai', 'Pune', 'Chandigarh', 'Lucknow'],
  },
  {
    id: 'bank-005',
    name: 'Bank of Baroda',
    shortName: 'BOB',
    logo: '/banks/bob.svg',
    color: '#e35205',
    totalAuctions: 5400,
    activeAuctions: 1200,
    cities: ['Mumbai', 'Ahmedabad', 'Vadodara', 'Delhi', 'Pune'],
  },
  {
    id: 'bank-006',
    name: 'Canara Bank',
    shortName: 'Canara',
    logo: '/banks/canara.svg',
    color: '#fdb913',
    totalAuctions: 4800,
    activeAuctions: 1100,
    cities: ['Bangalore', 'Chennai', 'Mumbai', 'Hyderabad'],
  },
  {
    id: 'bank-007',
    name: 'Union Bank of India',
    shortName: 'Union',
    logo: '/banks/union.svg',
    color: '#003399',
    totalAuctions: 4200,
    activeAuctions: 950,
    cities: ['Mumbai', 'Delhi', 'Pune', 'Ahmedabad'],
  },
  {
    id: 'bank-008',
    name: 'Bank of India',
    shortName: 'BOI',
    logo: '/banks/boi.svg',
    color: '#f36c21',
    totalAuctions: 3900,
    activeAuctions: 890,
    cities: ['Mumbai', 'Pune', 'Delhi', 'Kolkata'],
  },
  {
    id: 'bank-009',
    name: 'Axis Bank',
    shortName: 'Axis',
    logo: '/banks/axis.svg',
    color: '#800040',
    totalAuctions: 3500,
    activeAuctions: 780,
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],
  },
  {
    id: 'bank-010',
    name: 'Kotak Mahindra Bank',
    shortName: 'Kotak',
    logo: '/banks/kotak.svg',
    color: '#ed1c24',
    totalAuctions: 2800,
    activeAuctions: 620,
    cities: ['Mumbai', 'Delhi', 'Pune', 'Bangalore'],
  },
];

export function getBankByName(name: string): Bank | undefined {
  return banks.find(b => b.name === name);
}

export function getAllBankNames(): string[] {
  return banks.map(b => b.name);
}
