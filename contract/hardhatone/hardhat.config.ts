import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

// 通过dotenv来读取env的配置
// 标准TypeScript导入方式
import * as dotenv from "dotenv";
// 加载.env文件中的环境变量
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    hardhat :{},

    // Sepolia测试网配置
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
       timeout: 60000, // 增加超时时间到60秒
    },

    // 测试网配置
    rootHashTest: {
      url: process.env.RootHashTest_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },

    // 替换原来的etherscan配置
    etherscan: {
      apiKey: {
        sepolia: process.env.ETHERSCAN_API_KEY
      },
      timeout: 120000 // 增加超时时间到120秒
    },

};

export default config;