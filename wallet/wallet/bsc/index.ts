import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // 1️⃣ 载入私钥（切勿硬编码）
  const privateKey = process.env.PRIVATE_KEY!;
  const wallet = new ethers.Wallet(privateKey);

  // 2️⃣ 离线指定交易参数
  // 注意：这些参数都可以线下准备，不依赖网络
  const to = "0xReceiverAddressHere";       // 接收者地址
  const value = ethers.parseEther("0.01");  // 转账金额 (1e16 wei)
  const nonce = 0; // ⚠️ 实际使用时应通过链上 RPC 获取，离线模式需提前准备
  const gasLimit = 21000n;                  // 普通转账 gas
  const gasPrice = ethers.parseUnits("3", "gwei"); // 可自定义

  // 3️⃣ 组装交易对象
  const tx = {
    to,
    value,
    nonce,
    gasLimit,
    gasPrice,
    chainId: 56, // 56 表示 BSC 主网；测试网使用 97
  };

  // 4️⃣ 使用钱包私钥进行离线签名
  const signedTx = await wallet.signTransaction(tx);

  console.log("✅ 已签名交易:");
  console.log(signedTx);

  // 5️⃣ 可选：计算交易哈希（但未发送）
  const txHash = ethers.keccak256(signedTx); // 计算本地哈希
  console.log("交易哈希:", txHash);

  console.log("\n现在你可以将 signedTx 广播至 BSC 节点：");
  console.log("curl -X POST https://bsc-dataseed.binance.org -H 'Content-Type: application/json' --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"YOUR_SIGNED_TX_HERE\"],\"id\":1}'");
}

main().catch(console.error);
