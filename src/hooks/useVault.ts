// 🔐 useVault.ts - Custom hook thao tác vault
import { useState } from "react";
import {
  encryptMnemonic,
  decryptMnemonic,
  validatePassword,
  setVaultSession,
  checkSession,
  clearVaultSession,
} from "../services/vaultService";

const VAULT_KEY = "encryptedVault";

export function useVault() {
  const [isUnlocked, setIsUnlocked] = useState(checkSession());
  const [error, setError] = useState<string | null>(null);

  // 🔐 Unlock vault bằng password
  function unlock(password: string): boolean {
    const encrypted = localStorage.getItem(VAULT_KEY) || "";
    if (!encrypted) {
      setError("Vault not found");
      return false;
    }
    if (validatePassword(encrypted, password)) {
      setVaultSession();
      setIsUnlocked(true);
      setError(null);
      return true;
    } else {
      setError("Wrong password");
      return false;
    }
  }

  // 🔐 Logout vault
  function logout() {
    clearVaultSession();
    setIsUnlocked(false);
  }

  // 🔐 Export mnemonic (yêu cầu xác thực lại)
  function exportMnemonic(password: string): string | null {
    const encrypted = localStorage.getItem(VAULT_KEY) || "";
    if (!encrypted) return null;
    return decryptMnemonic(encrypted, password);
  }

  return {
    isUnlocked,
    unlock,
    logout,
    exportMnemonic,
    error,
  };
}
