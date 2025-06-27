import React from 'react';

interface WalletSidebarProps {
  walletSubTab: string;
  setWalletSubTab: (tab: string) => void;
}

const WalletSidebar: React.FC<WalletSidebarProps> = ({ walletSubTab, setWalletSubTab }) => {
  return (
    <div className="w-64 bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
        💼 Wallet
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={() => setWalletSubTab('wallets')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            walletSubTab === 'wallets' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🏠 Wallets
        </button>
        
        <button
          onClick={() => setWalletSubTab('receive')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            walletSubTab === 'receive' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ⬇️ Receive
        </button>
        
        <button
          onClick={() => setWalletSubTab('send')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            walletSubTab === 'send' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ⬆️ Send
        </button>
        
        <button
          onClick={() => setWalletSubTab('swap')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            walletSubTab === 'swap' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🔄 Swap
        </button>
        
        <button
          onClick={() => setWalletSubTab('settings')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
            walletSubTab === 'settings' 
              ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
};

export default WalletSidebar; 