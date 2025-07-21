# ⚠️ Outstanding Issues & Improvement Checklist for Lootie (Saga Integration)

## 1. Backend & API

- [ ] Backend currently uses mock Saga APIs (Quest, NFT, Cross-chain, Chainlet); real Saga endpoint integration is in progress.
- [ ] No JWT/session authentication for sensitive APIs yet (security).
- [ ] Error/fallback handling for real Saga API failures is basic (currently just generic 500 errors).
- [ ] No advanced chainlet management endpoints (delete, update, real-time monitoring).

## 2. Frontend

- [ ] Quest, NFT, Cross-chain services call backend, but UI still uses mock data (mockQuests, mockNFTs, localStorage) instead of live API.
- [ ] No UI/UX for loading, error, or retry states when calling real Saga APIs.
- [ ] Some components (QuestHub, NFTCollection, WalletMain) have TODOs and are not fully switched to backend API.

## 3. Test & Quality

- [ ] Backend tests only cover mock, not real Saga API.
- [ ] No frontend tests for Saga API flows (React Testing Library).
- [ ] No end-to-end integration tests (frontend → backend → Saga).

## 4. Security

- [ ] Private key can still be handled in frontend (demo); should be fully moved to backend or use wallet connect/MetaMask.
- [ ] No brute-force protection or warnings for vault password input.

## 5. Other

- [ ] No detailed guide for configuring real Saga endpoints (URL, API key, etc.).
- [ ] No migration script to move from mock to real data after integration.

---

**Note:**

- This checklist highlights missing features, code that exists but is not fully integrated, and areas for improvement. Use it to track progress and ensure production readiness.
