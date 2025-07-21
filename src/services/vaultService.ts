// 🔐 vaultService.ts - Xử lý mã hóa/giải mã vault, validate password, session
import CryptoJS from "crypto-js";

const VAULT_KEY = "encryptedVault";
const SESSION_KEY = "vaultSession";
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 phút

// 🔐 Mã hóa mnemonic bằng AES
export function encryptMnemonic(mnemonic: string, password: string): string {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
}

// 🔐 Giải mã mnemonic bằng AES
export function decryptMnemonic(
  encrypted: string,
  password: string
): string | null {
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, password).toString(
      CryptoJS.enc.Utf8
    );
    return decrypted || null;
  } catch {
    return null;
  }
}

// 🔐 Kiểm tra password có giải mã đúng vault không
export function validatePassword(encrypted: string, password: string): boolean {
  const mnemonic = decryptMnemonic(encrypted, password);
  return !!mnemonic;
}

// 🔐 Lưu session khi unlock vault
export function setVaultSession() {
  localStorage.setItem(SESSION_KEY, Date.now().toString());
}

// 🔐 Kiểm tra session timeout (giả lập)
export function checkSession(): boolean {
  const last = localStorage.getItem(SESSION_KEY);
  if (!last) return false;
  return Date.now() - parseInt(last, 10) < SESSION_TIMEOUT;
}

// 🔐 Xóa session khi logout
export function clearVaultSession() {
  localStorage.removeItem(SESSION_KEY);
}
