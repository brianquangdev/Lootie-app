// Simple Express.js backend for wallet creation/import
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();
const path = require("path");

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
