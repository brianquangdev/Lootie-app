import React from 'react';

interface MobileTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileTabNav: React.FC<MobileTabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="md:hidden bg-white border-b-2 border-black p-2">
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-full p-1 border-2 border-black">
          {['portfolio', 'wallet', 'questhub'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-full font-bold text-sm capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'questhub' ? 'Quest' : tab === 'wallet' ? 'Wallet' : tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTabNav; 