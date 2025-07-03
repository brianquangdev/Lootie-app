import React, { useState } from "react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateWalletClick: () => void;
  wallet?: { address: string } | null;
  handleLogout?: () => void;
  balance?: string;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCreateWalletClick,
  wallet,
  handleLogout,
  balance,
}) => {
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <header className="bg-white border-b-4 border-black p-4 shadow-[0px_4px_0px_0px_#000]">
      <div className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black text-black">🎮 Lootie</h1>
          <div className="hidden md:flex bg-gray-100 rounded-full p-1 border-2 border-black gap-2">
            {["portfolio", "questhub", "collabs", "communities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full capitalize transition-all duration-200
                  border-2
                  font-semibold
                  ${
                    activeTab === tab
                      ? "bg-yellow-100 text-black border-yellow-400 font-bold"
                      : "bg-transparent text-gray-600 border-transparent hover:bg-yellow-50 hover:text-black"
                  }
                `}
              >
                {tab === "questhub"
                  ? "QuestHub"
                  : tab === "collabs"
                  ? "Collabs"
                  : tab === "communities"
                  ? "Communities"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {wallet ? (
            <>
              <div
                className="bg-blue-100 border-2 border-black rounded-xl px-3 py-2 cursor-pointer hover:bg-blue-200 transition flex items-center gap-2"
                title="Wallet Address"
                onClick={() => setActiveTab("wallet")}
              >
                <span className="font-mono font-bold text-sm">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
              </div>
              <button
                className="ml-2 bg-red-400 hover:bg-red-500 border-2 border-black rounded-xl px-4 py-2 font-bold text-white shadow transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="ml-2 bg-green-400 hover:bg-green-500 border-2 border-black rounded-xl px-4 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#000] transition-all"
                onClick={onCreateWalletClick}
              >
                Create Wallet
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
