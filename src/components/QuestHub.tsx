import React from 'react';
import { mockQuests } from '../data/mockQuests';

interface QuestHubProps {
  setSelectedQuest: (quest: any) => void;
}

const QuestHub: React.FC<QuestHubProps> = ({ setSelectedQuest }) => {
  return (
    <div className="space-y-6 w-full">
      <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
          🎯 Lootie Pool
        </h3>
        
        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockQuests.map((quest) => (
            <div 
              key={quest.id}
              className="bg-white rounded-2xl p-6 border-4 border-black hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedQuest(quest)}
            >
              {/* Game Image - 60% height */}
              <div className="h-32 mb-4 rounded-xl overflow-hidden border-2 border-black">
                <img 
                  src={quest.gameImage} 
                  alt={quest.gameTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Quest Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg border-2 border-black ${
                    quest.type === 'Daily' ? 'bg-blue-400 text-white' :
                    quest.type === 'Epic' ? 'bg-purple-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {quest.type === 'HOT' ? '🔥 HOT' : quest.type}
                  </span>
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
                    <span className="font-bold">{quest.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Reward */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-600">Reward: </span>
                    <span className="font-bold text-green-600">{quest.reward}</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <button className={`w-full py-3 px-4 rounded-xl font-bold text-black border-3 border-black transition-all duration-200 hover:scale-105 ${
                  quest.status === 'completed' ? 'bg-gray-300 cursor-not-allowed' :
                  quest.status === 'claim' ? 'bg-green-400 hover:bg-green-500' :
                  'bg-[#E3FF00] hover:bg-yellow-300'
                }`}>
                  {quest.status === 'completed' ? 'Completed' :
                   quest.status === 'claim' ? 'Claim Reward' :
                   'Join Quest'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* See More Button */}
        <div className="flex justify-center pt-4">
          <button className="bg-yellow-300 hover:bg-yellow-400 border-4 border-black rounded-xl px-8 py-3 font-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all">
            See More
          </button>
        </div>
      </div>
      
      {/* Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Most Thriving Communities */}
        <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            🏆 Most Thriving Communities (7d)
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Axie Infinity', icon: '🎮', change: '+12.5%', value: '2.4M', color: 'text-green-600' },
              { rank: 2, name: 'The Sandbox', icon: '🏗️', change: '+8.3%', value: '1.8M', color: 'text-green-600' },
              { rank: 3, name: 'Decentraland', icon: '🌍', change: '+5.7%', value: '1.2M', color: 'text-green-600' },
              { rank: 4, name: 'Gods Unchained', icon: '⚔️', change: '-2.1%', value: '890K', color: 'text-red-600' },
              { rank: 5, name: 'Splinterlands', icon: '🃏', change: '+3.4%', value: '750K', color: 'text-green-600' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-600 w-6">{item.rank}</span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${item.color}`}>{item.change}</span>
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
              { rank: 1, name: 'Illuvium', icon: '🐉', reward: '15,000 ILV', value: '$45K' },
              { rank: 2, name: 'Star Atlas', icon: '🚀', reward: '8,500 ATLAS', value: '$28K' },
              { rank: 3, name: 'Gala Games', icon: '🎯', reward: '12,000 GALA', value: '$22K' },
              { rank: 4, name: 'Enjin', icon: '💎', reward: '5,200 ENJ', value: '$18K' },
              { rank: 5, name: 'WAX', icon: '🔥', reward: '25,000 WAXP', value: '$15K' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="font-black text-gray-600 w-6">{item.rank}</span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-bold">{item.reward}</span>
                  <span className="font-black text-yellow-600">{item.value}</span>
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