// server.js - Express backend for Lootie
// Technologies: Express.js, Axios, Saga APIs integration
// Purpose: Expose RESTful endpoints for chainlet, quest, NFT, cross-chain operations via Saga infrastructure
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();
const path = require("path");

// Import Saga API modules (to be implemented)
const sagaChainletApi = require("./api/sagaChainletApi");
const questApi = require("./api/questApi");
const nftApi = require("./api/nftApi");
const crossChainApi = require("./api/crossChainApi");

const app = express();
const PORT = process.env.PORT || 3001;

const SAGA_RPC = "https://lootie-2752580283102000-1.jsonrpc.sagarpc.io";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// POST /api/wallet/create - Create a new Ethereum wallet
app.post("/api/wallet/create", (req, res) => {
  try {
    const wallet = ethers.Wallet.createRandom();
    // Return wallet details (DO NOT store on server)
    res.json({
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create wallet." });
  }
});

// POST /api/wallet/import - Import wallet from private key
app.post("/api/wallet/import", (req, res) => {
  const { privateKey } = req.body;
  if (!privateKey) {
    return res.status(400).json({ error: "privateKey is required." });
  }
  try {
    const wallet = new ethers.Wallet(privateKey);
    res.json({ address: wallet.address });
  } catch (err) {
    res.status(400).json({ error: "Invalid private key." });
  }
});

// POST /api/wallet/balance - Get LOOTIE balance for an address
app.post("/api/wallet/balance", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: "address is required." });
  }
  try {
    // Use Saga RPC provider
    const provider = new ethers.JsonRpcProvider(SAGA_RPC);
    const balance = await provider.getBalance(address);
    const formatted = ethers.formatEther(balance);
    res.json({ balance: formatted });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch balance." });
  }
});

// Chainlet routes
app.post("/api/chainlet/create", async (req, res) => {
  // Tạo chainlet mới trên Saga
  try {
    const result = await sagaChainletApi.createChainlet(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/chainlet/status/:id", async (req, res) => {
  // Lấy trạng thái chainlet
  try {
    const result = await sagaChainletApi.getChainletStatus(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quest routes
app.post("/api/quest/create", async (req, res) => {
  // Tạo quest mới trên Saga
  try {
    const result = await questApi.createQuest(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/quest/complete", async (req, res) => {
  // Hoàn thành quest trên Saga
  try {
    const { questId, userAddress } = req.body;
    const result = await questApi.completeQuest(questId, userAddress);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NFT routes
app.post("/api/nft/mint", async (req, res) => {
  // Mint NFT mới trên Saga
  try {
    const result = await nftApi.mintNFT(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/nft/list/:address", async (req, res) => {
  // Lấy danh sách NFT của address
  try {
    const result = await nftApi.listNFTs(req.params.address);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cross-chain routes
app.post("/api/crosschain/transfer", async (req, res) => {
  // Chuyển token/NFT cross-chain trên Saga
  try {
    const result = await crossChainApi.crossChainTransfer(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
