import React, { useState, useEffect } from "react";
import "./App.css";

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

function App() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [walletSubTab, setWalletSubTab] = useState("swap");
  const [swapAmount, setSwapAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("GLD");
  const [portfolioView, setPortfolioView] = useState("tokens"); // tokens or nfts
  const [heroSlide, setHeroSlide] = useState(0);
  const [collabsFilter, setCollabsFilter] = useState("all");
  const [collabsSearch, setCollabsSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock Hunters Data for Collabs Tab
  const mockHunters = [
    {
      id: 1,
      name: "CryptoNinja",
      avatar: "🥷",
      totalPoints: 15420,
      achievement: "Top 5 Loot S1",
      skills: ["Marketing", "Community", "Content"],
      badges: ["🔥 Top Hunter", "⭐ Active"],
      isLookingForProject: true,
      completedProjects: 12,
      rating: 4.9,
    },
    {
      id: 2,
      name: "GameMaster_X",
      avatar: "🎮",
      totalPoints: 12850,
      achievement: "Beta tester 8 projects",
      skills: ["Dev", "Testing", "QA"],
      badges: ["🛠️ Looking for project"],
      isLookingForProject: true,
      completedProjects: 8,
      rating: 4.7,
    },
    {
      id: 3,
      name: "DesignWizard",
      avatar: "🎨",
      totalPoints: 11200,
      achievement: "UI/UX Expert",
      skills: ["Design", "UI/UX", "Branding"],
      badges: ["⭐ Active"],
      isLookingForProject: false,
      completedProjects: 15,
      rating: 4.8,
    },
    {
      id: 4,
      name: "TokenHunter",
      avatar: "💎",
      totalPoints: 18750,
      achievement: "DeFi Specialist",
      skills: ["DeFi", "Trading", "Analysis"],
      badges: ["🔥 Top Hunter"],
      isLookingForProject: true,
      completedProjects: 20,
      rating: 5.0,
    },
    {
      id: 5,
      name: "SocialBuzz",
      avatar: "📱",
      totalPoints: 9800,
      achievement: "Community Builder",
      skills: ["Marketing", "Social Media", "Influencer"],
      badges: ["⭐ Active", "🛠️ Looking for project"],
      isLookingForProject: true,
      completedProjects: 6,
      rating: 4.6,
    },
    {
      id: 6,
      name: "CodeWarrior",
      avatar: "⚔️",
      totalPoints: 14300,
      achievement: "Smart Contract Auditor",
      skills: ["Dev", "Security", "Blockchain"],
      badges: ["🔥 Top Hunter"],
      isLookingForProject: false,
      completedProjects: 11,
      rating: 4.9,
    },
    {
      id: 7,
      name: "MetaBuilder",
      avatar: "🏗️",
      totalPoints: 10500,
      achievement: "3D Artist & Animator",
      skills: ["Design", "3D", "Animation"],
      badges: ["⭐ Active"],
      isLookingForProject: true,
      completedProjects: 7,
      rating: 4.5,
    },
    {
      id: 8,
      name: "DataMiner",
      avatar: "📊",
      totalPoints: 13600,
      achievement: "Analytics Expert",
      skills: ["Analysis", "Data Science", "Research"],
      badges: ["🛠️ Looking for project"],
      isLookingForProject: true,
      completedProjects: 9,
      rating: 4.7,
    },
    {
      id: 9,
      name: "NFTCollector",
      avatar: "🖼️",
      totalPoints: 8900,
      achievement: "NFT Curator",
      skills: ["NFTs", "Curation", "Art"],
      badges: ["⭐ Active"],
      isLookingForProject: false,
      completedProjects: 4,
      rating: 4.4,
    },
  ];

  // Handler for Collab button
  const handleCollabClick = (hunter: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Collaboration request sent to ${hunter.name}! 🚀`);
    }, 1500);
  };

  // Auto-slide hero every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 font-sans">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Tab Navigation */}
      <MobileTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section - Only show on Portfolio tab */}
      {activeTab === "portfolio" && (
        <HeroSection heroSlide={heroSlide} setHeroSlide={setHeroSlide} />
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 pb-8">
        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            {/* Portfolio Overview */}
            <PortfolioOverview
              portfolioView={portfolioView}
              setPortfolioView={setPortfolioView}
            />

            {/* Tokens View */}
            {portfolioView === "tokens" && <TokenHoldings />}

            {/* NFTs View */}
            {portfolioView === "nfts" && <NFTCollection />}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <WalletSidebar
              walletSubTab={walletSubTab}
              setWalletSubTab={setWalletSubTab}
            />

            {/* Main Content */}
            <div className="flex-1">
              <WalletMain
                walletSubTab={walletSubTab}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
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
            isLoading={isLoading}
            handleCollabClick={handleCollabClick}
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
    </div>
  );
}

export default App;
