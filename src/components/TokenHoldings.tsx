import * as React from "react";
import { mockTokens } from "../data/mockTokens";
import { LOOTIE_CHAIN } from "../data/lootieChainletConfig";
import { ethers } from "ethers";

interface WalletAccount {
  address: string;
  name: string;
  type: string;
  index: number;
}

interface TokenHoldingsProps {
  wallets: WalletAccount[];
}

const TokenHoldings: React.FC<TokenHoldingsProps> = ({ wallets }) => {
  // Calculate total token value for percentage calculation
  const totalTokenValue = mockTokens.reduce(
    (sum, token) => sum + token.amount * token.price,
    0
  );

  // Hàm lấy số dư LOOTIE cho từng ví
  async function fetchLootieBalances(
    wallets: WalletAccount[]
  ): Promise<string[]> {
    const provider = new ethers.JsonRpcProvider(LOOTIE_CHAIN.rpcUrl);
    const balances = await Promise.all(
      wallets.map(async (w) => {
        try {
          const bal = await provider.getBalance(w.address);
          return ethers.formatEther(bal);
        } catch {
          return "0";
        }
      })
    );
    return balances;
  }

  // State lưu số dư LOOTIE cho từng ví
  const [lootieBalances, setLootieBalances] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (wallets && wallets.length > 0) {
      fetchLootieBalances(wallets).then(setLootieBalances);
    }
  }, [wallets]);

  return (
    <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <h3 className="text-xl font-black mb-4 text-blue-600">Token Holdings</h3>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-6 gap-4 pb-3 mb-4 border-b-2 border-gray-200 text-sm font-bold text-gray-600">
        <div>Asset</div>
        <div>Game</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Price</div>
        <div className="text-right">Value</div>
        <div className="text-right">24h</div>
      </div>

      {/* Token Rows */}
      <div className="space-y-3">
        {mockTokens.map((token, index) => {
          const tokenValue = token.amount * token.price;
          const percentage = (tokenValue / totalTokenValue) * 100;

          return (
            <div
              key={index}
              className="group hover:bg-gray-50 rounded-xl p-3 transition-all border-2 border-transparent hover:border-gray-200"
            >
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <p className="font-black text-lg">{token.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-blue-600 font-bold">
                    {token.game}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-black">{token.amount.toLocaleString()}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">${token.price.toFixed(3)}</p>
                </div>

                <div className="text-right">
                  <p className="font-black text-lg">${tokenValue.toFixed(2)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold ${
                      token.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {token.change}
                  </span>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{token.icon}</span>
                    <div>
                      <p className="font-black text-lg">{token.name}</p>
                      <p className="text-sm text-blue-600 font-bold">
                        {token.game}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">
                      ${tokenValue.toFixed(2)}
                    </p>
                    <span
                      className={`text-sm font-bold ${
                        token.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {token.change}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{token.amount.toLocaleString()} tokens</span>
                  <span>${token.price.toFixed(3)} each</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenHoldings;
