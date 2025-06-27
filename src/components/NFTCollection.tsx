import React from 'react';
import { mockNFTs } from '../data/mockNFTs';

const NFTCollection: React.FC = () => {
  const getRarityStyle = (rarity: string) => {
    switch(rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black';
      case 'Epic':
        return 'bg-gradient-to-r from-purple-400 to-pink-400 text-white';
      case 'Rare':
        return 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <h4 className="text-xl font-black mb-6 text-purple-600">NFT Collection</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft, index) => (
          <div 
            key={index} 
            className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-black rounded-2xl overflow-hidden hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full"
          >
            {/* NFT Image/Icon */}
            <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 h-48 flex items-center justify-center border-b-2 border-black">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {nft.img}
              </span>
            </div>
            
            {/* NFT Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-black text-lg leading-tight mb-1">{nft.name}</h5>
                  <p className="text-sm text-blue-600 font-bold">{nft.game}</p>
                  <p className="text-xs text-gray-500 font-medium">{nft.collection}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-black border border-black ${getRarityStyle(nft.rarity)}`}>
                  {nft.rarity}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 font-black">🏆</span>
                  <span className="text-sm font-bold text-gray-600">Value</span>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg">{nft.value} SAGA</p>
                  <p className="text-xs text-gray-500">≈ ${(nft.value * 1.2).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCollection; 