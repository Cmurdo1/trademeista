import { create } from 'zustand';
import { Asset, Position, Order } from '../types/trading';

interface TradingStore {
  assets: Asset[];
  positions: Position[];
  orders: Order[];
  selectedAsset: Asset | null;
  setAssets: (assets: Asset[]) => void;
  setPositions: (positions: Position[]) => void;
  setOrders: (orders: Order[]) => void;
  setSelectedAsset: (asset: Asset | null) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  assets: [],
  positions: [],
  orders: [],
  selectedAsset: null,
  setAssets: (assets) => set({ assets }),
  setPositions: (positions) => set({ positions }),
  setOrders: (orders) => set({ orders }),
  setSelectedAsset: (selectedAsset) => set({ selectedAsset }),
}));