export interface ICoinDetail {
  name: string;
  symbol: string;
  description?: {
    en: string;
    ko: string;
  };
  localization?: {
    en: string;
    ko: string;
  };
  homepage?: string;
  imageUrl?: string;
  currentPrice?: {
    krw: number;
    usd: number;
  };
  priceChangePercent?: {
    krw: number;
    usd: number;
  };
  marketCap?: {
    krw: number;
    usd: number;
  };
  volume?: {
    krw: number;
    usd: number;
  };
  rank?: number;
}
