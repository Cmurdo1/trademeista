import React, { useState } from 'react';
import { Asset } from '../types/trading';

interface OrderFormProps {
  asset: Asset;
  onSubmitOrder: (order: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'market' | 'limit';
    price: number;
    amount: number;
  }) => void;
}

export function OrderForm({ asset, onSubmitOrder }: OrderFormProps) {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(asset.price.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOrder({
      symbol: asset.symbol,
      side,
      type: orderType,
      price: parseFloat(price),
      amount: parseFloat(amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 rounded-md ${
              side === 'buy'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setSide('buy')}
          >
            Buy
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-md ${
              side === 'sell'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setSide('sell')}
          >
            Sell
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 rounded-md ${
              orderType === 'market'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-md ${
              orderType === 'limit'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>
        </div>

        {orderType === 'limit' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
              step="0.00000001"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            step="0.00000001"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-md ${
            side === 'buy'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white font-medium`}
        >
          {side === 'buy' ? 'Buy' : 'Sell'} {asset.symbol}
        </button>
      </div>
    </form>
  );
}