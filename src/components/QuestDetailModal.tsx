import React from 'react';

interface QuestDetailModalProps {
  selectedQuest: any;
  setSelectedQuest: (quest: any) => void;
}

const QuestDetailModal: React.FC<QuestDetailModalProps> = ({ selectedQuest, setSelectedQuest }) => {
  if (!selectedQuest) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border-4 border-black relative">
        {/* Close Button X */}
        <button 
          onClick={() => setSelectedQuest(null)}
          className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-600 transition-colors z-10"
        >
          X
        </button>
        
        <div className="flex gap-6 p-6">
          {/* Left side - Game image */}
          <div className="flex-shrink-0">
            <div className="h-48 w-64 rounded-xl overflow-hidden border-2 border-black">
              <img 
                src={selectedQuest.gameImage} 
                alt={selectedQuest.gameTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-3 py-1 text-sm font-bold rounded-lg border-2 border-black ${
                selectedQuest.type === 'Daily' ? 'bg-blue-400 text-white' :
                selectedQuest.type === 'Epic' ? 'bg-purple-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {selectedQuest.type === 'HOT' ? '🔥 HOT' : selectedQuest.type}
              </span>
              <span className="text-gray-600 text-sm">{selectedQuest.joinedPlayers} players joined</span>
            </div>
          </div>
          
          {/* Right side - Quest details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-4">{selectedQuest.title}</h2>
            
            {/* Task List */}
            <div className="space-y-3 mb-4">
              <h3 className="text-lg font-bold text-black">Quest Tasks:</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedQuest.tasks.map((task: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-xl border-2 border-black ${
                      task.completed ? 'bg-gray-100 opacity-75' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${
                          task.completed ? 'bg-green-400' : 'bg-white'
                        }`}>
                          {task.completed && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className={`font-medium text-sm ${task.completed ? 'text-gray-600' : 'text-black'}`}>
                          {task.description}
                        </span>
                      </div>
                      <span className={`text-xs ${task.completed ? 'text-gray-500' : 'text-green-600'} font-bold`}>
                        {task.reward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-bold">{selectedQuest.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${selectedQuest.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Total Reward */}
            <div className="bg-yellow-100 p-4 rounded-xl border-2 border-black mb-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-black">Total Reward:</span>
                <span className="font-bold text-green-600 text-lg">{selectedQuest.reward}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className={`flex-1 py-3 px-6 rounded-xl font-bold text-black border-3 border-black transition-all duration-200 hover:scale-105 ${
                selectedQuest.status === 'completed' ? 'bg-gray-300 cursor-not-allowed' :
                selectedQuest.status === 'claim' ? 'bg-green-400 hover:bg-green-500' :
                'bg-[#E3FF00] hover:bg-yellow-300'
              }`}>
                Join Game
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl border-2 border-black transition-all duration-200">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetailModal; 