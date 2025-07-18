import * as React from "react";
import { mockQuests } from "../data/mockQuests";
import { useState, useEffect } from "react";

interface QuestHubProps {
  setSelectedQuest: (quest: any) => void;
}

const QuestHub: React.FC<QuestHubProps> = ({ setSelectedQuest }) => {
  const [completedQuests, setCompletedQuests] = useState<{
    [id: number]: boolean;
  }>({});

  useEffect(() => {
    // Chỉ quest id=1 là demo, các quest khác chưa xử lý
    const rootAddress = localStorage.getItem("currentRootAddress") || "";
    const isCompleted =
      localStorage.getItem(`lootie_quest_claimed_${rootAddress}`) === "1";
    setCompletedQuests({ 1: isCompleted });
  }, []);

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          Lootie Pool
        </h3>
        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockQuests.map((quest) => {
            const isCompleted = completedQuests[quest.id];
            // Tính progress động
            let progress = 0;
            if (quest.id === 1) {
              // Quest demo: lấy trạng thái completed từ localStorage
              let questTasks = [];
              try {
                questTasks = JSON.parse(
                  localStorage.getItem("lootie_quest1_tasks") || "[]"
                );
              } catch {}
              if (questTasks.length && questTasks[0].completed) {
                progress = 100;
              } else {
                progress = 0;
              }
            } else if (Array.isArray(quest.tasks) && quest.tasks.length > 0) {
              const completedCount = quest.tasks.filter(
                (t) => t.completed
              ).length;
              if (completedCount < quest.tasks.length) {
                progress = Math.round(
                  (completedCount / quest.tasks.length) * 100
                );
              } else {
                progress = 100;
              }
            }
            return (
              <div
                key={quest.id}
                className={`bg-white rounded-2xl p-6 border-4 border-black transition-all duration-300 flex flex-col h-full relative ${
                  isCompleted
                    ? "opacity-60 pointer-events-none"
                    : "hover:shadow-xl cursor-pointer"
                }`}
                onClick={() => !isCompleted && setSelectedQuest(quest)}
              >
                {/* Game Image - 60% height */}
                <div className="h-32 mb-4 rounded-xl overflow-hidden border-2 border-black flex items-center justify-center relative">
                  <img
                    src={quest.gameImage}
                    alt={quest.gameTitle}
                    className="w-full h-full"
                    style={{
                      objectFit: "fill",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  {isCompleted && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 shadow">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M9.5 16.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"
                        />
                      </svg>
                      Đã hoàn thành
                    </span>
                  )}
                </div>
                {/* Quest Info */}
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Tag nhiệm vụ thực tế */}
                    {(() => {
                      let color = "",
                        icon = "",
                        tooltip = "";
                      switch (quest.type) {
                        case "social":
                          color = "bg-blue-400 text-white";
                          tooltip = "Social Quest";
                          break;
                        case "in-game":
                          color = "bg-purple-500 text-white";
                          tooltip = "In-game Quest";
                          break;
                        case "challenge":
                          color = "bg-red-500 text-white";
                          tooltip = "Challenge Quest";
                          break;
                        case "on-chain":
                          color = "bg-green-500 text-white";
                          tooltip = "On-chain Quest";
                          break;
                        case "referral":
                          color = "bg-orange-400 text-white";
                          tooltip = "Referral Quest";
                          break;
                        default:
                          color = "bg-gray-400 text-white";
                          tooltip = "Other Quest";
                      }
                      return (
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded-lg border-2 border-black ${color}`}
                          title={tooltip}
                        >
                          <span className="mr-1">{icon}</span>
                          {quest.type.charAt(0).toUpperCase() +
                            quest.type.slice(1)}
                        </span>
                      );
                    })()}
                  </div>
                  <h3 className="font-bold text-lg text-black leading-tight">
                    {quest.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {quest.joinedPlayers} players joined
                  </div>
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Reward */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm">
                      <span className="text-gray-600">Reward: </span>
                      <span className="font-bold text-green-600">
                        {quest.reward}
                      </span>
                    </div>
                  </div>
                </div>
                {/* CTA Button luôn ở dưới cùng */}
                <button
                  className={`w-full mt-4 py-3 px-4 rounded-xl font-bold border-3 border-black transition-all duration-200 ${
                    isCompleted
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E3FF00] hover:bg-yellow-300 text-black"
                  }`}
                  disabled={isCompleted}
                >
                  {isCompleted ? "Đã nhận" : "Join Quest"}
                </button>
              </div>
            );
          })}
        </div>
        {/* See More Button */}
        <div className="flex justify-center pt-4">
          <button className="bg-yellow-300 hover:bg-yellow-400 border-4 border-black rounded-xl px-8 py-3 font-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            See More
          </button>
        </div>
      </div>
      {/* Leaderboard Section giữ nguyên */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Most Thriving Communities */}
        <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            🏆 Most Thriving Communities (7d)
          </h3>
          <div className="space-y-4">
            {[
              {
                rank: 1,
                name: "Axie Infinity",
                icon: "🎮",
                change: "+12.5%",
                value: "2.4M",
                color: "text-green-600",
              },
              {
                rank: 2,
                name: "The Sandbox",
                icon: "🏗️",
                change: "+8.3%",
                value: "1.8M",
                color: "text-green-600",
              },
              {
                rank: 3,
                name: "Decentraland",
                icon: "🌍",
                change: "+5.7%",
                value: "1.2M",
                color: "text-green-600",
              },
              {
                rank: 4,
                name: "Gods Unchained",
                icon: "⚔️",
                change: "-2.1%",
                value: "890K",
                color: "text-red-600",
              },
              {
                rank: 5,
                name: "Splinterlands",
                icon: "🃏",
                change: "+3.4%",
                value: "750K",
                color: "text-green-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-600 w-6">
                    {item.rank}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${item.color}`}>
                    {item.change}
                  </span>
                  <span className="font-black">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Bounty-ful Communities */}
        <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            💰 Most Bounty-ful Communities (7d)
          </h3>
          <div className="space-y-4">
            {[
              {
                rank: 1,
                name: "Illuvium",
                icon: "🐉",
                reward: "15,000 ILV",
                value: "$45K",
              },
              {
                rank: 2,
                name: "Star Atlas",
                icon: "🚀",
                reward: "8,500 ATLAS",
                value: "$28K",
              },
              {
                rank: 3,
                name: "Gala Games",
                icon: "🎯",
                reward: "12,000 GALA",
                value: "$22K",
              },
              {
                rank: 4,
                name: "Enjin",
                icon: "💎",
                reward: "5,200 ENJ",
                value: "$18K",
              },
              {
                rank: 5,
                name: "WAX",
                icon: "🔥",
                reward: "25,000 WAXP",
                value: "$15K",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-600 w-6">
                    {item.rank}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-bold">
                    {item.reward}
                  </span>
                  <span className="font-black text-yellow-600">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestHub;
