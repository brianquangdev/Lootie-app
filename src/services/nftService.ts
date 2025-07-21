// nftService.ts - Service for NFT API integration via backend
// Technologies: axios
// Purpose: Call backend endpoints for NFT management (mint, list, ...)

import axios from "axios";

/**
 * Mint NFT mới trên Saga backend
 * @param params - Thông tin NFT (name, metadata, ...)
 * @returns Kết quả từ backend (success, message, ...)
 */
export async function mintNFT(params: any) {
  const res = await axios.post("/api/nft/mint", params);
  return res.data;
}

/**
 * Lấy danh sách NFT của address từ Saga backend
 * @param address - Địa chỉ ví
 * @returns Danh sách NFT (array)
 */
export async function listNFTs(address: string) {
  const res = await axios.get(`/api/nft/list/${address}`);
  return res.data;
}
