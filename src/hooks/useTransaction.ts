// hooks/useTransaction.ts
import { useState, useCallback } from "react";
import {
  sendNativeToken,
  sendERC20Token,
} from "../services/transactionService";

export function useTransaction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendTransaction = useCallback(
    async ({
      to,
      amount,
      tokenType,
      signer,
      tokenAddress,
    }: {
      to: string;
      amount: string;
      tokenType: "native" | "erc20";
      signer: any;
      tokenAddress?: string;
    }) => {
      setLoading(true);
      setError(null);
      setTxHash(null);
      setSuccess(false);
      let result;
      if (tokenType === "native") {
        result = await sendNativeToken({ to, amount, signer });
      } else {
        result = await sendERC20Token({
          to,
          amount,
          signer,
          tokenAddress: tokenAddress!,
        });
      }
      setLoading(false);
      setTxHash(result.txHash);
      setSuccess(result.success);
      setError(result.error);
      return result;
    },
    []
  );

  return { loading, error, txHash, success, sendTransaction };
}
