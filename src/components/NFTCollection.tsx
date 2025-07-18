import * as React from "react";
import { mockNFTs } from "../data/mockNFTs";
import { useState } from "react";

const NFTCollection: React.FC = () => {
  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-400 text-black";
      case "Epic":
        return "bg-gradient-to-r from-purple-400 to-pink-400 text-white";
      case "Rare":
        return "bg-gradient-to-r from-blue-400 to-cyan-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Lấy NFT mock từ localStorage
  let lootieNFTs: any[] = [];
  try {
    lootieNFTs = JSON.parse(localStorage.getItem("lootie_nfts") || "[]");
  } catch {}
  const allNFTs = [
    ...lootieNFTs.map((nft) => ({
      name: nft.name,
      img: "🎉",
      game: "Lootie",
      collection: "Onboarding Reward",
      rarity: "Special",
      value: 0,
    })),
    ...mockNFTs,
  ];

  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const hasLootieNFT = lootieNFTs.length > 0;

  return (
    <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <h4 className="text-xl font-black mb-6 text-purple-600">
        NFT Collection
      </h4>
      {/* Nút Reset Demo */}
      {hasLootieNFT && (
        <button
          className="mb-4 px-4 py-2 bg-red-100 hover:bg-red-300 text-red-700 font-bold rounded-xl border-2 border-red-400 shadow transition-all"
          onClick={() => {
            const rootAddress =
              localStorage.getItem("currentRootAddress") || "";
            // Xoá NFT Welcome to Lootie khỏi danh sách NFT (nếu có)
            let nfts = [];
            try {
              nfts = JSON.parse(localStorage.getItem("lootie_nfts") || "[]");
            } catch {}
            const filtered = nfts.filter(
              (nft: any) => nft.name !== "Welcome to Lootie"
            );
            localStorage.setItem("lootie_nfts", JSON.stringify(filtered));
            // Reset trạng thái quest đã claim
            if (rootAddress) {
              localStorage.removeItem(`lootie_quest_claimed_${rootAddress}`);
            }
            window.location.reload();
          }}
        >
          Reset Demo (Remove Reward NFT)
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNFTs.map((nft, index) => {
          const isReward = nft.rarity === "Special";
          return (
            <div
              key={index}
              className={`group ${
                isReward
                  ? "border-4 border-green-500 shadow-[0_0_16px_2px_#22c55e]"
                  : "border-2 border-black"
              } bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full relative flex flex-col justify-between h-full`}
              onMouseEnter={() => isReward && setShowTooltip(index)}
              onMouseLeave={() => isReward && setShowTooltip(null)}
            >
              {/* NFT Image/Icon */}
              <div
                className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 h-48 flex items-center justify-center border-b-2 border-black relative rounded-t-2xl overflow-hidden"
                style={{ backgroundColor: "#fff" }}
              >
                {/* rarity badge góc phải trên cùng */}
                {nft.rarity && (
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-black border border-black z-10 ${getRarityStyle(
                      nft.rarity
                    )}`}
                  >
                    {nft.rarity === "Special" ? "Onboarding" : nft.rarity}
                  </span>
                )}
                {nft.img &&
                typeof nft.img === "string" &&
                nft.img.startsWith("/src/assets") ? (
                  <img
                    src={nft.img}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#fff",
                    }}
                  />
                ) : (
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {nft.img}
                  </span>
                )}
              </div>

              {/* NFT Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  {/* Tên và số thứ tự */}
                  <h5 className="font-black text-lg leading-tight mb-1">
                    {nft.name.split("#")[0].trim()}
                  </h5>
                  {nft.name.includes("#") && (
                    <div className="text-xs text-gray-500 font-bold mb-1">
                      #{nft.name.split("#")[1]}
                    </div>
                  )}
                  <p className="text-sm text-blue-600 font-bold">{nft.game}</p>
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    {nft.collection}
                  </p>
                </div>
                {/* Value luôn ở dưới cùng */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 font-black">🏆</span>
                    <span className="text-sm font-bold text-gray-600">
                      Value
                    </span>
                  </div>
                  <div className="text-right">
                    {nft.rarity === "Special" ? (
                      <p className="font-black text-lg text-green-600">
                        Reward NFT
                      </p>
                    ) : (
                      <>
                        <p className="font-black text-lg">{nft.value} SAGA</p>
                        <p className="text-xs text-gray-500">
                          ≈ ${(nft.value * 1.2).toFixed(2)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Tooltip cho NFT reward */}
              {isReward && showTooltip === index && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg z-20 animate-fade-in">
                  This is your onboarding reward NFT. It has no financial value.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NFTCollection;
