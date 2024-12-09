import { Asset } from '../types/trading';
import { CandlestickData } from '../types/chart';

export const mockAssets: Asset[] = [
  {
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    price: 65000,
    change24h: 2.5,
    volume24h: 1000000000,
  },
  {
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    price: 3500,
    change24h: -1.2,
    volume24h: 500000000,
  },
];

export const generateMockChartData = (days: number): CandlestickData[] => 
  Array.from({ length: days }, (_, i) => ({
    time: new Date(Date.now() - (days - i) * 86400000).toISOString().split('T')[0],
    open: 65000 + Math.random() * 1000,
    high: 66000 + Math.random() * 1000,
    low: 64000 + Math.random() * 1000,
    close: 65000 + Math.random() * 1000,
  }));