import React from 'react';
import { useTradingStore } from '../../store/tradingStore';
import { formatPrice } from '../../utils/formatters';

export function Portfolio() {
  const { positions } = useTradingStore();
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        <div className={`text-lg font-semibold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {formatPrice(totalPnL)}
        </div>
      </div>
      
      <div className="space-y-4">
        {positions.map((position) => (
          <div key={position.symbol} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{position.symbol}</h3>
                <p className="text-sm text-gray-500">
                  Size: {position.size} • Entry: {formatPrice(position.entryPrice)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPrice(position.pnl)}
                </p>
                <p className="text-sm text-gray-500">
                  {position.pnlPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}