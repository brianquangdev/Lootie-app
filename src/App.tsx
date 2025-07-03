import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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

type WalletType = {
  address: string;
  privateKey: string;
  mnemonic?: string;
};

function App() {
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
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [balance, setBalance] = useState("0");
  const [isLocked, setIsLocked] = useState(false);
  const [showUnlockSeed, setShowUnlockSeed] = useState(false);

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

  // Load wallet from localStorage on mount
  useEffect(() => {
    const saved = window.localStorage.getItem("wallet");
    if (saved) {
      try {
        setWallet(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Fetch ETH balance when wallet changes
  useEffect(() => {
    if (wallet && wallet.address) {
      axios
        .post(`${BACKEND_URL}/api/wallet/balance`, { address: wallet.address })
        .then((res) => setBalance(res.data.balance))
        .catch(() => setBalance("0"));
    } else {
      setBalance("0");
    }
  }, [wallet]);

  // Inactivity timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsLocked(true), 300000); // 5 minutes
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

  // Handler for Create Wallet button in Header
  const handleCreateWalletClick = () => {
    setShowWalletModal(true);
    setShowImportInput(false);
    setModalError("");
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("encryptedVault");
    window.localStorage.removeItem("currentRootAddress");
    window.localStorage.removeItem("wallet");
    setWallet(null);
    setBalance("0");
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
      window.localStorage.setItem("wallet", JSON.stringify(walletData));
      setWallet(walletData);
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
      window.localStorage.setItem("wallet", JSON.stringify(walletData));
      setWallet(walletData);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 font-sans">
      {/* Unlock Wallet Modal */}
      {isLocked && (
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
        wallet={wallet}
        handleLogout={handleLogout}
        balance={balance}
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
            />
            {portfolioView === "tokens" && <TokenHoldings />}
            {portfolioView === "nfts" && <NFTCollection />}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="flex gap-6">
            <WalletSidebar
              walletSubTab={walletSubTab}
              setWalletSubTab={setWalletSubTab}
              wallet={wallet}
              balance={balance}
            />
            <div className="flex-1">
              <WalletMain
                walletSubTab={walletSubTab}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
                wallet={wallet}
                balance={balance}
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
    </div>
  );
}

export default App;
