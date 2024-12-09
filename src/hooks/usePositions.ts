import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTradingStore } from '../store/tradingStore';
import { api } from '../lib/api';
import { Position } from '../types/trading';

export function usePositions() {
  const { user } = useAuthStore();
  const { setPositions } = useTradingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadPositions = async () => {
      try {
        setLoading(true);
        const positions = await api.getPositions(user.id);
        setPositions(positions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load positions'));
      } finally {
        setLoading(false);
      }
    };

    loadPositions();

    // Subscribe to position updates
    const subscription = supabase
      .channel('positions')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'positions',
        filter: `user_id=eq.${user.id}`
      }, loadPositions)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { loading, error };
}