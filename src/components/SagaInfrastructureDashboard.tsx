import React from "react";
import {
  SAGA_INFRASTRUCTURE,
  getChainletProvider,
} from "../data/lootieChainletConfig";

interface SagaInfrastructureDashboardProps {
  activeChainlet: string;
  setActiveChainlet: (chainlet: string) => void;
}

const SagaInfrastructureDashboard: React.FC<
  SagaInfrastructureDashboardProps
> = ({ activeChainlet, setActiveChainlet }) => {
  const [metrics, setMetrics] = React.useState({
    totalTPS: 0,
    activeChainlets: 0,
    crossChainTransfers: 0,
    totalTransactions: 0,
  });

  React.useEffect(() => {
    // Simulate fetching Saga infrastructure metrics
    const fetchMetrics = async () => {
      try {
        // Simulate API call to Saga infrastructure
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMetrics({
          totalTPS: 85000,
          activeChainlets: 3,
          crossChainTransfers: 127,
          totalTransactions: 15420,
        });
      } catch (error) {
        console.error("Failed to fetch Saga metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  const chainlets = Object.entries(SAGA_INFRASTRUCTURE.chainlets);

  return (
    <div className="bg-white w-full rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
        ⚡ Saga Infrastructure Dashboard
      </h3>

      {/* Infrastructure Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 border-2 border-black rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-blue-600">
            {metrics.totalTPS.toLocaleString()}
          </div>
          <div className="text-sm font-bold">Total TPS</div>
        </div>
        <div className="bg-green-100 border-2 border-black rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-green-600">
            {metrics.activeChainlets}
          </div>
          <div className="text-sm font-bold">Active Chainlets</div>
        </div>
        <div className="bg-purple-100 border-2 border-black rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-purple-600">
            {metrics.crossChainTransfers}
          </div>
          <div className="text-sm font-bold">Cross-chain Transfers</div>
        </div>
        <div className="bg-orange-100 border-2 border-black rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-orange-600">
            {metrics.totalTransactions.toLocaleString()}
          </div>
          <div className="text-sm font-bold">Total Transactions</div>
        </div>
      </div>

      {/* Chainlet Selection */}
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-3">Select Chainlet</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {chainlets.map(([id, chainlet]) => (
            <div
              key={id}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                activeChainlet === id
                  ? "border-yellow-400 bg-yellow-100"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
              onClick={() => setActiveChainlet(id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold">{chainlet.name}</h5>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {chainlet.currency}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {chainlet.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Block Time:</span>
                  <div>{chainlet.blockTime}s</div>
                </div>
                <div>
                  <span className="font-medium">Gas Limit:</span>
                  <div>{chainlet.gasLimit.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modular Features */}
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-3">Modular Blockchain Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Consensus */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <h5 className="font-bold mb-2">Consensus</h5>
            <div className="space-y-1 text-sm">
              <div>
                Type: {SAGA_INFRASTRUCTURE.modularFeatures.consensus.type}
              </div>
              <div>
                Validators:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.consensus.validators}
              </div>
              <div>
                Min Stake:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.consensus.minStake} SAGA
              </div>
            </div>
          </div>

          {/* Scalability */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <h5 className="font-bold mb-2">Scalability</h5>
            <div className="space-y-1 text-sm">
              <div>
                Sharding:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.scalability.sharding
                  ? "✅"
                  : "❌"}
              </div>
              <div>
                Parallel Processing:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.scalability
                  .parallelProcessing
                  ? "✅"
                  : "❌"}
              </div>
              <div>
                Max TPS:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.scalability.maxTPS.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Interoperability */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
            <h5 className="font-bold mb-2">Interoperability</h5>
            <div className="space-y-1 text-sm">
              <div>
                Cross-chain:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.interoperability
                  .crossChainTransfers
                  ? "✅"
                  : "❌"}
              </div>
              <div>
                Bridge Support:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.interoperability
                  .bridgeSupport
                  ? "✅"
                  : "❌"}
              </div>
              <div>
                Multi-chain Quests:{" "}
                {SAGA_INFRASTRUCTURE.modularFeatures.interoperability
                  .multiChainQuests
                  ? "✅"
                  : "❌"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Status */}
      <div>
        <h4 className="font-bold text-lg mb-3">Saga APIs Status</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(SAGA_INFRASTRUCTURE.apis).map(([name, api]) => (
            <div
              key={name}
              className="bg-green-100 border-2 border-black rounded-xl p-3 text-center"
            >
              <div className="font-bold text-sm capitalize">
                {name.replace(/([A-Z])/g, " $1")}
              </div>
              <div className="text-xs text-green-600">✅ Online</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SagaInfrastructureDashboard;
