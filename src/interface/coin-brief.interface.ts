export interface ICoinBrief {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  totalVolume: number;
  priceChange: {
    "1h": number;
    "24h": number;
    "7d": number;
  };
  marketCap: number;
}
