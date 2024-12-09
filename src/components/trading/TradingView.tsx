import React from 'react';
import { Asset } from '../../types/trading';
import { CandlestickData } from '../../types/chart';
import { TradingChart } from './TradingChart';

interface TradingViewProps {
  asset: Asset;
  chartData: CandlestickData[];
}

export function TradingView({ asset, chartData }: TradingViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">
        {asset.symbol} Chart
      </h2>
      <TradingChart data={chartData} />
    </div>
  );
}