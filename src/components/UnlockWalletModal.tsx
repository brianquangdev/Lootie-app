import * as React from "react";
import CryptoJS from "crypto-js";
import * as bip39 from "bip39";
import hideEye from "../assets/hide-eye.png";
import viewEye from "../assets/view-eye.png";

interface UnlockWalletModalProps {
  onUnlock: () => void;
  onShowSeed: () => void;
  showSeed: boolean;
  onHideSeed: () => void;
}

const UnlockWalletModal: React.FC<UnlockWalletModalProps> = ({
  onUnlock,
  onShowSeed,
  showSeed,
  onHideSeed,
}) => {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [seed, setSeed] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  const [seedError, setSeedError] = React.useState("");
  const [resetSuccess, setResetSuccess] = React.useState(false);

  const encryptedVault = localStorage.getItem("encryptedVault") || "";

  const handleUnlock = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedVault, password).toString(
        CryptoJS.enc.Utf8
      );
      if (!decrypted) {
        setError("Incorrect password");
        return;
      }
      setError("");
      onUnlock();
    } catch {
      setError("Incorrect password");
    }
  };

  const handleSeedReset = () => {
    if (!bip39.validateMnemonic(seed.trim())) {
      setSeedError("Invalid seed phrase");
      return;
    }
    if (newPassword.length < 8) {
      setSeedError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSeedError("Passwords do not match");
      return;
    }
    // Re-encrypt vault
    const encrypted = CryptoJS.AES.encrypt(seed.trim(), newPassword).toString();
    localStorage.setItem("encryptedVault", encrypted);
    setSeedError("");
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      onHideSeed();
      onUnlock();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-4 border-black p-8 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Unlock Wallet</h2>
        {!showSeed ? (
          <>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-2 border-black rounded-xl p-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? viewEye : hideEye}
                alt="toggle password"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
              />
            </div>
            {error && (
              <div className="text-red-600 mb-3 text-center">{error}</div>
            )}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow mb-2"
              onClick={handleUnlock}
            >
              Unlock
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-xl border-2 border-black shadow"
              onClick={onShowSeed}
            >
              Forgot password?
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-2 text-center">
              Reset Password with Seed Phrase
            </h3>
            <input
              type="text"
              className="w-full border-2 border-black rounded-xl p-3 mb-3"
              placeholder="Enter your seed phrase"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
            <div className="relative mb-3">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full border-2 border-black rounded-xl p-3"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <img
                src={showNewPassword ? viewEye : hideEye}
                alt="toggle password"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                onClick={() => setShowNewPassword((v) => !v)}
              />
            </div>
            <div className="relative mb-3">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                className="w-full border-2 border-black rounded-xl p-3"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <img
                src={showConfirmNewPassword ? viewEye : hideEye}
                alt="toggle password"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                onClick={() => setShowConfirmNewPassword((v) => !v)}
              />
            </div>
            {seedError && (
              <div className="text-red-600 mb-3 text-center">{seedError}</div>
            )}
            {resetSuccess && (
              <div className="text-green-600 mb-3 text-center">
                Password reset! Unlocking...
              </div>
            )}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow mb-2"
              onClick={handleSeedReset}
            >
              Reset Password & Unlock
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-xl border-2 border-black shadow"
              onClick={onHideSeed}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UnlockWalletModal;
