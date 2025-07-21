// ⚙️ chainletConfig.ts - Thông tin cấu hình các chainlet Saga

export const LOOTIE_CHAINLET = {
  chainId: 2752580283102000n, // Tên định danh chainlet (có thể là string hoặc số tuỳ backend)
  rpcUrl: "https://lootie-2752580283102000-1.jsonrpc.sagarpc.io", // RPC endpoint
  wsUrl: "https://lootie-2752580283102000-1.ws.sagarpc.io", // WebSocket endpoint
  explorerUrl: "https://lootie-2752580283102000-1.sagaexplorer.io", // Explorer URL
  gasReturnAddress: "0xffF87d723bFe4bC907691aFe3e546e3f7ca33e54", // Địa chỉ nhận gas refund
  genesisOwner: "saga1860hrs7twjxg2dy2ny9awsqjn8fpvjrd8jtmpm", // Địa chỉ owner genesis
  tokenSymbol: "LOOTIE",
  decimals: 18, // Số thập phân token
};

// Gợi ý mở rộng cho nhiều chainlet:
export const CHAINLETS = {
  lootie: LOOTIE_CHAINLET,
  // another: { ... },
};
