import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../lib/api';
import { Asset } from '../../types/trading';
import { formatPrice } from '../../utils/formatters';

interface OrderFormProps {
  asset: Asset;
}

export function OrderForm({ asset }: OrderFormProps) {
  const { user } = useAuthStore();
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(asset.price.toString());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      setError('');

      await api.createOrder(user.id, {
        symbol: asset.symbol,
        side,
        type: orderType,
        price: parseFloat(price),
        amount: parseFloat(amount),
        status: 'open'
      });

      setAmount('');
      setPrice(asset.price.toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
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
              Price ({formatPrice(parseFloat(price))})
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
              step="0.00000001"
              min="0"
              required
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
            min="0"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-md ${
            side === 'buy'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white font-medium disabled:opacity-50`}
        >
          {submitting ? 'Processing...' : `${side === 'buy' ? 'Buy' : 'Sell'} ${asset.symbol}`}
        </button>
      </div>
    </form>
  );
}