import React, { useState } from "react";
import copyIcon from "../assets/—Pngtree—vector copy icon_4013516.png";

interface WalletSidebarProps {
  walletSubTab: string;
  setWalletSubTab: (tab: string) => void;
  wallet?: { address: string } | null;
  balance?: string;
}

const WalletSidebar: React.FC<WalletSidebarProps> = ({
  walletSubTab,
  setWalletSubTab,
  wallet,
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
    <>
      {/* Toast notification */}
      {copied && (
        <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
          <span className="text-green-300 text-xl">Copied successfully!</span>

        </div>
      )}
      <div className="w-64 bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
          💼 Wallet
        </h3>
        {wallet && (
          <div className="mb-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 w-full justify-center">
              <span className="font-mono text-sm text-gray-900 break-all block text-center max-w-[170px] font-bold">
                {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
              </span>
              <div className="relative">
                <button
                  className="text-gray-900 hover:text-black focus:outline-none"
                  onClick={handleCopy}
                  title="Copy address"
                >
                  <img
                    src={copyIcon}
                    alt="Copy"
                    className="w-5 h-5 object-contain"
                    style={{ filter: "invert(1) brightness(0.1)" }}
                  />
                </button>
              </div>
            </div>
            {balance && (
              <div className="font-bold text-green-700 text-base text-center w-full">
                {parseFloat(balance).toFixed(4)} ETH
              </div>
            )}
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={() => setWalletSubTab("wallets")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              walletSubTab === "wallets"
                ? "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🏠 Wallets
          </button>

          <button
            onClick={() => setWalletSubTab("receive")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              walletSubTab === "receive"
                ? "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ⬇️ Receive
          </button>

          <button
            onClick={() => setWalletSubTab("send")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              walletSubTab === "send"
                ? "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ⬆️ Send
          </button>

          <button
            onClick={() => setWalletSubTab("swap")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              walletSubTab === "swap"
                ? "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🔄 Swap
          </button>

          <button
            onClick={() => setWalletSubTab("settings")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
              walletSubTab === "settings"
                ? "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_#000]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default WalletSidebar;
