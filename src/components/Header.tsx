import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white border-b-4 border-black p-4 shadow-[0px_4px_0px_0px_#000]">
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black text-black">🎮 Lootie</h1>
          <div className="hidden md:flex bg-gray-100 rounded-full p-1 border-2 border-black">
            {['portfolio', 'wallet', 'questhub'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab === 'questhub' ? 'QuestHub' : tab === 'wallet' ? 'Wallet' : tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 border-2 border-black rounded-xl px-3 py-2">
            <span className="font-mono font-bold text-sm">0x1234...5678</span>
          </div>
          <button className="bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl p-2 font-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#000] transition-all">
            📋
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 