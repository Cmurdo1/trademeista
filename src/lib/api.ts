import { supabase } from './supabase';
import { Asset, Position, Order } from '../types/trading';

export const api = {
  async getPositions(userId: string): Promise<Position[]> {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },

  async createPosition(userId: string, position: Omit<Position, 'pnl' | 'pnlPercentage'>): Promise<void> {
    const { error } = await supabase
      .from('positions')
      .insert([{ ...position, user_id: userId }]);
    
    if (error) throw error;
  },

  async updatePosition(userId: string, position: Partial<Position> & { symbol: string }): Promise<void> {
    const { error } = await supabase
      .from('positions')
      .update(position)
      .eq('user_id', userId)
      .eq('symbol', position.symbol);
    
    if (error) throw error;
  },

  async getOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createOrder(userId: string, order: Omit<Order, 'id' | 'timestamp'>): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .insert([{
        ...order,
        user_id: userId,
        timestamp: new Date().toISOString(),
      }]);
    
    if (error) throw error;
  },
};