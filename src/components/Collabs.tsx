import React, { useState } from "react";

interface Hunter {
  id: number;
  name: string;
  avatar: string;
  totalPoints: number;
  achievement: string;
  skills: string[];
  badges: string[];
  isLookingForProject: boolean;
  completedProjects: number;
  rating: number;
}

interface CollabsProps {
  hunters: Hunter[];
  filter: string;
  setFilter: (filter: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const getSkillColor = (skill: string) => {
  switch (skill.toLowerCase()) {
    case "dev":
    case "development":
    case "blockchain":
    case "security":
    case "testing":
    case "qa":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "design":
    case "ui/ux":
    case "3d":
    case "animation":
    case "branding":
      return "bg-pink-100 text-pink-800 border-pink-300";
    case "marketing":
    case "social media":
    case "community":
    case "influencer":
    case "content":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "analysis":
    case "data science":
    case "research":
    case "trading":
      return "bg-green-100 text-green-800 border-green-300";
    case "defi":
    case "nfts":
    case "curation":
    case "art":
      return "bg-purple-100 text-purple-800 border-purple-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const Collabs: React.FC<CollabsProps> = ({
  hunters,
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  // Filter hunters based on search and filter
  const filteredHunters = hunters.filter((hunter) => {
    const matchesSearch =
      hunter.name.toLowerCase().includes(search.toLowerCase()) ||
      hunter.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );
    const matchesFilter =
      filter === "all" ||
      (filter === "top" &&
        hunter.badges.some((badge) => badge.includes("Top Hunter"))) ||
      (filter === "active" &&
        hunter.badges.some((badge) => badge.includes("Active"))) ||
      (filter === "available" && hunter.isLookingForProject) ||
      (filter === "dev" && hunter.skills.includes("Dev")) ||
      (filter === "design" && hunter.skills.includes("Design")) ||
      (filter === "marketing" && hunter.skills.includes("Marketing"));
    return matchesSearch && matchesFilter;
  });

  // Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");

  // Logic: filter hunters by modalSearch keyword
  const handleModalSearch = () => {
    if (modalSearch.trim() !== "") {
      setSearch(modalSearch);
      setFilter("all"); // reset filter to show all matching
    }
    setIsSearchModalOpen(false);
    setModalSearch("");
  };

  // Add local loading state
  const [isLoading, setIsLoading] = useState(false);
  // Move handler here
  const handleCollabClick = (hunter: Hunter) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Collaboration request sent to ${hunter.name}! 🚀`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            🤝 Find Your Perfect Collab Partner
          </h2>
          <p className="text-xl font-bold text-blue-100 mb-6">
            Connect with top hunters • Build amazing projects • Grow together
          </p>
          <div className="flex justify-center gap-4 text-3xl mb-4">
            <span className="animate-bounce">🎯</span>
            <span className="animate-bounce delay-100">🚀</span>
            <span className="animate-bounce delay-200">💫</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative flex items-center justify-center">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>
              <input
                type="text"
                value={""}
                onClick={() => {
                  setModalSearch(search);
                  setIsSearchModalOpen(true);
                }}
                readOnly
                className="w-12 h-12 bg-white border border-gray-300 rounded-xl font-medium focus:outline-none transition-all text-center cursor-pointer hover:border-blue-400 hover:shadow"
                aria-label="Open advanced search"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Hunters", icon: "👥" },
              { key: "top", label: "Top Hunters", icon: "🔥" },
              { key: "active", label: "Active", icon: "⭐" },
              { key: "available", label: "Available", icon: "🛠️" },
              { key: "dev", label: "Developers", icon: "💻" },
              { key: "design", label: "Designers", icon: "🎨" },
              { key: "marketing", label: "Marketing", icon: "📢" },
            ].map((filterBtn) => (
              <button
                key={filterBtn.key}
                onClick={() => {
                  setFilter(filterBtn.key);
                  if (filterBtn.key === "all") setSearch("");
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all hover:scale-105 ${
                  filter === filterBtn.key
                    ? "bg-blue-400 text-white shadow-[2px_2px_0px_0px_#000]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filterBtn.icon} {filterBtn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mt-4">
          <p className="text-gray-600 font-medium">
            Found{" "}
            <span className="font-black text-blue-600">
              {filteredHunters.length}
            </span>{" "}
            hunters
            {search && ` matching "${search}"`}
          </p>
        </div>
      </div>

      {/* Modal Advanced Search */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 font-black"
              onClick={() => setIsSearchModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-black mb-4 text-center">
              🔍 Advanced Search
            </h2>
            <input
              type="text"
              autoFocus
              placeholder="Search hunters, skills, ..."
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              className="w-full border-2 border-black rounded-xl px-4 py-3 mb-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleModalSearch();
              }}
            />
            {/* Suggestions (mockup) */}
            <div className="mb-2">
              <div className="font-semibold mb-1 text-gray-700">
                Popular Skills:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Dev",
                  "Design",
                  "Marketing",
                  "QA",
                  "Community",
                  "UI/UX",
                  "3D",
                  "Content",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-yellow-100 border-2 border-yellow-400 text-sm font-bold cursor-pointer hover:bg-yellow-200 transition-all"
                    onClick={() => setModalSearch(skill)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* You can add more advanced filter UI here */}
            <button
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl px-8 py-3 text-white transition-all text-base"
              onClick={handleModalSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Hunters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHunters.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-gray-600 mb-2">
              No hunters found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredHunters.map((hunter) => (
            <div
              key={hunter.id}
              className="group bg-white rounded-2xl p-6 border-4 border-black hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
            >
              {/* Avatar & Basic Info */}
              <div className="text-center mb-2">
                <div className="w-16 h-16 mx-auto mb-2 text-4xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform duration-300">
                  {hunter.avatar}
                </div>
                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {hunter.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold border border-black shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-1">
                  {hunter.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  {hunter.achievement}
                </p>
                {/* Points */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-black rounded-xl px-4 py-2 mb-2">
                  <p className="text-2xl font-black text-blue-600">
                    {hunter.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 font-bold">
                    Total Points
                  </p>
                </div>
              </div>
              {/* Skills */}
              <div className="mb-3">
                <p className="text-sm font-bold text-gray-700 mb-1">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {hunter.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getSkillColor(
                        skill
                      )} transition-all hover:scale-105`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-center">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                  <p className="text-lg font-black text-gray-800">
                    {hunter.completedProjects}
                  </p>
                  <p className="text-xs text-gray-600">Projects</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                  <p className="text-lg font-black text-yellow-600">
                    ⭐ {hunter.rating}
                  </p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>
              {/* CTA Button always at bottom */}
              <div className="mt-auto pt-2">
                <button
                  onClick={() => handleCollabClick(hunter)}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-black text-white transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_0px_#000] ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </div>
                  ) : (
                    <>🤝 Collab</>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredHunters.length > 0 && (
        <div className="text-center pt-6">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 rounded-xl px-8 py-4 font-black text-black shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
            🔄 Load More Hunters
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="text-center">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-2xl font-black text-blue-600">
              {hunters.length}
            </p>
            <p className="text-sm text-gray-600 font-bold">Active Hunters</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <p className="text-2xl font-black text-green-600">247</p>
            <p className="text-sm text-gray-600 font-bold">
              Successful Collabs
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-2xl font-black text-purple-600">89</p>
            <p className="text-sm text-gray-600 font-bold">Projects Launched</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collabs;
