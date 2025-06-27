import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import Header from './components/Header';
import MobileTabNav from './components/MobileTabNav';
import HeroSection from './components/HeroSection';
import PortfolioOverview from './components/PortfolioOverview';
import TokenHoldings from './components/TokenHoldings';
import NFTCollection from './components/NFTCollection';
import WalletSidebar from './components/WalletSidebar';
import WalletMain from './components/WalletMain';
import QuestHub from './components/QuestHub';
import QuestDetailModal from './components/QuestDetailModal';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [walletSubTab, setWalletSubTab] = useState('swap');
  const [swapAmount, setSwapAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('GLD');
  const [portfolioView, setPortfolioView] = useState('tokens'); // tokens or nfts
  const [heroSlide, setHeroSlide] = useState(0);

  // Auto-slide hero every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 font-sans">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Tab Navigation */}
      <MobileTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section - Only show on Portfolio tab */}
      {activeTab === 'portfolio' && (
        <HeroSection heroSlide={heroSlide} setHeroSlide={setHeroSlide} />
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 pb-8">
        
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {/* Portfolio Overview */}
            <PortfolioOverview portfolioView={portfolioView} setPortfolioView={setPortfolioView} />

            {/* Tokens View */}
            {portfolioView === 'tokens' && <TokenHoldings />}

            {/* NFTs View */}
            {portfolioView === 'nfts' && <NFTCollection />}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <WalletSidebar walletSubTab={walletSubTab} setWalletSubTab={setWalletSubTab} />

            {/* Main Content */}
            <div className="flex-1">
              <WalletMain 
                walletSubTab={walletSubTab}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
              />
            </div>
          </div>
        )}

        {/* QuestHub Tab */}
        {activeTab === 'questhub' && (
          <QuestHub setSelectedQuest={setSelectedQuest} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Quest Detail Modal */}
      <QuestDetailModal selectedQuest={selectedQuest} setSelectedQuest={setSelectedQuest} />
    </div>
  );
}

export default App;
