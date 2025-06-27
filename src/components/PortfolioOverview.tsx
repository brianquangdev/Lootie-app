import React from 'react';
import { mockTokens } from '../data/mockTokens';
import { mockNFTs } from '../data/mockNFTs';

interface PortfolioOverviewProps {
  portfolioView: string;
  setPortfolioView: (view: string) => void;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolioView, setPortfolioView }) => {
  // Calculate total portfolio value
  const totalTokenValue = mockTokens.reduce((sum, token) => sum + (token.amount * token.price), 0);
  const totalNFTValue = mockNFTs.reduce((sum, nft) => sum + nft.value, 0);
  const totalPortfolioValue = totalTokenValue + totalNFTValue;

  return (
    <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black flex items-center gap-2">
          💰 Portfolio Overview
        </h3>
        <div className="text-right">
          <p className="text-3xl font-black text-green-600">${totalPortfolioValue.toFixed(2)}</p>
          <p className="text-sm text-gray-600 font-bold">Total Value</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border-2 border-black rounded-xl p-4">
          <p className="text-sm font-bold text-gray-600 mb-1">Tokens</p>
          <p className="text-2xl font-black text-blue-600">${totalTokenValue.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{mockTokens.length} assets</p>
        </div>
        <div className="bg-purple-50 border-2 border-black rounded-xl p-4">
          <p className="text-sm font-bold text-gray-600 mb-1">NFTs</p>
          <p className="text-2xl font-black text-purple-600">${totalNFTValue.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{mockNFTs.length} items</p>
        </div>
      </div>

      {/* Portfolio Navigation */}
      <div className="flex bg-gray-100 rounded-full p-1 border-2 border-black">
        <button
          onClick={() => setPortfolioView('tokens')}
          className={`flex-1 py-2 px-4 rounded-full font-bold transition-all ${
            portfolioView === 'tokens' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          🪙 Tokens
        </button>
        <button
          onClick={() => setPortfolioView('nfts')}
          className={`flex-1 py-2 px-4 rounded-full font-bold transition-all ${
            portfolioView === 'nfts' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          🖼️ NFTs
        </button>
      </div>
    </div>
  );
};

export default PortfolioOverview; 