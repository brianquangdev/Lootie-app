# 🎮 Lootie

> Your Web3 Gaming Wallet • Collect • Swap • Quest

Become part of the most exciting Web3 gaming communities. Explore, collect, swap, and earn rewards — all in one place!

---

## 🕹️ What is Lootie?

**Lootie** is a Game-first Web3 platform built on the **Saga** blockchain. It combines a **customizable wallet** with an interactive **Game Hub**, designed specifically for blockchain gamers.

With Lootie, users can:

- Discover and play supported blockchain games
- Manage and showcase NFTs and in-game tokens
- Swap tokens easily with integrated tools
- Join quests to earn XP, NFTs, and on-chain rewards
- Track their gaming journey and achievements

---

## 🚀 Features

- **Custom Wallet:** Built for Web3 gamers to manage assets
- **Game Hub:** Discover games and view play history
- **NFT & Token Dashboard:** See all your items in one place
- **Quest System:** Join live quests and earn rewards
- **Modern UX:** Fast, responsive, and mobile-ready interface
- **Saga Native:** Optimized for Chainlet architecture

---

## 🛠️ Getting Started

### 1. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

---

### 2. **Run in Development Mode (hot reload)**

**Open 2 terminals:**

- **Terminal 1 (Backend):**
  ```bash
  cd backend
  pnpm start
  # or npm start
  ```
- **Terminal 2 (Frontend):**
  ```bash
  pnpm dev
  # or npm run dev
  ```
- Open: [http://localhost:5173](http://localhost:5173) in your browser.

---

### 3. **Run in Production Mode (single process)**

- **Build the frontend:**
  ```bash
  pnpm build
  # or npm run build
  ```
- **Copy the build output to backend:**
  ```bash
  cp -r dist backend/public
  ```
- **Start the backend server:**
  ```bash
  cd backend
  pnpm start
  # or npm start
  ```
- Open: [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📦 Tech Stack

- React + TypeScript + Vite
- TailwindCSS for styling
- Saga Modular Blockchain
- EVM-compatible wallet APIs
- IPFS / NFT / DeFi integration

---

## 👨‍💻 Credits

- Made by BrianQuangDev

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
