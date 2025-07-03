import React from "react";

interface WalletOnboardingModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: () => void;
  onImport: () => void;
  isLoading: boolean;
  error: string;
  showImportInput: boolean;
  setShowImportInput: (v: boolean) => void;
  importPrivateKey: string;
  setImportPrivateKey: (v: string) => void;
}

const WalletOnboardingModal: React.FC<WalletOnboardingModalProps> = ({
  visible,
  onClose,
  onCreate,
  onImport,
  isLoading,
  error,
  showImportInput,
  setShowImportInput,
  importPrivateKey,
  setImportPrivateKey,
}) => {
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
        {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
        {!showImportInput ? (
          <>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl mb-4 border-2 border-black shadow"
              onClick={onCreate}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create a New Wallet"}
            </button>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
              onClick={() => {
                setShowImportInput(true);
              }}
              disabled={isLoading}
            >
              Import Wallet
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full border-2 border-black rounded-xl p-3 mb-4"
              placeholder="Enter your private key"
              value={importPrivateKey}
              onChange={(e) => setImportPrivateKey(e.target.value)}
              disabled={isLoading}
            />
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow mb-2"
              onClick={onImport}
              disabled={isLoading}
            >
              {isLoading ? "Importing..." : "Import Wallet"}
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-xl border-2 border-black shadow"
              onClick={() => {
                setShowImportInput(false);
              }}
              disabled={isLoading}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletOnboardingModal;
