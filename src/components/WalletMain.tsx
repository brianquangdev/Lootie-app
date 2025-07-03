import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import copyIcon from "../assets/—Pngtree—vector copy icon_4013516.png";
import { mockTokens } from "../data/mockTokens";
import { mockNFTs } from "../data/mockNFTs";
import CryptoJS from "crypto-js";
import * as bip39 from "bip39";

interface WalletAccount {
  address: string;
  name: string;
  type: "ETH" | "SAGA";
  index: number;
}

interface WalletMainProps {
  walletSubTab: string;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  swapAmount: string;
  setSwapAmount: (amount: string) => void;
  onWalletChange?: () => void; // callback to update header
  wallet: { address: string; privateKey: string; mnemonic?: string } | null;
  balance: string;
}

const WalletMain: React.FC<WalletMainProps> = ({
  walletSubTab,
  selectedToken,
  setSelectedToken,
  swapAmount,
  setSwapAmount,
  onWalletChange,
  wallet: _wallet,
  balance: _balance,
}) => {
  // Get root address for current session
  const rootAddress = localStorage.getItem("currentRootAddress") || "";

  // Wallets state
  const [wallets, setWallets] = useState<WalletAccount[]>([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [ethBalance, setEthBalance] = useState<string>("0");
  const [sagaBalance] = useState<string>("0.00");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWalletName, setNewWalletName] = useState("");
  const [newWalletType, setNewWalletType] = useState<"ETH" | "SAGA">("ETH");
  const [addError, setAddError] = useState("");
  const [_isAdding, setIsAdding] = useState(false);

  // Load wallets from localStorage for current rootAddress
  useEffect(() => {
    if (!rootAddress) {
      setWallets([]);
      setActiveWalletIndex(0);
      return;
    }
    const stored = localStorage.getItem(`wallets_${rootAddress}`);
    let idx = parseInt(
      localStorage.getItem(`activeWalletIndex_${rootAddress}`) || "0",
      10
    );
    if (stored) {
      try {
        const arr = JSON.parse(stored) as WalletAccount[];
        if (isNaN(idx) || idx < 0 || idx >= arr.length) {
          idx = 0;
          localStorage.setItem(`activeWalletIndex_${rootAddress}`, "0");
        }
        setWallets(arr);
        setActiveWalletIndex(idx);
      } catch {
        setWallets([]);
        setActiveWalletIndex(0);
      }
    } else {
      setWallets([]);
      setActiveWalletIndex(0);
    }
  }, [rootAddress]);

  // Update balances when active wallet changes
  const activeWallet = wallets[activeWalletIndex];
  useEffect(() => {
    if (activeWallet && activeWallet.type === "ETH") {
      async function fetchBalance() {
        try {
          const provider = new ethers.JsonRpcProvider();
          const balance = await provider.getBalance(activeWallet.address);
          setEthBalance(ethers.formatEther(balance));
        } catch (e) {
          setEthBalance("0");
        }
      }
      fetchBalance();
    } else {
      setEthBalance("0");
    }
  }, [activeWallet]);

  // Handle wallet selection
  const handleSelectWallet = (idx: number) => {
    setActiveWalletIndex(idx);
    localStorage.setItem(`activeWalletIndex_${rootAddress}`, idx.toString());
    if (onWalletChange) onWalletChange();
    window.dispatchEvent(new Event("walletsUpdated"));
  };

  // Calculate total portfolio value (mock)
  const totalTokenValue = mockTokens.reduce(
    (sum, token) => sum + token.amount * token.price,
    0
  );
  const totalNFTValue = mockNFTs.reduce((sum, nft) => sum + nft.value, 0);
  const totalPortfolioValue = totalTokenValue + totalNFTValue;

  const calculateSwapValue = (amount: string, tokenPrice: number) => {
    return (parseFloat(amount) * tokenPrice * 0.95).toFixed(4); // 5% slippage
  };

  // Add new wallet logic
  const handleAddWallet = async () => {
    setAddError("");
    if (!newWalletName.trim()) {
      setAddError("Wallet name is required");
      return;
    }
    setIsAdding(true);
    try {
      // Decrypt seed phrase from vault
      const encryptedVault = localStorage.getItem("encryptedVault") || "";
      const password = prompt(
        "Enter your wallet password to add a new account:"
      );
      if (!password) {
        setAddError("Password is required");
        setIsAdding(false);
        return;
      }
      const seed = CryptoJS.AES.decrypt(encryptedVault, password).toString(
        CryptoJS.enc.Utf8
      );
      if (!bip39.validateMnemonic(seed)) {
        setAddError("Failed to decrypt seed phrase. Wrong password?");
        setIsAdding(false);
        return;
      }
      // Always reload wallets from localStorage to avoid stale state
      let currentWallets: WalletAccount[] = [];
      try {
        const stored = localStorage.getItem(`wallets_${rootAddress}`);
        if (stored) currentWallets = JSON.parse(stored);
      } catch {}
      const nextIndex = currentWallets.length;
      let path = "m/44'/60'/0'/0/" + nextIndex; // ETH default path
      if (newWalletType === "SAGA") {
        path = "m/44'/60'/0'/0/" + nextIndex;
      }
      const hdWallet = ethers.HDNodeWallet.fromPhrase(seed, path);
      const newWallet = {
        address: hdWallet.address,
        name: newWalletName.trim(),
        type: newWalletType,
        index: nextIndex,
      };
      const updatedWallets = [...currentWallets, newWallet];
      localStorage.setItem(
        `wallets_${rootAddress}`,
        JSON.stringify(updatedWallets)
      );
      localStorage.setItem(
        `activeWalletIndex_${rootAddress}`,
        nextIndex.toString()
      );
      setWallets(updatedWallets);
      setActiveWalletIndex(nextIndex);
      setShowAddModal(false);
      setNewWalletName("");
      setNewWalletType("ETH");
      setIsAdding(false);
      setTimeout(() => {
        window.dispatchEvent(new Event("walletsUpdated"));
      }, 0);
    } catch (e) {
      setAddError("Failed to add wallet. Please try again.");
      setIsAdding(false);
    }
  };

  // Wallets View
  if (walletSubTab === "wallets") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        {/* Toast notification */}
        {copied && (
          <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
            <span className="text-green-300 text-xl">Copied successfully!</span>
          </div>
        )}
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          🏠 My Wallets
        </h3>
        {/* List all wallets */}
        <div className="space-y-4 mb-4">
          {wallets.map((w, idx) => (
            <div
              key={w.address}
              className={`bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-black rounded-xl p-4 flex items-center justify-between cursor-pointer ${
                idx === activeWalletIndex
                  ? "ring-4 ring-yellow-400"
                  : "hover:bg-blue-200"
              }`}
              onClick={() => handleSelectWallet(idx)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                  🎮
                </div>
                <div>
                  <h4 className="font-black text-lg">{w.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600 font-mono mb-0">
                      {w.address.slice(0, 8)}...{w.address.slice(-6)}
                    </p>
                    <button
                      className="text-gray-900 hover:text-black focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(w.address);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1200);
                      }}
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
                  <p className="text-xs text-gray-500 mt-1">Type: {w.type}</p>
                </div>
              </div>
              <div className="text-right">
                {idx === activeWalletIndex && (
                  <>
                    <p className="font-black text-xl text-green-600">
                      ${totalPortfolioValue.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ETH: {ethBalance}
                    </p>
                    <p className="text-xs text-gray-500">SAGA: {sagaBalance}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl py-3 font-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Wallet
        </button>
        {/* Add New Wallet Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl border-4 border-black p-8 w-full max-w-md relative">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Add New Wallet
              </h2>
              <input
                type="text"
                className="w-full border-2 border-black rounded-xl p-3 mb-3"
                placeholder="Enter wallet name"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                disabled={_isAdding}
              />
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="walletType"
                    value="ETH"
                    checked={newWalletType === "ETH"}
                    onChange={() => setNewWalletType("ETH")}
                    disabled={_isAdding}
                  />
                  ETH
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="walletType"
                    value="SAGA"
                    checked={newWalletType === "SAGA"}
                    onChange={() => setNewWalletType("SAGA")}
                    disabled={_isAdding}
                  />
                  SAGA
                </label>
              </div>
              {addError && (
                <div className="text-red-600 mb-3 text-center">{addError}</div>
              )}
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow mb-2"
                onClick={handleAddWallet}
                disabled={_isAdding}
              >
                {_isAdding ? "Adding..." : "Add Wallet"}
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-xl border-2 border-black shadow"
                onClick={() => {
                  setShowAddModal(false);
                  setNewWalletName("");
                  setNewWalletType("ETH");
                  setAddError("");
                }}
                disabled={_isAdding}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Receive View
  if (walletSubTab === "receive") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        {/* Toast notification */}
        {copied && (
          <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
            <span className="text-green-300 text-xl">Copied successfully!</span>
          </div>
        )}
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
                value={activeWallet?.address || ""}
                readOnly
                className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-2 font-mono text-sm"
              />
              <button
                className="bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl px-4 py-2 font-black"
                onClick={() => {
                  if (activeWallet) {
                    navigator.clipboard.writeText(activeWallet.address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  }
                }}
              >
                Copy
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              ETH: {ethBalance} | SAGA: {sagaBalance}
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
