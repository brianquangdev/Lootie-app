import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { ethers } from "ethers";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";

// Import components
import Header from "./components/Header";
import MobileTabNav from "./components/MobileTabNav";
import HeroSection from "./components/HeroSection";
import PortfolioOverview from "./components/PortfolioOverview";
import TokenHoldings from "./components/TokenHoldings";
import NFTCollection from "./components/NFTCollection";
import WalletSidebar from "./components/WalletSidebar";
import WalletMain from "./components/WalletMain";
import QuestHub from "./components/QuestHub";
import QuestDetailModal from "./components/QuestDetailModal";
import Footer from "./components/Footer";
import Collabs from "./components/Collabs";
import Communities from "./components/Communities";
import { mockHunters } from "./data/mockCollabs";
import WalletOnboardingModal from "./components/WalletOnboardingModal";
import UnlockWalletModal from "./components/UnlockWalletModal";
import { SAGA_RPC } from "./data/contractAddresses";

type WalletType = {
  address: string;
  privateKey: string;
  mnemonic?: string;
};

function AppContent() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [walletSubTab, setWalletSubTab] = useState("wallets");
  const [swapAmount, setSwapAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("GLD");
  const [portfolioView, setPortfolioView] = useState("tokens"); // tokens or nfts
  const [heroSlide, setHeroSlide] = useState(0);
  const [collabsFilter, setCollabsFilter] = useState("all");
  const [collabsSearch, setCollabsSearch] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showImportInput, setShowImportInput] = useState(false);
  const [importPrivateKey, setImportPrivateKey] = useState("");
  const [modalError, setModalError] = useState("");
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [wallets, setWallets] = useState<any[]>([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState<number>(0);
  const [ethBalance, setEthBalance] = useState<string>("0");
  const [isLocked, setIsLocked] = useState(false);
  const [showUnlockSeed, setShowUnlockSeed] = useState(false);

  const {
    login: privyLogin,
    logout: privyLogout,
    ready: privyReady,
    authenticated: privyAuthenticated,
    user: privyUser,
  } = usePrivy();

  // Backend URL (configurable)
  // Use (window as any) to avoid TypeScript error for custom property
  const BACKEND_URL =
    (window as any).REACT_APP_BACKEND_URL ||
    window.location.origin.replace(/:\d+$/, ":3001");

  // Auto-slide hero every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Hàm load wallets từ localStorage
  const loadWalletsFromStorage = () => {
    const rootAddress = localStorage.getItem("currentRootAddress") || "";
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
        const arr = JSON.parse(stored);
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
  };

  // Load wallets và activeWalletIndex từ localStorage khi rootAddress thay đổi
  useEffect(() => {
    loadWalletsFromStorage();
  }, []);

  // Cập nhật ethBalance khi activeWallet thay đổi
  useEffect(() => {
    const activeWallet = wallets[activeWalletIndex];
    if (activeWallet && activeWallet.type === "ETH") {
      async function fetchBalance() {
        try {
          const provider = new ethers.JsonRpcProvider(SAGA_RPC);
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
  }, [wallets, activeWalletIndex]);

  // Log chi tiết giá trị localStorage wallet
  console.log(
    "DEBUG: isLocked =",
    isLocked,
    "wallet =",
    wallets[activeWalletIndex],
    "localStorage.wallet =",
    localStorage.getItem("wallet")
  );

  // Inactivity timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsLocked(true), 300000); // 5 phút
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  // Add debug log to check isLocked and wallet
  console.log(
    "DEBUG: isLocked =",
    isLocked,
    "wallet =",
    wallets[activeWalletIndex]
  );

  // Determine if user is logged in with OAuth
  const isOAuth =
    privyAuthenticated &&
    privyUser &&
    privyUser.wallet &&
    typeof privyUser.wallet.address === "string" &&
    privyUser.wallet.address.length > 0;
  const oAuthWallet =
    isOAuth && privyUser.wallet && privyUser.wallet.address
      ? {
          address: privyUser.wallet.address,
          name: privyUser.email || "OAuth Wallet",
          type: "ETH",
        }
      : null;

  // Handler for Create Wallet button in Header
  const handleCreateWalletClick = () => {
    setShowWalletModal(true);
    setShowImportInput(false);
    setModalError("");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("encryptedVault");
    localStorage.removeItem("currentRootAddress");
    localStorage.removeItem("wallet");
    setWallets([]);
    setActiveWalletIndex(0);
    setEthBalance("0");
    window.location.reload();
  };

  // Create a new wallet
  const handleCreateNewWallet = async () => {
    setIsWalletLoading(true);
    setModalError("");
    try {
      const res = await axios.post(`${BACKEND_URL}/api/wallet/create`);
      const { address, privateKey, mnemonic } = res.data;
      const walletData = { address, privateKey, mnemonic };
      localStorage.setItem("wallet", JSON.stringify(walletData));
      // Cập nhật lại danh sách ví từ localStorage
      loadWalletsFromStorage();
      setShowWalletModal(false);
      setActiveTab("portfolio");
    } catch (err) {
      setModalError("Failed to create wallet. Please try again.");
    } finally {
      setIsWalletLoading(false);
    }
  };

  // Import wallet from private key
  const handleImportWallet = async () => {
    setIsWalletLoading(true);
    setModalError("");
    try {
      const res = await axios.post(`${BACKEND_URL}/api/wallet/import`, {
        privateKey: importPrivateKey.trim(),
      });
      const { address } = res.data;
      const walletData = { address, privateKey: importPrivateKey.trim() };
      localStorage.setItem("wallet", JSON.stringify(walletData));
      // Cập nhật lại danh sách ví từ localStorage
      loadWalletsFromStorage();
      setShowWalletModal(false);
      setImportPrivateKey("");
      setShowImportInput(false);
      setActiveTab("portfolio");
    } catch (err) {
      setModalError("Invalid private key. Please check and try again.");
    } finally {
      setIsWalletLoading(false);
    }
  };

  // Hàm chọn ví mới
  const handleSelectWallet = (idx: number) => {
    setActiveWalletIndex(idx);
    const rootAddress = localStorage.getItem("currentRootAddress") || "";
    localStorage.setItem(`activeWalletIndex_${rootAddress}`, idx.toString());
    window.dispatchEvent(new Event("walletsUpdated"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 font-sans">
      {/* Unlock Wallet Modal */}
      {isLocked && wallets[activeWalletIndex] && (
        <UnlockWalletModal
          onUnlock={() => setIsLocked(false)}
          onShowSeed={() => setShowUnlockSeed(true)}
          showSeed={showUnlockSeed}
          onHideSeed={() => setShowUnlockSeed(false)}
        />
      )}
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateWalletClick={handleCreateWalletClick}
        wallet={isOAuth ? oAuthWallet : wallets[activeWalletIndex]}
        handleLogout={handleLogout}
        balance={ethBalance}
        renderExtraButton={
          // Ẩn nút Sign In và Create Wallet nếu đã có ví hoặc đã đăng nhập OAuth
          wallets.length > 0 || isOAuth ? null : !privyAuthenticated &&
            privyReady ? (
            <button
              className="ml-2 bg-blue-400 hover:bg-blue-500 border-2 border-black rounded-xl px-4 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#000] transition-all"
              onClick={privyLogin}
            >
              Sign In
            </button>
          ) : privyAuthenticated ? (
            <button
              className="ml-2 bg-gray-400 hover:bg-gray-500 border-2 border-black rounded-xl px-4 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#000] transition-all"
              onClick={privyLogout}
            >
              Logout
            </button>
          ) : null
        }
      />

      {/* Mobile Tab Navigation */}
      <MobileTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section - luôn hiện khi ở tab Portfolio */}
      {activeTab === "portfolio" && (
        <HeroSection heroSlide={heroSlide} setHeroSlide={setHeroSlide} />
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 pb-8">
        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <PortfolioOverview
              portfolioView={portfolioView}
              setPortfolioView={setPortfolioView}
              wallets={wallets}
            />
            {portfolioView === "tokens" && <TokenHoldings wallets={wallets} />}
            {portfolioView === "nfts" && <NFTCollection />}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && !isOAuth && (
          <div className="flex gap-6">
            <WalletSidebar
              walletSubTab={walletSubTab}
              setWalletSubTab={setWalletSubTab}
              wallet={wallets[activeWalletIndex]}
              balance={ethBalance}
            />
            <div className="flex-1">
              <WalletMain
                walletSubTab={walletSubTab}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
                wallet={wallets[activeWalletIndex]}
                balance={ethBalance}
                wallets={wallets}
                activeWalletIndex={activeWalletIndex}
                ethBalance={ethBalance}
                onSelectWallet={handleSelectWallet}
              />
            </div>
          </div>
        )}

        {/* QuestHub Tab */}
        {activeTab === "questhub" && (
          <QuestHub setSelectedQuest={setSelectedQuest} />
        )}

        {/* Collabs Tab */}
        {activeTab === "collabs" && (
          <Collabs
            hunters={mockHunters}
            filter={collabsFilter}
            setFilter={setCollabsFilter}
            search={collabsSearch}
            setSearch={setCollabsSearch}
          />
        )}

        {/* Communities Tab */}
        {activeTab === "communities" && <Communities />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Quest Detail Modal */}
      <QuestDetailModal
        selectedQuest={selectedQuest}
        setSelectedQuest={setSelectedQuest}
      />

      {/* Wallet Onboarding Modal */}
      {!isOAuth && (
        <WalletOnboardingModal
          visible={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onCreate={handleCreateNewWallet}
          onImport={handleImportWallet}
          isLoading={isWalletLoading}
          error={modalError}
          showImportInput={showImportInput}
          setShowImportInput={setShowImportInput}
          importPrivateKey={importPrivateKey}
          setImportPrivateKey={setImportPrivateKey}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PrivyProvider
      appId="cmcvugdsw01v3lf0m31a1ts0j"
      config={{
        loginMethods: ["google", "apple"],
        appearance: {
          theme: "light",
          accentColor: "#facc15",
        },
      }}
    >
      <AppContent />
    </PrivyProvider>
  );
}
