# ⚙️ Technical Overview & Project Structure (2025)

## 1. Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Express.js (Node.js), RESTful API
- **Smart Contracts:** Solidity (EVM), Foundry (Forge, Anvil, Cast)
- **Blockchain:** Saga Modular Blockchain (EVM-compatible, Chainlet infra)
- **Wallet/Onboarding:** Privy (embedded wallet, social login)
- **Web3/Blockchain SDK:** ethers.js, axios
- **Testing:** Jest (backend), @testing-library/react (frontend), Foundry (contracts)
- **Other:** JWT (planned), localStorage (cache), PostCSS, ESLint

## 2. Project Structure

- **src/**: Frontend (React + TypeScript)
  - **components/**: Wallet, Portfolio, QuestHub, Collabs, Communities, SagaInfrastructureDashboard, ...
  - **data/**: Static/mock data, contract addresses, chainlet config
  - **assets/**: Logo, images, icons
  - **abis/**: ABI files for smart contracts
  - **config/**: Blockchain, chainlet, saga config
  - **hooks/**: useWallet, useVault, useTransaction, ...
  - **services/**: crossChainService, nftService, questService, ...
  - **App.tsx**: Main React App
  - **main.tsx**: Entry point
  - **index.css, App.css**: CSS
  - **global.d.ts, vite-env.d.ts**: TypeScript globals
- **backend/**: Express.js backend
  - **api/**: crossChainApi, nftApi, questApi, sagaChainletApi, ...
  - **public/**: Static assets
  - **server.js**: Backend entry
  - **package.json, pnpm-lock.yaml**: Backend deps
- **lootie-contracts/**: Smart contracts (Solidity, Foundry)
  - **src/**: QuestManager, Quest, WelcomeToLootieNFT, ...
  - **script/**: DeployLootie.s.sol, ...
  - **test/**: QuestManager.t.sol, ...
  - **broadcast/**: Foundry logs
  - **lib/**: forge-std, openzeppelin-contracts
  - **foundry.toml**: Foundry config
  - **quest_deploy.json**: Quest deploy info
  - **README.md**: Contracts doc
- **public/**: Static assets (frontend)
- **.eslint.config.js, tailwind.config.cjs, postcss.config.cjs**: Lint/CSS config
- **index.html**: Frontend HTML entry
- **package.json, pnpm-lock.yaml**: Root deps
- **tsconfig.json, tsconfig.app.json, tsconfig.node.json**: TS config
- **vite.config.ts**: Vite config
- **README.md, README_update.md**: Docs
- **WHITEPAPER.md**: Whitepaper

## 3. Architecture & Main Modules

- **Chainlet Architecture:**
  - Lootie Gaming Chainlet: gaming txs (30M gas, 2s block)
  - Quest Management Chainlet: quest/reward (15M gas, 1s block)
  - NFT Collection Chainlet: NFT mint/trade (25M gas, 3s block)
- **Cross-Chain:**
  - Transfers, bridge, multi-chain quests, cross-chain NFT trading
- **APIs:**
  - Chainlet Management, Cross-Chain, Quest System, NFT Marketplace
- **Main Modules:**
  - Wallet: multi-wallet, onboarding, vault, SAGA RPC, onchain send
  - Portfolio: tokens, NFTs, value
  - QuestHub: join/claim quests (on-chain, social, in-game)
  - Collabs: connect with other users
  - Communities: explore projects/teams
  - Game Hub: game list, history, achievements
  - SagaInfrastructureDashboard: real-time metrics, chainlet selection, API status

## 4. Security & Testing

- Private key only in backend (planned), never returned to frontend
- JWT for sensitive APIs (planned)
- Unit tests for backend (Jest), frontend (React Testing Library), contracts (Foundry)
- Input validation, error logging, security warnings

## 5. File Structure Highlights

- `src/components/WalletMain.tsx`: Wallet logic, onchain send, tx history, UI/UX
- `src/data/lootieChainletConfig.ts`: Saga infra config, chainlets, APIs
- `src/components/SagaInfrastructureDashboard.tsx`: Real-time dashboard
- `src/App.tsx`: App state, balance management, onboarding

---

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

# 📌 Missing from Source vs. Whitepaper (Tổng hợp các phần còn thiếu so với whitepaper)

## 1. Tokenomics

- **Dual-token system:**
  - LOOT (native, utility, governance, staking, deflationary mechanics)
  - QUEST (utility, quest/community rewards, convertible to LOOT)
- **Use cases:** transaction fees, quest rewards, staking, governance, marketplace, cross-chain
- **Mint/send:** Controlled emission, quest-based minting, username-based transfer, cross-chain bridge

## 2. Roadmap

- **Q3 2025:** POC (core infra, Privy onboarding, basic wallet, quest, initial Chainlet)
- **Q1 2026:** MVP (multi-chain wallet, full quest, community, SDK beta, marketplace beta, analytics)
- **Q3 2026:** Closed Beta (1,000+ users, 10+ dev partners, validate tokenomics, optimize performance)
- **Q4 2026:** Public Beta & Token Launch (open platform, governance, mobile app, marketing)
- **Q1 2027:** Mainnet (full decentralization, SDK, partnerships)
- **2027-2028:** DAO, ecosystem expansion, AI features, accelerator, cross-chain, global
- **2028+:** Web3 entertainment platform, metaverse, 1M+ users, 1000+ games

## 3. User Target

- Web2 gamers (main), Web3 gamers, indie devs, community builders, content creators

## 4. Use Cases

- Seamless onboarding (Google login, auto wallet)
- Cross-game asset management (NFTs/tokens from multiple games)
- Community-driven quest creation
- Indie game integration (SDK, asset ownership, trading)
- Developer monetization (premium quests, NFT sales, marketplace fees)

## 5. Comparison & Unique Features

- **So sánh:**
  - Galxe/Zealy: chỉ marketing, không tích hợp gameplay/ví
  - Steam: không blockchain, không tài sản số, không minh bạch
  - Magic Eden: chỉ NFT, không quest/gameplay
  - Space3: chỉ quest marketing, không ví, không gameplay
- **Lootie nổi bật:**
  - Ví Chainlet-based độc quyền (mỗi user/game 1 chainlet, phí gần 0, không tắc nghẽn)
  - Onboarding Web2 (Google, Discord, auto non-custodial wallet)
  - Quest gắn gameplay, tài sản số, động lực thực
  - SDK/Thirdweb mạnh mẽ cho dev
  - Tập trung trải nghiệm gaming, không chạy theo DeFi/NFT đơn thuần

## 6. Vision

- Trở thành "Steam của Web3 gaming"
- Cầu nối Web2-Web3, hàng triệu user, hàng ngàn game/app tích hợp
- Nền tảng giải trí Web3 toàn diện (game, event, metaverse)

## 7. Team

- Brian Quang - Product Tech Lead
- Phoebe - Product Owner

## 8. References

- [Gate.com: Sự Sụp Đổ Của Web3 Gaming](https://www.gate.com/vi/learn/articles/the-collapse-of-web3-gaming-how-can-we-escape-the-cyber-graveyard/9277)
- [Coin98: Tổng quan Web3 Gaming](https://coin98.net/tong-quan-web3-gaming)
- [Precedence Research: Web3 Gaming Market Size](https://www.precedenceresearch.com/web3-gaming-market)
- [Saga Foundation: Saga Chainlets](https://docs.saga.xyz/introduction/saga-overview/saga-chainlets)
- [Privy](https://www.privy.io/)
- [Thirdweb](https://thirdweb.com/)
- [Galxe](https://www.galxe.com/)
- [Zealy](https://zealy.io/)
