// 🔐 UnlockVaultModal.tsx - Modal mở khóa vault, chỉ dùng useVault
import React, { useState } from "react";
import { useVault } from "../hooks/useVault";

interface UnlockVaultModalProps {
  visible: boolean;
  onUnlock: () => void;
  onClose: () => void;
}

const UnlockVaultModal: React.FC<UnlockVaultModalProps> = ({
  visible,
  onUnlock,
  onClose,
}) => {
  const { unlock, error } = useVault();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  // 🔐 Xử lý unlock vault
  const handleUnlock = () => {
    setLoading(true);
    const ok = unlock(password);
    setLoading(false);
    if (ok) {
      onUnlock();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-4 border-black p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-lg font-bold text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Unlock Vault</h2>
        <input
          type="password"
          className="w-full border-2 border-black rounded-xl p-3 mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow"
          onClick={handleUnlock}
          disabled={loading}
        >
          Unlock
        </button>
      </div>
    </div>
  );
};

export default UnlockVaultModal;
