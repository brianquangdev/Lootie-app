// ⚙️ sagaConfig.ts - Config Saga chainlet
export const SAGA_CHAINLET = {
  rpcUrl: "https://rpc.saga.xyz",
  chainId: 31337, // Saga testnet
  name: "Saga Lootie Chainlet",
  currency: "SAGA",
  explorer: "https://explorer.saga.xyz",
  contractAddresses: {
    QuestManager: "0x...", // TODO: update real address
    // ... add more contracts as needed
  },
};
