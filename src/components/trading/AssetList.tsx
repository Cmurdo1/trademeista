import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Asset } from '../../types/trading';
import { formatPrice } from '../../utils/formatters';

interface AssetListProps {
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  selectedAsset?: Asset;
}

export function AssetList({ assets, onSelectAsset, selectedAsset }: AssetListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Markets</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {assets.map((asset) => (
          <button
            key={asset.symbol}
            className={`w-full p-4 hover:bg-gray-50 transition-colors flex items-center justify-between ${
              selectedAsset?.symbol === asset.symbol ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectAsset(asset)}
          >
            <div>
              <p className="font-medium">{asset.symbol}</p>
              <p className="text-sm text-gray-500">{asset.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatPrice(asset.price)}</p>
              <p className={`text-sm flex items-center ${
                asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {asset.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(asset.change24h)}%
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}