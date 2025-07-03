import React from "react";
import { mockTokens } from "../data/mockTokens";
import { mockNFTs } from "../data/mockNFTs";

interface WalletMainProps {
  walletSubTab: string;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  swapAmount: string;
  setSwapAmount: (amount: string) => void;
  wallet?: { address: string } | null;
  balance?: string;
}

const WalletMain: React.FC<WalletMainProps> = ({
  walletSubTab,
  selectedToken,
  setSelectedToken,
  swapAmount,
  setSwapAmount,
  wallet,
  balance,
}) => {
  // Calculate total portfolio value
  const totalTokenValue = mockTokens.reduce(
    (sum, token) => sum + token.amount * token.price,
    0
  );
  const totalNFTValue = mockNFTs.reduce((sum, nft) => sum + nft.value, 0);
  const totalPortfolioValue = totalTokenValue + totalNFTValue;

  const calculateSwapValue = (amount: string, tokenPrice: number) => {
    return (parseFloat(amount) * tokenPrice * 0.95).toFixed(4); // 5% slippage
  };

  // Wallets View
  if (walletSubTab === "wallets") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          🏠 My Wallets
        </h3>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-black rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                  🎮
                </div>
                <div>
                  <h4 className="font-black text-lg">Gaming Wallet</h4>
                  <p className="text-sm text-gray-600">0x1234...5678</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-xl text-green-600">
                  ${totalPortfolioValue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Balance</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl py-3 font-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            + Add New Wallet
          </button>
        </div>
      </div>
    );
  }

  // Receive View
  if (walletSubTab === "receive") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          ⬇️ Receive Tokens
        </h3>

        <div className="text-center space-y-6">
          <div className="bg-gray-100 border-2 border-black rounded-xl p-8">
            <div className="w-48 h-48 bg-white border-2 border-black rounded-xl mx-auto mb-4 flex items-center justify-center">
              <div className="text-6xl">📱</div>
            </div>
            <p className="font-bold text-lg mb-2">QR Code</p>
            <p className="text-sm text-gray-600">
              Scan to send tokens to this wallet
            </p>
          </div>

          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <p className="font-bold mb-2">Wallet Address:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="0x1234567890abcdef1234567890abcdef12345678"
                readOnly
                className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-2 font-mono text-sm"
              />
              <button className="bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl px-4 py-2 font-black">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Send View
  if (walletSubTab === "send") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          ⬆️ Send Tokens
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">To Address</label>
            <input
              type="text"
              placeholder="0x... or ENS name"
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 font-mono"
            />
          </div>

          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">Token & Amount</label>
            <div className="flex gap-3">
              <select className="bg-white border-2 border-black rounded-xl px-3 py-2 font-bold flex-1">
                {mockTokens.map((token) => (
                  <option key={token.name} value={token.name}>
                    {token.icon} {token.name} ({token.amount})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="0.0"
                className="bg-white border-2 border-black rounded-xl px-3 py-2 font-bold w-32 text-right"
              />
            </div>
          </div>

          <button className="w-full bg-yellow-300 hover:bg-yellow-400 border-4 border-black rounded-xl py-4 font-black text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
            🚀 SEND NOW!
          </button>
        </div>
      </div>
    );
  }

  // Swap View
  if (walletSubTab === "swap") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          🔄 Swap to SAGA
        </h3>

        <div className="space-y-4">
          {/* From Token */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">From</label>
            <div className="flex gap-3">
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="bg-white border-2 border-black rounded-xl px-3 py-2 font-bold flex-1"
              >
                {mockTokens.map((token) => (
                  <option key={token.name} value={token.name}>
                    {token.icon} {token.name} ({token.amount})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="0.0"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                className="bg-white border-2 border-black rounded-xl px-3 py-2 font-bold w-32 text-right"
              />
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center">
            <div className="bg-yellow-300 border-2 border-black rounded-full p-3 shadow-[4px_4px_0px_0px_#000]">
              <span className="text-2xl">⬇️</span>
            </div>
          </div>

          {/* To SAGA */}
          <div className="bg-yellow-100 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">To</label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <span className="font-black text-lg">SAGA</span>
              </div>
              <div className="text-right">
                <p className="font-black text-xl">
                  {swapAmount && selectedToken
                    ? calculateSwapValue(
                        swapAmount,
                        mockTokens.find((t) => t.name === selectedToken)
                          ?.price || 0
                      )
                    : "0.0000"}
                </p>
                <p className="text-sm text-gray-600 font-bold">≈ 5% slippage</p>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button
            className="w-full bg-yellow-300 hover:bg-yellow-400 border-4 border-black rounded-xl py-4 font-black text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!swapAmount || parseFloat(swapAmount) <= 0}
          >
            🚀 SWAP NOW!
          </button>
        </div>
      </div>
    );
  }

  // Settings View
  if (walletSubTab === "settings") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          ⚙️ Settings
        </h3>

        <div className="space-y-6">
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <h4 className="font-bold text-lg mb-3">Security</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Two-Factor Authentication</span>
                <button className="bg-green-400 border-2 border-black rounded-full w-12 h-6 relative">
                  <div className="bg-white border border-black rounded-full w-5 h-5 absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Biometric Login</span>
                <button className="bg-gray-300 border-2 border-black rounded-full w-12 h-6 relative">
                  <div className="bg-white border border-black rounded-full w-5 h-5 absolute left-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <h4 className="font-bold text-lg mb-3">Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Dark Mode</span>
                <button className="bg-gray-300 border-2 border-black rounded-full w-12 h-6 relative">
                  <div className="bg-white border border-black rounded-full w-5 h-5 absolute left-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Push Notifications</span>
                <button className="bg-green-400 border-2 border-black rounded-full w-12 h-6 relative">
                  <div className="bg-white border border-black rounded-full w-5 h-5 absolute right-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-400 hover:bg-red-500 border-4 border-black rounded-xl py-3 font-black text-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            🔒 Lock Wallet
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default WalletMain;
