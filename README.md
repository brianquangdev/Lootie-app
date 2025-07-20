<p align="center">
  <img src="src/assets/Lootie-logo.png" alt="Lootie Logo" width="400"/>
</p>

# 🎮 Lootie

> Your Web3 Gaming Wallet • Collect • Swap • Quest

Become part of the most exciting Web3 gaming communities. Explore, collect, swap, and earn rewards — all in one place!

---

## 🕹️ What is Lootie?

Lootie is a game-first Web3 platform built on the **Saga** blockchain, combining a customizable wallet, interactive Game Hub, Quest system, and social features for blockchain gamers. It leverages Saga's chainlet infrastructure and EVM compatibility for seamless on-chain experiences.

---

## 🚀 Features

- **Custom Wallet**: Multi-wallet, onboarding, import/export, encrypted vault, SAGA RPC integration
- **Game Hub**: Discover, track, and play supported blockchain games
- **NFT & Token Dashboard**: Manage, showcase, and swap in-game assets
- **Quest System**: Join, complete, and claim on-chain/social/game quests for rewards (XP, NFT, token)
- **Collabs & Communities**: Find partners, join teams, and grow your network
- **Modern UX**: Responsive, mobile-ready, beautiful UI/UX
- **Saga Native**: Optimized for Saga chainlet architecture, EVM-compatible, using Saga RPC
- **Backend API**: Secure wallet creation/import, balance check, and Saga integration
- **Smart Contracts**: QuestManager, Quest, and more (see lootie-contracts/)

---

## 🏗️ Project Structure

- **src/**: Frontend (React + TypeScript)
  - Components: Wallet, Portfolio, QuestHub, Collabs, Communities, etc.
  - Data: mockQuests, mockCollabs, contract addresses, chainlet config
  - Assets: Logo, images, icons
- **backend/**: Express.js backend
  - API: Wallet create/import, balance (Saga RPC)
  - Static: Serves frontend build
- **lootie-contracts/**: Smart contracts (Solidity, Foundry)
  - Contracts: QuestManager, Quest, etc.
  - Scripts: Deployment, test scripts
  - Tests: Unit/security tests

---

## 🔗 Saga Infrastructure Usage

### **Chainlet Architecture**

- **Lootie Gaming Chainlet**: Dedicated chainlet for gaming transactions (30M gas limit, 2s block time)
- **Quest Management Chainlet**: Specialized chainlet for quest and reward management (15M gas limit, 1s block time)
- **NFT Collection Chainlet**: Optimized chainlet for NFT minting and trading (25M gas limit, 3s block time)

### **Cross-Chain Communication**

- **Cross-chain transfers** between different chainlets
- **Bridge support** for asset movement across chainlets
- **Multi-chain quests** spanning multiple chainlets
- **Cross-chain NFT trading** across specialized chainlets

### **Saga APIs Integration**

- **Chainlet Management API**: Create, deploy, and monitor chainlets
- **Cross-Chain API**: Handle transfers and bridge operations
- **Quest System API**: Create, complete, and reward quests
- **NFT Marketplace API**: Mint, trade, and manage NFTs

### **Modular Blockchain Features**

- **Proof of Stake Consensus**: 100 validators, 7-day staking period
- **Scalability**: Sharding, parallel processing, 100K TPS capacity
- **Interoperability**: Seamless cross-chain communication
- **Custom Gas Limits**: Optimized for different use cases

### **Infrastructure Dashboard**

- Real-time metrics monitoring (TPS, active chainlets, transactions)
- Chainlet selection and management interface
- API status monitoring and health checks
- Modular features showcase and configuration

---

## 🧩 Main Modules

- **Wallet**: Multi-wallet, onboarding, import/export, encrypted vault, SAGA RPC
- **Portfolio**: Asset overview, tokens, NFTs, wallet value
- **QuestHub**: Join, complete, claim quests (on-chain, social, in-game)
- **Collabs**: Find, connect, and collaborate with other "hunters"
- **Communities**: Explore game communities, projects, teams
- **Game Hub**: Game list, play history, achievements

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

## 📦 Tech Stack

- React + TypeScript + Vite
- TailwindCSS
- Saga Modular Blockchain (EVM-compatible, chainlet)
- Express.js backend
- Foundry (Solidity, smart contract)
- ethers.js, axios, Privy Auth

---

## 🔒 Security & Testing

- All wallet operations are local & encrypted (never stored on server)
- Unit tests & security checks for smart contracts (see lootie-contracts/test/)
- Follows best practices for Web3 security

---

## 👨‍💻 Credits

- Made by BrianQuangDev

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
