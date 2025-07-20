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
  lootieBalance: string;
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
        <div className="text-red-600 mb-3 text-center font-bold">Cảnh báo: Không chia sẻ private key cho bất kỳ ai. Ai có private key sẽ kiểm soát toàn bộ tài sản của bạn!</div>
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
  lootieBalance,
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
  const [walletBalances, setWalletBalances] = React.useState<string[]>([]);
  const [copiedWalletIdx, setCopiedWalletIdx] = React.useState<number | null>(
    null
  );

  // Send View states
  const [sendToAddress, setSendToAddress] = React.useState("");
  const [sendAmount, setSendAmount] = React.useState("");
  const [selectedWalletIndex, setSelectedWalletIndex] = React.useState<
    number | null
  >(null);
  const [isSending, setIsSending] = React.useState(false);
  const [copiedReceive, setCopiedReceive] = React.useState(false);
  const [showTxSuccess, setShowTxSuccess] = React.useState(false);
  const [lastTxHash, setLastTxHash] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalWallets(wallets);
  }, [wallets]);

  // Ưu tiên lấy balance từ RPC chainlet, chỉ dùng localStorage để cache
  React.useEffect(() => {
    const fetchBalances = async () => {
      if (wallets.length > 0) {
        try {
          const { ethers } = await import("ethers");
          const { SAGA_RPC } = await import("../data/contractAddresses");
          const provider = new ethers.JsonRpcProvider(SAGA_RPC);
          const balances = await Promise.all(
            wallets.map(async (wallet) => {
              try {
                const balance = await provider.getBalance(wallet.address);
                return ethers.formatEther(balance);
              } catch (e) {
                return "0";
              }
            })
          );
          // Save to localStorage
          const rootAddress = localStorage.getItem("currentRootAddress") || "";
          localStorage.setItem(`walletBalances_${rootAddress}`, JSON.stringify(balances));
          setWalletBalances(balances);
        } catch (error) {
          // Nếu fetch từ RPC lỗi, fallback localStorage
          const rootAddress = localStorage.getItem("currentRootAddress") || "";
          const savedBalances = localStorage.getItem(`walletBalances_${rootAddress}`);
          if (savedBalances) {
            try {
              const balances = JSON.parse(savedBalances);
              if (balances.length === wallets.length) {
                setWalletBalances(balances);
                return;
              }
            } catch {}
          }
          // Nếu không có cache, set 0
          setWalletBalances(wallets.map(() => "0"));
        }
      }
    };
    fetchBalances();
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

  // Handle Send function
  const handleSend = async () => {
    // Validate địa chỉ nhận
    const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);
    if (!sendToAddress || !isValidAddress(sendToAddress)) {
      alert("Địa chỉ nhận không hợp lệ. Địa chỉ phải bắt đầu bằng 0x và có 42 ký tự hex.");
      return;
    }
    if (!sendAmount || parseFloat(sendAmount) <= 0) {
      alert("Vui lòng nhập số lượng hợp lệ");
      return;
    }
    const currentBalance = walletBalances[activeWalletIndex] || "0";
    if (parseFloat(sendAmount) > parseFloat(currentBalance)) {
      alert("Số dư không đủ");
      return;
    }
    setIsSending(true);
    try {
      // Import Saga infrastructure
      const { SAGA_INFRASTRUCTURE, crossChainTransfer } = await import(
        "../data/lootieChainletConfig"
      );
      const { ethers, HDNodeWallet } = await import("ethers");
      const { SAGA_RPC } = await import("../data/contractAddresses");

      // Only support same-chainlet transfer for now (onchain send)
      const senderChainlet = "lootie"; // Current chainlet
      const receiverChainlet = "lootie"; // Same chainlet for now

      let txResult;
      if (senderChainlet !== receiverChainlet) {
        // Cross-chain transfer (API, not onchain)
        txResult = await crossChainTransfer(
          senderChainlet,
          receiverChainlet,
          sendAmount,
          sendToAddress
        );
      } else {
        // === REAL ONCHAIN SEND LOGIC ===
        // 1. Prompt for password to decrypt vault
        let password = prompt("Enter your password to sign the transaction");
        if (!password) throw new Error("Password required");
        const encryptedVault = localStorage.getItem("encryptedVault") || "";
        const decrypted = CryptoJS.AES.decrypt(
          encryptedVault,
          password
        ).toString(CryptoJS.enc.Utf8);
        if (!decrypted || !bip39.validateMnemonic(decrypted)) {
          throw new Error("Wrong password or vault corrupted");
        }
        const mnemonic = decrypted;
        // 2. Derive private key for active wallet
        const hdNode = HDNodeWallet.fromPhrase(mnemonic);
        const child = hdNode.deriveChild(
          wallets[activeWalletIndex]?.index || 0
        );
        const privateKey = child.privateKey;
        // 3. Create ethers.Wallet and provider (set chainId explicitly)
        const provider = new ethers.JsonRpcProvider(SAGA_RPC, { chainId: 31338, name: "lootie" });
        const wallet = new ethers.Wallet(privateKey, provider);
        // 4. Send transaction with explicit gasLimit and gasPrice
        let tx;
        try {
          tx = await wallet.sendTransaction({
            to: sendToAddress,
            value: ethers.parseEther(sendAmount),
            gasLimit: 100000, // Higher gas limit for Saga chainlet
            gasPrice: 0       // Saga chainlet may require 0 gas price
          });
        } catch (err) {
          // If fails, try with default gasPrice (ethers may auto-detect)
          try {
            tx = await wallet.sendTransaction({
              to: sendToAddress,
              value: ethers.parseEther(sendAmount),
              gasLimit: 100000
            });
          } catch (err2) {
            // If still fails, try with lower gasLimit
            tx = await wallet.sendTransaction({
              to: sendToAddress,
              value: ethers.parseEther(sendAmount),
              gasLimit: 21000
            });
          }
        }
        // 5. Wait for confirmation
        const receipt = await tx.wait();
        txResult = {
          success: receipt.status === 1,
          hash: tx.hash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed?.toString() || "0",
          gasPrice: tx.gasPrice?.toString() || "0",
          chainlet: senderChainlet,
        };
      }

      // Calculate new balances
      const senderBalance = parseFloat(currentBalance) - parseFloat(sendAmount);
      const receiverBalance =
        parseFloat(
          walletBalances.find(
            (_, idx) => wallets[idx]?.address === sendToAddress
          ) || "0"
        ) + parseFloat(sendAmount);

      // Update wallet balances array
      const newBalances = [...walletBalances];
      newBalances[activeWalletIndex] = senderBalance.toFixed(4);

      // Update receiver balance if it's one of our wallets
      const receiverIndex = wallets.findIndex(
        (w) => w.address === sendToAddress
      );
      if (receiverIndex !== -1) {
        newBalances[receiverIndex] = receiverBalance.toFixed(4);
      }

      // Persist balances to localStorage
      const rootAddress = localStorage.getItem("currentRootAddress") || "";
      localStorage.setItem(
        `walletBalances_${rootAddress}`,
        JSON.stringify(newBalances)
      );
      setWalletBalances(newBalances);

      // Add to transaction history with Saga chainlet info
      const txHistory = JSON.parse(
        localStorage.getItem("lootie_tx_history") || "[]"
      );
      const newTransaction = {
        type: "Send LOOTIE",
        from: wallets[activeWalletIndex]?.address,
        to: sendToAddress,
        amount: sendAmount,
        hash: txResult.hash,
        blockNumber: txResult.blockNumber,
        gasUsed: txResult.gasUsed,
        gasPrice: txResult.gasPrice,
        status: txResult.success ? "success" : "failed",
        time: new Date().toLocaleString(),
        timestamp: Date.now(),
        // Saga-specific data
        chainlet: txResult.chainlet || "lootie",
        crossChain: senderChainlet !== receiverChainlet,
        sagaInfrastructure: true,
        // Add receiver info if it's one of our wallets
        receiverName:
          wallets.find((w) => w.address === sendToAddress)?.name ||
          "External Wallet",
        senderName: wallets[activeWalletIndex]?.name || "Unknown",
      };

      txHistory.unshift(newTransaction); // Add to beginning of array
      localStorage.setItem("lootie_tx_history", JSON.stringify(txHistory));

      // Reset form
      setSendToAddress("");
      setSendAmount("");
      setSelectedWalletIndex(null);

      // Show custom popup instead of alert
      setLastTxHash(txResult.hash);
      setShowTxSuccess(true);
      setTimeout(() => {
        setShowTxSuccess(false);
        window.location.reload();
      }, 1000);

      // Trigger wallet update event
      window.dispatchEvent(new Event("walletsUpdated"));
    } catch (error) {
      // Log lỗi chi tiết
      console.error("Transaction failed:", error);
      alert((error && error.message) ? error.message : JSON.stringify(error));
    } finally {
      setIsSending(false);
    }
  };

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
          type: "LOOTIE",
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
                      setCopiedWalletIdx(idx);
                      setTimeout(() => setCopiedWalletIdx(null), 1200);
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
                  {copiedWalletIdx === idx && (
                    <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
                      <span className="text-green-300 text-xl">
                        Copied successfully!
                      </span>
                    </div>
                  )}
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
              </div>
              <div className="text-right">
                {/* Hiển thị số dư riêng biệt cho từng ví */}
                <p className="font-black text-lg">
                  {walletBalances[idx]
                    ? parseFloat(walletBalances[idx]).toFixed(1)
                    : "0.0"}
                </p>
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
                    setCopiedReceive(true);
                    setTimeout(() => setCopiedReceive(false), 1200);
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
              {copiedReceive && (
                <div className="fixed left-1/2 top-12 z-50 -translate-x-1/2 bg-green-800 text-white text-lg font-bold flex items-center gap-3 px-6 py-3 rounded-full shadow-lg animate-fade-in">
                  <span className="text-green-300 text-xl">
                    Copied successfully!
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              LOOTIE:{" "}
              {lootieBalance ? parseFloat(lootieBalance).toFixed(4) : "0.0000"}
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
          {/* Select Destination Wallet */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">Send to Wallet</label>
            <div className="space-y-2">
              {localWallets.map((wallet, idx) => (
                <div
                  key={wallet.address}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWalletIndex === idx
                      ? "border-yellow-400 bg-yellow-100"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedWalletIndex(idx);
                    setSendToAddress(wallet.address);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      🎮
                    </div>
                    <div>
                      <p className="font-bold">{wallet.name}</p>
                      <p className="text-xs text-gray-600 font-mono">
                        {wallet.address.slice(0, 8)}...
                        {wallet.address.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {walletBalances[idx]
                        ? parseFloat(walletBalances[idx]).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Address Input */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">
              Or Enter Address Manually
            </label>
            <input
              type="text"
              placeholder="0x... or ENS name"
              value={sendToAddress}
              onChange={(e) => {
                setSendToAddress(e.target.value);
                setSelectedWalletIndex(null);
              }}
              className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 font-mono"
            />
          </div>

          {/* Amount Input */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">Amount (LOOTIE)</label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-2 font-mono text-right"
                max={walletBalances[activeWalletIndex] || "0"}
                step="0.0001"
              />
              <button
                className="bg-blue-200 hover:bg-blue-300 border-2 border-black rounded-xl px-3 py-2 font-bold"
                onClick={() =>
                  setSendAmount(walletBalances[activeWalletIndex] || "0")
                }
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Available:{" "}
              {walletBalances[activeWalletIndex]
                ? parseFloat(walletBalances[activeWalletIndex]).toFixed(4)
                : "0.0000"}
            </p>
          </div>

          <button
            className="w-full bg-yellow-300 hover:bg-yellow-400 border-4 border-black rounded-xl py-4 font-black text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={
              !sendToAddress ||
              !sendAmount ||
              parseFloat(sendAmount) <= 0 ||
              isSending
            }
          >
            {isSending ? "⏳ SENDING..." : "🚀 SEND NOW!"}
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
          🔄 Swap to LOOTIE
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

          {/* To LOOTIE */}
          <div className="bg-yellow-100 border-2 border-black rounded-xl p-4">
            <label className="block font-bold mb-2">To</label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <span className="font-black text-lg">LOOTIE</span>
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
            {txHistory.map((tx, idx) => (
              <div
                key={tx.hash + idx}
                className="border-2 border-black rounded-xl p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {tx.type === "Send LOOTIE"
                        ? "💸"
                        : tx.type === "Mint NFT"
                        ? "🪙"
                        : "🔁"}
                    </span>
                    <div>
                      <div className="font-bold text-lg">{tx.type}</div>
                      <div className="text-xs text-gray-500">
                        {tx.time || ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold px-2 py-1 rounded ${
                        tx.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tx.status || "success"}
                    </div>
                  </div>
                </div>

                {tx.type === "Send LOOTIE" && (
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Amount:</span>
                      <span className="font-bold">{tx.amount} LOOTIE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">From:</span>
                      <span className="font-mono text-xs">
                        {tx.senderName || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">To:</span>
                      <span className="font-mono text-xs">
                        {tx.receiverName || "External Wallet"}
                      </span>
                    </div>
                    {/* Saga Infrastructure Info */}
                    {tx.sagaInfrastructure && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Chainlet:</span>
                          <span className="font-bold text-blue-600">
                            {tx.chainlet || "lootie"}
                          </span>
                        </div>
                        {tx.crossChain && (
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Type:</span>
                            <span className="font-bold text-purple-600">
                              Cross-chain Transfer
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-300 pt-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-medium">Hash:</span>
                      <div className="font-mono text-gray-700 break-all mt-1">
                        {tx.hash}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Block:</span>
                      <div className="font-mono text-gray-700 mt-1">
                        {tx.blockNumber || "N/A"}
                      </div>
                    </div>
                    {tx.gasUsed && (
                      <div>
                        <span className="font-medium">Gas Used:</span>
                        <div className="font-mono text-gray-700 mt-1">
                          {tx.gasUsed.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {tx.gasPrice && (
                      <div>
                        <span className="font-medium">Gas Price:</span>
                        <div className="font-mono text-gray-700 mt-1">
                          {parseInt(tx.gasPrice) / 1e9} Gwei
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => navigator.clipboard.writeText(tx.hash)}
                    >
                      Copy Hash
                    </button>
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => {
                        const explorerUrl = `https://explorer.saga.xyz/tx/${tx.hash}`;
                        window.open(explorerUrl, "_blank");
                      }}
                    >
                      View on Explorer
                    </button>
                  </div>
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
