import * as React from "react";
import * as bip39 from "bip39";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import hideEye from "../assets/hide-eye.png";
import viewEye from "../assets/view-eye.png";

interface WalletOnboardingModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: () => Promise<void>;
  onImport: () => Promise<void>;
  isLoading: boolean;
  error: string;
  showImportInput: boolean;
  setShowImportInput: React.Dispatch<React.SetStateAction<boolean>>;
  importPrivateKey: string;
  setImportPrivateKey: React.Dispatch<React.SetStateAction<string>>;
}

const WalletOnboardingModal: React.FC<WalletOnboardingModalProps> = ({
  visible,
  onClose,
  onCreate: _onCreate,
  onImport: _onImport,
  isLoading: _isLoading,
  error: externalError,
  showImportInput: _showImportInput,
  setShowImportInput: _setShowImportInput,
  importPrivateKey: _importPrivateKey,
  setImportPrivateKey: _setImportPrivateKey,
}) => {
  // Step: 0=choose, 1=create:password, 2=create:showseed, 3=create:confirmseed, 4=create:name, 5=done, 10=import:seed, 11=import:name, 12=done
  const [step, setStep] = React.useState(0);
  // Common
  const [localError, setLocalError] = React.useState("");
  // Create wallet
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState("");
  const [seedConfirm, setSeedConfirm] = React.useState("");
  const [walletName, setWalletName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  // Import wallet
  const [importSeed, setImportSeed] = React.useState("");
  const [isImporting, setIsImporting] = React.useState(false);

  React.useEffect(() => {
    if (!visible) {
      setStep(0);
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setMnemonic("");
      setSeedConfirm("");
      setWalletName("");
      setLocalError("");
      setIsCreating(false);
      setImportSeed("");
      setIsImporting(false);
    }
  }, [visible]);

  // Step 0: Choose create or import
  const renderStep0 = () => (
    <>
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl mb-4 border-2 border-black shadow"
        onClick={() => setStep(1)}
      >
        Create a New Wallet
      </button>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => setStep(10)}
      >
        Import Wallet
      </button>
    </>
  );

  // Step 1: Create - Password
  const renderStep1 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Create Password</h2>
      <div className="relative mb-3">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border-2 border-black rounded-xl p-3"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isCreating}
        />
        <img
          src={showPassword ? viewEye : hideEye}
          alt="toggle password"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
          onClick={() => setShowPassword((v) => !v)}
        />
      </div>
      <div className="relative mb-3">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="w-full border-2 border-black rounded-xl p-3"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isCreating}
        />
        <img
          src={showConfirmPassword ? viewEye : hideEye}
          alt="toggle password"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
          onClick={() => setShowConfirmPassword((v) => !v)}
        />
      </div>
      {localError && (
        <div className="text-red-600 mb-3 text-center">{localError}</div>
      )}
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => {
          if (password.length < 8) {
            setLocalError("Password must be at least 8 characters");
            return;
          }
          if (password !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
          }
          const newMnemonic = bip39.generateMnemonic();
          setMnemonic(newMnemonic);
          setStep(2);
          setLocalError("");
        }}
        disabled={isCreating}
      >
        Next
      </button>
    </>
  );

  // Step 2: Create - Show seed
  const renderStep2 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Your Seed Phrase</h2>
      <div className="bg-gray-100 p-4 rounded-xl mb-3 text-center select-all break-words">
        {mnemonic}
      </div>
      <p className="text-red-600 text-center mb-3">
        Write this down and keep it safe! If you lose it, you cannot recover
        your wallet.
      </p>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => setStep(3)}
      >
        I have saved my seed phrase
      </button>
    </>
  );

  // Step 3: Create - Confirm seed
  const renderStep3 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Confirm Seed Phrase
      </h2>
      <input
        type="text"
        className="w-full border-2 border-black rounded-xl p-3 mb-3"
        placeholder="Enter your seed phrase"
        value={seedConfirm}
        onChange={(e) => setSeedConfirm(e.target.value)}
        disabled={isCreating}
      />
      {localError && (
        <div className="text-red-600 mb-3 text-center">{localError}</div>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => {
          if (seedConfirm.trim() !== mnemonic.trim()) {
            setLocalError("Seed phrase does not match");
            return;
          }
          setLocalError("");
          setStep(4);
        }}
        disabled={isCreating}
      >
        Confirm
      </button>
    </>
  );

  // Step 4: Create - Wallet name
  const renderStep4 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Name Your Wallet</h2>
      <input
        type="text"
        className="w-full border-2 border-black rounded-xl p-3 mb-3"
        placeholder="Enter wallet name"
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
        disabled={isCreating}
        maxLength={32}
      />
      {localError && (
        <div className="text-red-600 mb-3 text-center">{localError}</div>
      )}
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={async () => {
          if (!walletName.trim()) {
            setLocalError("Wallet name is required");
            return;
          }
          setIsCreating(true);
          setLocalError("");
          setTimeout(() => {
            const encryptedVault = CryptoJS.AES.encrypt(
              mnemonic,
              password
            ).toString();
            localStorage.setItem("encryptedVault", encryptedVault);
            const wallet = ethers.Wallet.fromPhrase(mnemonic);
            const rootAddress = wallet.address;
            const walletObj = {
              address: wallet.address,
              name: walletName.trim(),
              type: "ETH",
              index: 0,
            };
            localStorage.setItem(
              `wallets_${rootAddress}`,
              JSON.stringify([walletObj])
            );
            localStorage.setItem(`activeWalletIndex_${rootAddress}`, "0");
            localStorage.setItem("currentRootAddress", rootAddress);
            localStorage.removeItem("wallets");
            localStorage.removeItem("activeWalletIndex");
            localStorage.removeItem("walletAddress");
            localStorage.removeItem("walletName");
            localStorage.setItem(
              "wallet",
              JSON.stringify({
                address: wallet.address,
                privateKey: wallet.privateKey,
              })
            );
            window.dispatchEvent(new Event("walletsUpdated"));
            setIsCreating(false);
            setStep(5);
          }, 500);
        }}
        disabled={isCreating}
      >
        Create Wallet
      </button>
    </>
  );

  // Step 5: Create - Done
  const renderStep5 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Wallet Created!</h2>
      <p className="text-center mb-4">
        Your wallet has been created and secured.
      </p>
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => {
          onClose();
          window.location.reload();
        }}
      >
        Go to Dashboard
      </button>
    </>
  );

  // Step 10: Import - Seed phrase
  const renderStep10 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Import Wallet</h2>
      <input
        type="text"
        className="w-full border-2 border-black rounded-xl p-3 mb-3"
        placeholder="Enter your seed phrase"
        value={importSeed}
        onChange={(e) => setImportSeed(e.target.value)}
        disabled={isImporting}
      />
      {localError && (
        <div className="text-red-600 mb-3 text-center">{localError}</div>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={async () => {
          setLocalError("");
          setIsImporting(true);
          setTimeout(() => {
            if (!bip39.validateMnemonic(importSeed.trim())) {
              setLocalError("Invalid seed phrase");
              setIsImporting(false);
              return;
            }
            // Ask for password for encryption
            const importPassword = prompt(
              "Set a password to encrypt your wallet:"
            );
            if (!importPassword || importPassword.length < 8) {
              setLocalError("Password must be at least 8 characters");
              setIsImporting(false);
              return;
            }
            const encryptedVault = CryptoJS.AES.encrypt(
              importSeed.trim(),
              importPassword
            ).toString();
            localStorage.setItem("encryptedVault", encryptedVault);
            const wallet = ethers.Wallet.fromPhrase(importSeed.trim());
            const rootAddress = wallet.address;
            // Check if wallets already exist for this root address
            let wallets = [];
            try {
              wallets = JSON.parse(
                localStorage.getItem(`wallets_${rootAddress}`) || "null"
              );
            } catch {}
            if (!Array.isArray(wallets) || wallets.length === 0) {
              // If not, create a new wallet with default name
              wallets = [
                {
                  address: wallet.address,
                  name: "Account 1",
                  type: "ETH",
                  index: 0,
                },
              ];
              localStorage.setItem(
                `wallets_${rootAddress}`,
                JSON.stringify(wallets)
              );
            }
            // Only set activeWalletIndex and currentRootAddress, do NOT overwrite wallets if already exist
            localStorage.setItem(`activeWalletIndex_${rootAddress}`, "0");
            localStorage.setItem("currentRootAddress", rootAddress);
            localStorage.removeItem("wallets");
            localStorage.removeItem("activeWalletIndex");
            localStorage.setItem(
              "wallet",
              JSON.stringify({
                address: wallet.address,
                privateKey: wallet.privateKey,
              })
            );
            window.dispatchEvent(new Event("walletsUpdated"));
            setIsImporting(false);
            setStep(12);
          }, 500);
        }}
        disabled={isImporting}
      >
        Import Wallet
      </button>
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-xl border-2 border-black shadow mt-2"
        onClick={() => setStep(0)}
        disabled={isImporting}
      >
        Back
      </button>
    </>
  );

  // Step 12: Import - Done
  const renderStep12 = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Wallet Imported!</h2>
      <p className="text-center mb-4">
        Your wallet has been imported and secured.
      </p>
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
        onClick={() => {
          onClose();
          window.location.reload();
        }}
      >
        Go to Dashboard
      </button>
    </>
  );

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-4 border-black p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-lg font-bold text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Wallet Setup</h2>
        {externalError && (
          <div className="text-red-600 mb-3 text-center">{externalError}</div>
        )}
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 10 && renderStep10()}
        {step === 12 && renderStep12()}
      </div>
    </div>
  );
};

export default WalletOnboardingModal;
