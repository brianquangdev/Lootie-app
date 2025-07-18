import * as React from "react";
import { useEffect, useState } from "react";
import copyIcon from "../assets/—Pngtree—vector copy icon_4013516.png";
import { mockTokens } from "../data/mockTokens";
import { mockNFTs } from "../data/mockNFTs";
import { Wallet, HDNodeWallet } from "ethers";
import CryptoJS from "crypto-js";
import * as bip39 from "bip39";
import WalletOnboardingModal from "./WalletOnboardingModal";

declare module "*.png";

interface WalletAccount {
  address: string;
  name: string;
  type: string;
  index: number;
}

interface WalletMainProps {
  walletSubTab: string;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  swapAmount: string;
  setSwapAmount: (amount: string) => void;
  onWalletChange?: () => void;
  wallet: WalletAccount | null;
  balance: string;
  wallets: WalletAccount[];
  activeWalletIndex: number;
  ethBalance: string;
  onSelectWallet: (idx: number) => void;
}

const ExportPrivateKeyModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  encryptedVault: string;
  walletIndex: number;
  wallets: WalletAccount[];
}> = ({ visible, onClose, encryptedVault, walletIndex, wallets }) => {
  const [password, setPassword] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");

  const handleExport = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedVault, password).toString(
        CryptoJS.enc.Utf8
      );
      if (!decrypted || !bip39.validateMnemonic(decrypted)) {
        setError("Wrong password or vault corrupted");
        return;
      }
      // Lấy ví đúng index bằng HDNodeWallet
      const mnemonic = decrypted;
      const hdNode = HDNodeWallet.fromPhrase(mnemonic);
      const child = hdNode.deriveChild(wallets[walletIndex]?.index || 0);
      setPrivateKey(child.privateKey);
      setError("");
    } catch {
      setError("Wrong password or vault corrupted");
    }
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-4 border-black p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-lg font-bold text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Export Private Key
        </h2>
        {!privateKey ? (
          <>
            <input
              type="password"
              className="w-full border-2 border-black rounded-xl p-3 mb-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="text-red-600 mb-3 text-center">{error}</div>
            )}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
              onClick={handleExport}
            >
              Show Private Key
            </button>
          </>
        ) : (
          <>
            <div className="bg-gray-100 p-4 rounded-xl mb-3 text-center select-all break-all font-mono">
              {privateKey}
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
              onClick={() => {
                navigator.clipboard.writeText(privateKey);
              }}
            >
              Copy Private Key
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const WalletMain: React.FC<WalletMainProps> = ({
  walletSubTab,
  selectedToken,
  setSelectedToken,
  swapAmount,
  setSwapAmount,
  onWalletChange,
  wallet: _wallet,
  balance: _balance,
  wallets,
  activeWalletIndex,
  ethBalance,
  onSelectWallet,
}) => {
  const [exportModalOpen, setExportModalOpen] = React.useState(false);
  const [exportWalletIndex, setExportWalletIndex] = React.useState<
    number | null
  >(null);
  const encryptedVault = localStorage.getItem("encryptedVault") || "";
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);
  const [localWallets, setLocalWallets] =
    React.useState<WalletAccount[]>(wallets);

  React.useEffect(() => {
    setLocalWallets(wallets);
  }, [wallets]);

  React.useEffect(() => {
    const updateWallets = () => {
      const rootAddress = localStorage.getItem("currentRootAddress") || "";
      let walletsArr: WalletAccount[] = [];
      try {
        walletsArr =
          JSON.parse(
            localStorage.getItem(`wallets_${rootAddress}`) || "null"
          ) || [];
      } catch {}
      setLocalWallets(walletsArr);
    };
    window.addEventListener("walletsUpdated", updateWallets);
    return () => {
      window.removeEventListener("walletsUpdated", updateWallets);
    };
  }, []);

  // Wallets View
  if (walletSubTab === "wallets") {
    const handleAddNewWallet = () => {
      const encryptedVault = localStorage.getItem("encryptedVault") || "";
      const password = prompt("Enter your password to add a new wallet");
      if (!password) return;
      try {
        const decrypted = CryptoJS.AES.decrypt(
          encryptedVault,
          password
        ).toString(CryptoJS.enc.Utf8);
        if (!decrypted || !bip39.validateMnemonic(decrypted)) {
          alert("Wrong password or vault corrupted");
          return;
        }
        const mnemonic = decrypted;
        // Lấy rootAddress hiện tại
        const rootAddress = localStorage.getItem("currentRootAddress") || "";
        let walletsArr: WalletAccount[] = [];
        try {
          walletsArr =
            JSON.parse(
              localStorage.getItem(`wallets_${rootAddress}`) || "null"
            ) || [];
        } catch {}
        const nextIndex =
          walletsArr.length > 0
            ? Math.max(...walletsArr.map((w) => w.index)) + 1
            : 0;
        let walletName = prompt("Enter a name for your new wallet:");
        if (!walletName || !walletName.trim()) {
          walletName = `Account ${nextIndex + 1}`;
        }
        const hdNode = HDNodeWallet.fromPhrase(mnemonic);
        const child = hdNode.deriveChild(nextIndex);
        const newWallet: WalletAccount = {
          address: child.address,
          name: walletName.trim(),
          type: "ETH",
          index: nextIndex,
        };
        walletsArr.push(newWallet);
        localStorage.setItem(
          `wallets_${rootAddress}`,
          JSON.stringify(walletsArr)
        );
        localStorage.setItem(
          `activeWalletIndex_${rootAddress}`,
          walletsArr.length - 1 + ""
        );
        window.dispatchEvent(new Event("walletsUpdated"));
        alert("New wallet added!");
        window.location.reload();
      } catch {
        alert("Wrong password or vault corrupted");
      }
    };
    const handleSelectWallet = (idx: number) => {
      const rootAddress = localStorage.getItem("currentRootAddress") || "";
      localStorage.setItem(`activeWalletIndex_${rootAddress}`, idx + "");
      window.dispatchEvent(new Event("walletsUpdated"));
      if (onSelectWallet) onSelectWallet(idx);
    };
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          🏠 My Wallets
        </h3>
        {/* List all wallets */}
        <div className="space-y-4 mb-4">
          {localWallets.map((w, idx) => (
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
                <h4 className="font-black text-lg">{w.name}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 font-mono mb-0">
                    {w.address.slice(0, 8)}...{w.address.slice(-6)}
                  </p>
                  <button
                    className="text-gray-900 hover:text-black focus:outline-none hover:shadow-[0_0_10px_2px_#fde047] hover:scale-110 transition-all duration-200"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      boxShadow: "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(w.address);
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
                  {/* Nút Export Private Key */}
                  <button
                    className="ml-1 text-gray-900 hover:text-black focus:outline-none border border-black rounded px-2 py-1 text-xs font-bold bg-yellow-200 hover:bg-yellow-300"
                    style={{ background: "none", boxShadow: "none" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExportWalletIndex(idx);
                      setExportModalOpen(true);
                    }}
                    title="Export Private Key"
                  >
                    🔑
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Type: {w.type}</p>
              </div>
              <div className="text-right">
                {/* Hiển thị số dư mock hoặc prop balance nếu cần */}
                <p className="font-black text-lg">{_balance}</p>
              </div>
            </div>
          ))}
          {/* Nút Add New Wallet */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-black border-2 border-dashed border-black bg-yellow-50 hover:bg-yellow-200 transition-all duration-200 mt-2"
            onClick={handleAddNewWallet}
          >
            <span className="text-2xl">➕</span> Add New Wallet
          </button>
        </div>
        {/* Modal Export Private Key */}
        <ExportPrivateKeyModal
          visible={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          encryptedVault={encryptedVault}
          walletIndex={exportWalletIndex ?? 0}
          wallets={localWallets}
        />
        {/* Modal Onboarding (Create Wallet) */}
        <WalletOnboardingModal
          visible={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          onCreate={async () => {}}
          onImport={async () => {}}
          isLoading={false}
          error={""}
          showImportInput={false}
          setShowImportInput={() => {}}
          importPrivateKey={""}
          setImportPrivateKey={() => {}}
        />
      </div>
    );
  }

  // Receive View
  if (walletSubTab === "receive") {
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        {/* Toast notification */}
        {/* {copied && (
          <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
            <span className="text-green-300 text-xl">Copied successfully!</span>
          </div>
        )} */}
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
                value={wallets[activeWalletIndex]?.address || ""}
                readOnly
                className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-2 font-mono text-sm"
              />
              <button
                className="bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl px-4 py-2 font-black hover:shadow-[0_0_10px_2px_#fde047] hover:scale-110 transition-all duration-200"
                onClick={() => {
                  if (wallets[activeWalletIndex]) {
                    navigator.clipboard.writeText(
                      wallets[activeWalletIndex].address
                    );
                    // setCopied(true);
                    // setTimeout(() => setCopied(false), 1200);
                  }
                }}
              >
                <img
                  src={copyIcon}
                  alt="Copy"
                  className="w-5 h-5 object-contain text-gray-900 hover:text-black focus:outline-none hover:shadow-[0_0_10px_2px_#fde047] hover:scale-110 transition-all duration-200"
                  style={{
                    filter: "invert(1) brightness(0.1)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    boxShadow: "none",
                  }}
                />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              ETH: {ethBalance} | SAGA: {_balance}
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
                    ? (mockTokens.find((t) => t.name === selectedToken)
                        ?.price || 0) *
                      parseFloat(swapAmount) *
                      0.95
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

  // Transaction History View
  if (walletSubTab === "history") {
    // Lấy lịch sử tx từ localStorage
    let txHistory: any[] = [];
    try {
      txHistory = JSON.parse(localStorage.getItem("lootie_tx_history") || "[]");
    } catch {}
    return (
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          📜 Transaction History
        </h3>
        {txHistory.length === 0 ? (
          <div className="text-gray-500 text-center font-bold py-8">
            No transactions yet.
          </div>
        ) : (
          <div className="space-y-4">
            {txHistory
              .slice()
              .reverse()
              .map((tx, idx) => (
                <div
                  key={tx.hash + idx}
                  className="border-2 border-black rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {tx.type === "Mint NFT" ? "🪙" : "🔁"}
                    </span>
                    <div>
                      <div className="font-bold text-lg">{tx.type}</div>
                      <div className="text-xs text-gray-500">
                        {tx.time || ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <div className="font-mono text-xs text-gray-700 break-all">
                      Hash: {tx.hash}
                    </div>
                    <button
                      className="text-blue-600 text-xs underline mt-1"
                      onClick={() => navigator.clipboard.writeText(tx.hash)}
                    >
                      Copy Hash
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default WalletMain;
