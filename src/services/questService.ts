// questService.ts - Service for Quest API integration via backend
// Technologies: axios
// Purpose: Call backend endpoints for quest management (create, complete, ...)

import axios from "axios";

/**
 * Tạo quest mới trên Saga backend
 * @param params - Thông tin quest (title, description, ...)
 * @returns Kết quả từ backend (success, message, ...)
 */
export async function createQuest(params: any) {
  const res = await axios.post("/api/quest/create", params);
  return res.data;
}

/**
 * Hoàn thành quest trên Saga backend
 * @param questId - ID quest
 * @param userAddress - Địa chỉ người dùng
 * @returns Kết quả từ backend (success, questId, userAddress, ...)
 */
export async function completeQuest(questId: string, userAddress: string) {
  const res = await axios.post("/api/quest/complete", { questId, userAddress });
  return res.data;
}
