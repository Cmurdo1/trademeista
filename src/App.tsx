import React, { useEffect } from 'react';
import { useTradingStore } from './store/tradingStore';
import { useAuthStore } from './store/authStore';
import { Header } from './components/layout/Header';
import { TradingView } from './components/trading/TradingView';
import { AssetList } from './components/trading/AssetList';
import { OrderForm } from './components/trading/OrderForm';
import { Portfolio } from './components/portfolio/Portfolio';
import { AuthForm } from './components/auth/AuthForm';
import { mockAssets, generateMockChartData } from './data/mockData';
import { supabase } from './lib/supabase';

function App() {
  const { user, setUser } = useAuthStore();
  const { selectedAsset, setSelectedAsset, setAssets } = useTradingStore();
  const chartData = React.useMemo(() => generateMockChartData(100), []);

  useEffect(() => {
    // Check active sessions and set initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setAssets(mockAssets);
    if (!selectedAsset) {
      setSelectedAsset(mockAssets[0]);
    }
  }, []);

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {selectedAsset && <TradingView asset={selectedAsset} chartData={chartData} />}
            <Portfolio />
          </div>
          <div className="space-y-6">
            <AssetList
              assets={mockAssets}
              onSelectAsset={setSelectedAsset}
              selectedAsset={selectedAsset}
            />
            {selectedAsset && (
              <OrderForm
                asset={selectedAsset}
                onSubmitOrder={handleOrderSubmit}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;