// 🔐 useWallet.ts - Custom hook thao tác tạo ví, derive child
import { ethers, HDNodeWallet } from "ethers";
import { encryptMnemonic, decryptMnemonic } from "../services/vaultService";

const VAULT_KEY = "encryptedVault";

export function useWallet() {
  // 🔐 Tạo ví mới, mã hóa mnemonic và lưu vault
  function createWallet(password: string, name: string = "Account 1") {
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic?.phrase || "";
    const encrypted = encryptMnemonic(mnemonic, password);
    localStorage.setItem(VAULT_KEY, encrypted);
    // Lưu ví đầu tiên vào localStorage (có thể refactor sang service/store ở phase sau)
    const walletObj = {
      address: wallet.address,
      name,
      type: "LOOTIE",
      index: 0,
    };
    localStorage.setItem(
      `wallets_${wallet.address}`,
      JSON.stringify([walletObj])
    );
    localStorage.setItem("currentRootAddress", wallet.address);
    localStorage.setItem(`activeWalletIndex_${wallet.address}`, "0");
    return walletObj;
  }

  // 🔐 Derive child wallet từ mnemonic
  function deriveChild(index: number, password: string): ethers.Wallet | null {
    const encrypted = localStorage.getItem(VAULT_KEY) || "";
    const mnemonic = decryptMnemonic(encrypted, password);
    if (!mnemonic) return null;
    const hdNode = HDNodeWallet.fromPhrase(mnemonic);
    const child = hdNode.deriveChild(index);
    return new ethers.Wallet(child.privateKey);
  }

  return {
    createWallet,
    deriveChild,
  };
}
