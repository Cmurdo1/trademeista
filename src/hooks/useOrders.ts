import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTradingStore } from '../store/tradingStore';
import { api } from '../lib/api';
import { Order } from '../types/trading';

export function useOrders() {
  const { user } = useAuthStore();
  const { setOrders } = useTradingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      try {
        setLoading(true);
        const orders = await api.getOrders(user.id);
        setOrders(orders);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load orders'));
      } finally {
        setLoading(false);
      }
    };

    loadOrders();

    // Subscribe to order updates
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders',
        filter: `user_id=eq.${user.id}`
      }, loadOrders)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { loading, error };
}