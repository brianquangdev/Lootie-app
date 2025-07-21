// crossChainService.ts - Service for cross-chain API integration via backend
// Technologies: axios
// Purpose: Call backend endpoint for cross-chain transfer (token/NFT)

import axios from "axios";

/**
 * Chuyển token/NFT cross-chain qua Saga backend
 * @param params - Thông tin chuyển (senderChainlet, receiverChainlet, amount, to, ...)
 * @returns Kết quả từ backend (success, message, ...)
 */
export async function crossChainTransfer(params: any) {
  const res = await axios.post("/api/crosschain/transfer", params);
  return res.data;
}
