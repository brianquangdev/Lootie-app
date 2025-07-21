// services/transactionService.ts
import { ethers } from "ethers";
import { LOOTIE_CHAINLET } from "../config/chainletConfig";

// Gửi native LOOTIE token
export async function sendNativeToken({
  to,
  amount,
  signer,
}: {
  to: string;
  amount: string;
  signer: ethers.Wallet;
}) {
  try {
    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseUnits(amount, LOOTIE_CHAINLET.decimals),
    });
    await tx.wait();
    return { success: true, txHash: tx.hash, error: null };
  } catch (error: any) {
    return {
      success: false,
      txHash: null,
      error: error.message || "Transaction failed",
    };
  }
}

// Gửi ERC20 token
export async function sendERC20Token({
  to,
  amount,
  signer,
  tokenAddress,
}: {
  to: string;
  amount: string;
  signer: ethers.Wallet;
  tokenAddress: string;
}) {
  try {
    const abi = [
      "function transfer(address to, uint256 amount) public returns (bool)",
    ];
    const contract = new ethers.Contract(tokenAddress, abi, signer);
    const decimals = (await contract.decimals) ? await contract.decimals() : 18;
    const tx = await contract.transfer(
      to,
      ethers.utils.parseUnits(amount, decimals)
    );
    await tx.wait();
    return { success: true, txHash: tx.hash, error: null };
  } catch (error: any) {
    return {
      success: false,
      txHash: null,
      error: error.message || "Transaction failed",
    };
  }
}
