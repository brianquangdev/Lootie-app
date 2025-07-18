import * as React from "react";
import { useState } from "react";

// Mock data với 20 communities và avatar github
const mockCommunities = [
  {
    id: 1,
    name: "GM",
    logo: "👋",
    color: "#f5f5f5",
    quests: 56,
    verified: true,
    members: 226600,
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/65.jpg",
    ],
  },
  {
    id: 2,
    name: "QuestN",
    logo: "🧭",
    color: "#fef08a",
    quests: 125,
    verified: true,
    members: 8000000,
    avatars: [
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/men/23.jpg",
    ],
  },
  {
    id: 3,
    name: "BNB Chain",
    logo: "🟡",
    color: "#fef9c3",
    quests: 36,
    verified: true,
    members: 104700,
    avatars: [
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/women/36.jpg",
      "https://randomuser.me/api/portraits/men/37.jpg",
    ],
  },
  {
    id: 4,
    name: "usdx.money",
    logo: "💵",
    color: "#d1fae5",
    quests: 3,
    verified: true,
    members: 5300,
    avatars: [
      "https://randomuser.me/api/portraits/men/11.jpg",
      "https://randomuser.me/api/portraits/women/12.jpg",
      "https://randomuser.me/api/portraits/men/13.jpg",
    ],
  },
  {
    id: 5,
    name: "Mantle",
    logo: "🧊",
    color: "#f3e8ff",
    quests: 83,
    verified: true,
    members: 42400,
    avatars: [
      "https://randomuser.me/api/portraits/men/14.jpg",
      "https://randomuser.me/api/portraits/women/15.jpg",
      "https://randomuser.me/api/portraits/men/16.jpg",
    ],
  },
  {
    id: 6,
    name: "Magic Square",
    logo: "🟪",
    color: "#e0e7ff",
    quests: 22,
    verified: true,
    members: 1200000,
    avatars: [
      "https://randomuser.me/api/portraits/men/17.jpg",
      "https://randomuser.me/api/portraits/women/18.jpg",
      "https://randomuser.me/api/portraits/men/19.jpg",
    ],
  },
  {
    id: 7,
    name: "Space Nation",
    logo: "🚀",
    color: "#bae6fd",
    quests: 10,
    verified: true,
    members: 17200,
    avatars: [
      "https://avatars.githubusercontent.com/u/19?v=4",
      "https://avatars.githubusercontent.com/u/20?v=4",
      "https://avatars.githubusercontent.com/u/21?v=4",
    ],
  },
  {
    id: 8,
    name: "CoinSender",
    logo: "💸",
    color: "#fcd34d",
    quests: 13,
    verified: true,
    members: 106900,
    avatars: [
      "https://avatars.githubusercontent.com/u/22?v=4",
      "https://avatars.githubusercontent.com/u/23?v=4",
      "https://avatars.githubusercontent.com/u/24?v=4",
    ],
  },
  {
    id: 9,
    name: "Createra",
    logo: "🎮",
    color: "#fca5a5",
    quests: 3,
    verified: true,
    members: 20500,
    avatars: [
      "https://avatars.githubusercontent.com/u/25?v=4",
      "https://avatars.githubusercontent.com/u/26?v=4",
      "https://avatars.githubusercontent.com/u/27?v=4",
    ],
  },
  {
    id: 10,
    name: "UXLINK Official",
    logo: "🔗",
    color: "#a7f3d0",
    quests: 13,
    verified: true,
    members: 10200,
    avatars: [
      "https://avatars.githubusercontent.com/u/28?v=4",
      "https://avatars.githubusercontent.com/u/29?v=4",
      "https://avatars.githubusercontent.com/u/30?v=4",
    ],
  },
  {
    id: 11,
    name: "SwissBorg",
    logo: "💰",
    color: "#fde68a",
    quests: 21,
    verified: true,
    members: 128200,
    avatars: [
      "https://avatars.githubusercontent.com/u/31?v=4",
      "https://avatars.githubusercontent.com/u/32?v=4",
      "https://avatars.githubusercontent.com/u/33?v=4",
    ],
  },
  {
    id: 12,
    name: "BlackFort Network",
    logo: "🛡️",
    color: "#f3f4f6",
    quests: 1,
    verified: true,
    members: 2500,
    avatars: [
      "https://avatars.githubusercontent.com/u/34?v=4",
      "https://avatars.githubusercontent.com/u/35?v=4",
      "https://avatars.githubusercontent.com/u/36?v=4",
    ],
  },
  {
    id: 13,
    name: "MetaVerse DAO",
    logo: "🌐",
    color: "#a5b4fc",
    quests: 18,
    verified: true,
    members: 54000,
    avatars: [
      "https://avatars.githubusercontent.com/u/37?v=4",
      "https://avatars.githubusercontent.com/u/38?v=4",
      "https://avatars.githubusercontent.com/u/39?v=4",
    ],
  },
  {
    id: 14,
    name: "Pixel Guild",
    logo: "🎨",
    color: "#f9a8d4",
    quests: 7,
    verified: true,
    members: 8900,
    avatars: [
      "https://avatars.githubusercontent.com/u/40?v=4",
      "https://avatars.githubusercontent.com/u/41?v=4",
      "https://avatars.githubusercontent.com/u/42?v=4",
    ],
  },
  {
    id: 15,
    name: "LootieDAO",
    logo: "🐹",
    color: "#fef3c7",
    quests: 44,
    verified: true,
    members: 67000,
    avatars: [
      "https://avatars.githubusercontent.com/u/43?v=4",
      "https://avatars.githubusercontent.com/u/44?v=4",
      "https://avatars.githubusercontent.com/u/45?v=4",
    ],
  },
  {
    id: 16,
    name: "Web3 United",
    logo: "🌍",
    color: "#bbf7d0",
    quests: 29,
    verified: true,
    members: 32000,
    avatars: [
      "https://avatars.githubusercontent.com/u/46?v=4",
      "https://avatars.githubusercontent.com/u/47?v=4",
      "https://avatars.githubusercontent.com/u/48?v=4",
    ],
  },
  {
    id: 17,
    name: "ChainGuardians",
    logo: "⚔️",
    color: "#e0e7ff",
    quests: 12,
    verified: true,
    members: 15800,
    avatars: [
      "https://avatars.githubusercontent.com/u/49?v=4",
      "https://avatars.githubusercontent.com/u/50?v=4",
      "https://avatars.githubusercontent.com/u/51?v=4",
    ],
  },
  {
    id: 18,
    name: "DAO Masters",
    logo: "👑",
    color: "#fde68a",
    quests: 21,
    verified: true,
    members: 41000,
    avatars: [
      "https://avatars.githubusercontent.com/u/52?v=4",
      "https://avatars.githubusercontent.com/u/53?v=4",
      "https://avatars.githubusercontent.com/u/54?v=4",
    ],
  },
  {
    id: 19,
    name: "NFT World",
    logo: "🖼️",
    color: "#fca5a5",
    quests: 9,
    verified: true,
    members: 7800,
    avatars: [
      "https://avatars.githubusercontent.com/u/55?v=4",
      "https://avatars.githubusercontent.com/u/56?v=4",
      "https://avatars.githubusercontent.com/u/57?v=4",
    ],
  },
  {
    id: 20,
    name: "CryptoPunks",
    logo: "🤖",
    color: "#a5b4fc",
    quests: 15,
    verified: true,
    members: 99000,
    avatars: [
      "https://avatars.githubusercontent.com/u/58?v=4",
      "https://avatars.githubusercontent.com/u/59?v=4",
      "https://avatars.githubusercontent.com/u/60?v=4",
    ],
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return `+${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `+${(num / 1000).toFixed(1)}k`;
  return `+${num}`;
};

const Communities: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = mockCommunities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lootie-full-bleed space-y-8 py-8 px-4 md:px-8 lg:px-16 xl:px-24 w-full">
      <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
        Communities
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Communities"
            className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 pl-12 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
        {/* Dropdown Filter */}
        <div className="w-full md:w-60">
          <button className="w-full flex items-center justify-between bg-white border-2 border-black rounded-xl px-4 py-3 font-bold text-lg shadow-[2px_2px_0px_0px_#000]">
            All Communities
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Community Grid */}
      <div
        className="grid gap-8 w-full"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all cursor-pointer aspect-[1/1.05] h-full relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black overflow-hidden"
                style={{ background: c.color }}
              >
                {c.logo.startsWith("http") ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{c.logo}</span>
                )}
              </div>
              {c.verified && (
                <span className="ml-1 inline-block align-middle">
                  <svg
                    className="w-5 h-5 text-lime-400 stroke-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="10" fill="#d9f99d" />
                    <path
                      d="M7 10.5l2 2 4-4"
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              )}
            </div>
            <div className="font-black text-lg text-black truncate">
              {c.name}
            </div>
            <div className="text-gray-700 font-medium text-sm mb-1">
              {c.quests} Quests
            </div>
            <div className="flex items-center gap-2 mt-auto group-hover:hidden">
              <div className="flex -space-x-2">
                {c.avatars.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt="avatar"
                    className="w-7 h-7 rounded-full border-2 border-white shadow"
                    style={{ zIndex: 10 - i }}
                  />
                ))}
              </div>
              <div className="font-black text-base text-gray-800 ml-2">
                {formatNumber(c.members)}
              </div>
            </div>
            {/* Follow button hover */}
            <button
              className="hidden group-hover:flex items-center justify-center mt-auto w-full py-2 border-2 border-black rounded-xl bg-white font-bold text-lg text-black transition-all duration-200 shadow-sm hover:bg-gray-100"
              style={{ zIndex: 20 }}
            >
              <span className="text-2xl mr-2">+</span> Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
