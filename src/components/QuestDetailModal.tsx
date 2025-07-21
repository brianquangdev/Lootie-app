import * as React from "react";
import { CONTRACT_ADDRESSES, SAGA_RPC } from "../data/contractAddresses";
import { LOOTIE_CHAIN } from "../data/lootieChainletConfig";
import { ethers } from "ethers";
import QuestManagerAbi from "../abis/QuestManager.json";
import { completeQuest } from "../services/questService";

interface QuestDetailModalProps {
  selectedQuest: any;
  setSelectedQuest: (quest: any) => void;
}

const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  selectedQuest,
  setSelectedQuest,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const [step, setStep] = React.useState(0); // 0: chưa follow, 1: đã follow, 2: đã claim
  const [claimLoading, setClaimLoading] = React.useState(false);
  const [claimSuccess, setClaimSuccess] = React.useState(false);
  const [claimError, setClaimError] = React.useState("");
  const [txHash, setTxHash] = React.useState<string | null>(null);

  if (!selectedQuest) return null;

  // Hàm gọi contract mint NFT cho quest đầu tiên
  const handleJoinQuest = async () => {
    if (selectedQuest.id !== 1) return; // chỉ quest đầu tiên
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Lấy private key từ localStorage (giả lập, thực tế nên dùng provider injected hoặc wallet connect)
      const mnemonic = localStorage.getItem("lootie_mnemonic") || "";
      const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      // Lấy index active
      const rootAddress = localStorage.getItem("currentRootAddress") || "";
      const idx = parseInt(
        localStorage.getItem(`activeWalletIndex_${rootAddress}`) || "0",
        10
      );
      const wallet = hdNode.deriveChild(idx);
      const provider = new ethers.JsonRpcProvider(SAGA_RPC);
      const signer = wallet.connect(provider);
      // Gọi contract QuestManager
      const abi = ["function completeFollowXQuest() public"];
      const questManager = new ethers.Contract(
        CONTRACT_ADDRESSES.QuestManager,
        abi,
        signer
      );
      const tx = await questManager.completeFollowXQuest();
      await tx.wait();
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  // Khi user bấm Follow
  const handleFollow = () => {
    window.open("https://x.com/lootiewallet", "_blank");
    setStep(1);
    localStorage.setItem("lootie_quest_followed", "1");
  };

  // Thêm hàm claim quest on-chain
  async function claimQuestOnChain(userPrivateKey: string) {
    // Đảm bảo luôn dùng địa chỉ 0x, không dùng ENS
    let questManagerAddress = CONTRACT_ADDRESSES.QuestManager;
    console.log("QuestManager address:", questManagerAddress);
    console.log("SAGA_RPC:", SAGA_RPC);
    if (
      !questManagerAddress.startsWith("0x") ||
      (questManagerAddress.length !== 42 && questManagerAddress.length !== 66)
    ) {
      throw new Error(
        "Invalid contract address for QuestManager. Must be a 0x address (42 or 66 chars), not ENS or short address."
      );
    }
    const provider = new ethers.JsonRpcProvider(SAGA_RPC);
    // Debug: check if contract code exists at the address
    const code = await provider.getCode(questManagerAddress);
    console.log("Contract code at address:", code);
    if (code === "0x") {
      throw new Error(
        "No contract deployed at QuestManager address on this Saga chainlet!"
      );
    }
    const wallet = new ethers.Wallet(userPrivateKey, provider);
    console.log("ethers.Contract address:", questManagerAddress);
    const questManager = new ethers.Contract(
      questManagerAddress,
      QuestManagerAbi.abi,
      wallet
    );
    try {
      const tx = await questManager.completeFollowXQuest();
      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      if (
        err.code === "UNSUPPORTED_OPERATION" &&
        err.operation === "getEnsAddress"
      ) {
        throw new Error(
          "Saga chainlet does not support ENS. Please use 0x address only."
        );
      }
      throw err;
    }
  }

  // TODO: Replace direct contract call with backend API for all quest actions
  // Sử dụng completeQuest từ questService để claim quest qua backend
  // Ví dụ:
  // const result = await completeQuest(selectedQuest.id, userAddress);
  // setTxHash(result.txHash);

  // Trong component, khi user bấm nhận quest:
  const handleClaimQuest = async () => {
    setClaimLoading(true);
    setClaimError("");
    setTxHash(null);
    try {
      // Lấy privateKey user từ localStorage (demo/test, thực tế nên dùng wallet connect/metamask)
      const walletData = localStorage.getItem("wallet");
      if (!walletData) throw new Error("No wallet found");
      const { privateKey } = JSON.parse(walletData);
      if (!privateKey) throw new Error("No private key found");
      const hash = await claimQuestOnChain(privateKey);
      setTxHash(hash);
    } catch (err: any) {
      setClaimError(err.message || "Claim quest failed");
    } finally {
      setClaimLoading(false);
    }
  };

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
              <span
                className={`px-3 py-1 text-sm font-bold rounded-lg border-2 border-black ${
                  selectedQuest.type === "Daily"
                    ? "bg-blue-400 text-white"
                    : selectedQuest.type === "Epic"
                    ? "bg-purple-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {selectedQuest.type === "HOT" ? "🔥 HOT" : selectedQuest.type}
              </span>
              <span className="text-gray-600 text-sm">
                {selectedQuest.joinedPlayers} players joined
              </span>
            </div>
          </div>

          {/* Right side - Quest details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-4">
              {selectedQuest.title}
            </h2>

            {/* Task List */}
            <div className="space-y-3 mb-4">
              <h3 className="text-lg font-bold text-black">Quest Tasks:</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedQuest.tasks.map((task: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border-2 border-black ${
                      task.completed ? "bg-gray-100 opacity-75" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${
                            task.completed ? "bg-green-400" : "bg-white"
                          }`}
                        >
                          {task.completed && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <span
                          className={`font-medium text-sm ${
                            task.completed ? "text-gray-600" : "text-black"
                          }`}
                        >
                          {task.description}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${
                          task.completed ? "text-gray-500" : "text-green-600"
                        } font-bold`}
                      >
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
                <span className="font-bold text-green-600 text-lg">
                  {selectedQuest.reward}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {step === 0 && (
                <button
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-black border-3 border-black bg-blue-400 hover:bg-blue-500 transition-all duration-200 hover:scale-105"
                  onClick={handleFollow}
                  disabled={loading}
                >
                  Follow @lootiewallet
                </button>
              )}
              {/* Nút nhận quest thực tế */}
              {step === 1 && (
                <>
                  <button
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-black border-3 border-black bg-green-400 hover:bg-green-500 transition-all duration-200 hover:scale-105"
                    onClick={handleClaimQuest}
                    disabled={claimLoading}
                  >
                    {claimLoading
                      ? "Đang nhận quest..."
                      : "Nhận quest (on-chain)"}
                  </button>
                  {txHash && (
                    <div className="mt-2 text-green-700 text-center">
                      Đã gửi transaction! Tx Hash:{" "}
                      <a
                        href={`https://lootie-2752580283102000-1.sagaexplorer.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {txHash.slice(0, 10)}...
                      </a>
                    </div>
                  )}
                  {claimError && (
                    <div className="mt-2 text-red-600 text-center">
                      {claimError}
                    </div>
                  )}
                </>
              )}
              {step === 2 && (
                <button
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-black border-3 border-black bg-gray-300 cursor-not-allowed"
                  disabled
                >
                  ✅ Đã hoàn thành
                </button>
              )}
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl border-2 border-black transition-all duration-200"
                onClick={() => setSelectedQuest(null)}
              >
                Save
              </button>
            </div>
            {error && (
              <div className="text-red-600 mt-3 font-bold text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 mt-3 font-bold text-center">
                NFT minted! Check your portfolio.
              </div>
            )}
            {/* Popup thông báo thành công */}
            {claimSuccess && (
              <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 bg-green-700 text-white text-lg font-bold flex items-center gap-3 px-8 py-4 rounded-full shadow-lg animate-fade-in">
                🎉 Chúc mừng! Bạn đã nhận NFT Welcome to Lootie.
              </div>
            )}
            {claimError && (
              <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 bg-red-700 text-white text-lg font-bold flex items-center gap-3 px-8 py-4 rounded-full shadow-lg animate-fade-in">
                {claimError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetailModal;
