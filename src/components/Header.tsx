import React, { useState, useEffect } from "react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateWalletClick: () => void;
  wallet: { address: string; privateKey: string; mnemonic?: string } | null;
  handleLogout: () => void;
  balance: string;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCreateWalletClick,
  wallet: _wallet,
  handleLogout,
  balance: _balance,
}) => {
  const [walletName, setWalletName] = useState<string | null>(null);

  useEffect(() => {
    function updateWalletName() {
      const rootAddress = localStorage.getItem("currentRootAddress") || "";
      if (!rootAddress) {
        setWalletName(null);
        return;
      }
      const walletsRaw = localStorage.getItem(`wallets_${rootAddress}`);
      const idx = parseInt(
        localStorage.getItem(`activeWalletIndex_${rootAddress}`) || "0",
        10
      );
      if (walletsRaw) {
        try {
          const wallets = JSON.parse(walletsRaw);
          if (
            Array.isArray(wallets) &&
            wallets.length > 0 &&
            idx >= 0 &&
            idx < wallets.length
          ) {
            setWalletName(wallets[idx].name);
            return;
          }
        } catch {}
      }
      setWalletName(null);
    }
    updateWalletName();
    // Listen for changes in wallets, activeWalletIndex, or currentRootAddress
    const storageListener = (e: StorageEvent) => {
      if (
        (e.key && e.key.startsWith("wallets_")) ||
        (e.key && e.key.startsWith("activeWalletIndex_")) ||
        e.key === "currentRootAddress"
      ) {
        updateWalletName();
      }
    };
    window.addEventListener("storage", storageListener);
    window.addEventListener("walletsUpdated", updateWalletName);
    return () => {
      window.removeEventListener("storage", storageListener);
      window.removeEventListener("walletsUpdated", updateWalletName);
    };
  }, []);

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
          {walletName ? (
            <>
              <div
                className="bg-blue-100 border-2 border-black rounded-xl px-3 py-2 font-bold text-black cursor-pointer hover:bg-blue-200 transition"
                title="Wallet Name"
                onClick={() => setActiveTab("wallet")}
              >
                {walletName}
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
