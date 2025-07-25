<p align="center">
  <img src="src/assets/Lootie-logo.png" alt="Lootie Logo" width="400"/>
</p>

# 🎮 Lootie Hub

> The Web3 Gaming Super Hub: Chainlet Wallet • Quest • Community • Marketplace

---

## 🕹️ What is Lootie?

Lootie is a game-first Web3 platform built on the **Saga** blockchain, combining a customizable wallet, interactive Game Hub, Quest system, and social features for blockchain gamers. It leverages Saga's chainlet infrastructure and EVM compatibility for seamless on-chain experiences.

---

## 🚀 Features

- **Chainlet-based Wallet**: Each user/game gets a dedicated chainlet for instant, low-fee transactions and maximum scalability.
- **Custom Wallet**: Multi-wallet, onboarding, import/export, encrypted vault, SAGA RPC integration.
- **Onchain Send Token**: Real onchain token transfer using `ethers.Wallet` and `provider.sendTransaction`.
- **Professional UI/UX**: Copy address popup, transaction success popup, address and amount validation, security warnings.
- **Persistent Balance Management**: Always fetches balances from Saga chainlet RPC first, localStorage as cache.
- **Enhanced Transaction History**: Blockchain-like details, chainlet/cross-chain info, localStorage storage.
- **Saga Infrastructure Integration**: Modular chainlet architecture, 3 chainlets, 4 APIs, real-time dashboard.
- **Quest & NFT APIs**: Built-in quest and NFT marketplace integration.
- **Backend API**: Secure wallet creation/import, balance (Saga RPC).
- **Smart Contracts**: QuestManager, Quest, and more (see lootie-contracts/).

---

## 🏗️ Project Structure

- **src/**: Frontend (React + TypeScript)
- **backend/**: Express.js backend
- **lootie-contracts/**: Smart contracts (Solidity, Foundry)
- **public/**: Public static assets (frontend)
- **.eslint.config.js, tailwind.config.cjs, postcss.config.cjs**: Linting and CSS config
- **index.html**: Main HTML entry for frontend
- **package.json, pnpm-lock.yaml**: Project dependencies and lockfile (root)
- **tsconfig.json, tsconfig.app.json, tsconfig.node.json**: TypeScript config
- **vite.config.ts**: Vite config
- **README.md, README_update.md**: Project documentation
- **WHITEPAPER.md**: Project whitepaper

---

## 🔗 Saga Infrastructure Usage

### **Chainlet Architecture**

- **Lootie Gaming Chainlet**: Dedicated chainlet for gaming transactions (30M gas limit, 2s block time)
- **Quest Management Chainlet**: Specialized chainlet for quest and reward management (15M gas limit, 1s block time)
- **NFT Collection Chainlet**: Optimized chainlet for NFT minting and trading (25M gas limit, 3s block time)

### **Cross-Chain Communication**

- Cross-chain transfers between different chainlets
- Bridge support for asset movement across chainlets
- Multi-chain quests spanning multiple chainlets
- Cross-chain NFT trading

### **Saga APIs Integration**

- Chainlet Management API
- Cross-Chain API
- Quest System API
- NFT Marketplace API

### **Modular Blockchain Features**

- Proof of Stake Consensus
- Scalability: Sharding, parallel processing, 100K TPS capacity
- Interoperability: Seamless cross-chain communication
- Custom Gas Limits

### **Infrastructure Dashboard**

- Real-time metrics monitoring (TPS, active chainlets, transactions)
- Chainlet selection and management interface
- API status monitoring and health checks

---

## 🧩 Main Modules

- **Wallet**: Multi-wallet, onboarding, import/export, encrypted vault, SAGA RPC, onchain send (ethers.js)
- **Quest System**: On-chain quests, daily/seasonal/community quests, automated rewards, smart contract verification
- **Portfolio**: Asset overview, tokens, NFTs, wallet value
- **Collabs**: Find, connect, and collaborate with other "hunters"
- **Communities**: Explore game communities, projects, teams
- **Game Hub**: Game list, play history, achievements
- **SagaInfrastructureDashboard**: Real-time Saga metrics, chainlet selection, modular features, API status
- **Analytics**: User activity, quest completion, asset trading, real-time monitoring

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
pnpm install
# or npm install
# or yarn install
```

### 2. Run in Development Mode

**Terminal 1 (Backend):**

```bash
cd backend
pnpm start
# or npm start
```

**Terminal 2 (Frontend):**

```bash
pnpm dev
# or npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### 3. Run in Production Mode

```bash
pnpm build
cp -r dist backend/public
cd backend
pnpm start
```

Visit: [http://localhost:3001](http://localhost:3001)

---

## 🪙 Tokenomics

Lootie uses a dual-token system to optimize both utility and governance:

### **LOOT Token (Native Token)**
- Main medium of exchange in the ecosystem
- Used for transaction fees, staking, governance
- Deflationary mechanics: token burning from transaction fees and quest rewards

### **QUEST Token (Utility Token)**
- Distributed through quest completion and community activities
- Used to purchase in-game items, unlock premium features, participate in special events
- Can be converted to LOOT via bonding curve

### **Token Use Cases**
- Transaction fees & gas abstraction (users interact without direct gas)
- Quest rewards & incentives (daily, seasonal, community)
- Staking & governance (unlock perks, vote on protocol upgrades)
- Marketplace & trading (NFTs, in-game items, loot crates)
- Season pass & progression system
- Creator & collab economy (custom quest packs, analytics, rewards)
- Cross-game utility & player identity
- Deflationary design & burn mechanics

### **Token Allocation**
- Ecosystem Growth: 35%
- Team & Advisors: 20%
- Community Treasury: 18%
- Strategic Investors: 15%
- Liquidity & Market Making: 7%
- Operational Reserve: 5%

---

## 🧑‍💻 Lootie Protocol SDK

Lootie is designed as modular infrastructure. Each core module (wallet, quest engine, lootbox, analytics) can be exported as SDKs or smart contract packages for other games/platforms to integrate.

- **QuestModule.sol**: Smart contract for on-chain missions, daily/seasonal/achievement quests, reward distribution.
- **LootBoxCore.sol**: NFT-based lootbox engine, randomized drops, rarity, composable reward logic.
- **WalletEmbed.js**: Frontend JS module for Privy social login, embedded wallet, transaction signing, gas abstraction.
- **ChainletDeployer.ts**: CLI tool for rapid chainlet deployment with Lootie modules.
- **AnalyticsAPI.ts**: Backend module for player behavior, quest data, economic metrics.

**Open-source License:**  
Lootie Protocol SDK is governed under the Lootie Modular License (LML):  
- Free to use SDK modules to build games on Saga Chainlets
- Cannot fork/clone the full Lootie Hub or UI, or use the “Lootie” brand without permission

---

## 👥 Team

- **Brian Quang** – Founder, Product & Tech Lead  
  Full-stack engineer, Web3 dApp builder, leads technical development and product design.
- **Phoebe Duong** – Advisor, Product Owner & Growth Strategist  
  Web3 product builder, community growth expert, oversees product vision and partnerships.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
