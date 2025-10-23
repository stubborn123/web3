### 创建工程

hardhat就是一个合约的环境

在设置好node环境，以及安装好hardhat后初始化一个hardhat工程。

mkdir 创建一个目录最为工程目录，初始化hardhat命令
```
npx hardhat --init
```
选择 Create a TypeScript project (with Viem)
这个viem是最新的web3的工具库，是一种与区块链交互的TypeScript-first客户端库。
一个替代传统的Ethers.js或web3.js，要用它来部署和操作合约。（新的hardhat v3版本推荐使用Viem + TypeScript）


会得到一个工程，在这个工程基础上开始开发。



(1)添加合约

（2）编译合约
安装依赖
```
npm install
```
进行编译
```
npx hardhat compile
```
这个合约名要和文件名一致，否则编译会报错

(3)部署合约
创建部署脚本

在这个ignition/modules ，创建部署脚本
```
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m) => {
  const counter = m.contract("counter");

  return { counter };
});
```
这里要注意假设你部署的脚本是counter.ts，对应const counter = m.contract("counter");
要匹配的名字和括号里相同，大小写也是要区分的。


a 本地网络部署
```
npx hardhat node
```
本地网络http://127.0.0.1:8545 

PS 重新编译 + 重新部署
合约有问题或者要修改，修改了合约，下一步就要重新编译和重新部署

跟别的语言工程差不多，首先要清理，然后再编译
```
npx hardhat clean
```

```
npx hardhat compile
```
查看是否编译报错


```
npx hardhat node
```

b
deploy命令

本地部署合约
```
npx hardhat ignition deploy ./ignition/modules/xxx.ts --network localhost
```


返回结果
```
E:\data\hardhad-demo\hardhatone>npx hardhat ignition deploy ./ignition/modules/counter.ts --network localhost
Hardhat Ignition 🚀

Deploying [ CounterModule ]

Batch #1
  Executed CounterModule#counter

[ CounterModule ] successfully deployed 🚀

Deployed Addresses

CounterModule#counter - 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

c 本地测试文件
创建一个测试文件，hardhat的是typescript文件 xxx.t.ts

npx hardhat test 

控制态输出
```
PS E:\data\hardhad-demo\hardhatone> npx hardhat test 
Compiled 1 Solidity file successfully (evm target: paris).


  Counter Contract
    ✔ 部署后初始number应该为100
    ✔ add函数应正确返回和
    ✔ mul函数应正确返回积
    ✔ sub函数应正确返回差
    ✔ div函数应正确返回商

```


部署在测试环境
（1）获取测试网信息

（2）配置Hardhat网络
在hardhat.config.ts 上修改
```
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const SEPOLIA_URL = process.env.SEPOLIA_RPC_URL || "";  // 来自 Alchemy/Infura
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";       // MetaMask 导出的账号私钥

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY], // 用于部署的账号
    },
  },
};

export default config;

```
建议把私钥和 RPC URL 放在 .env 文件中，别暴露。
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

验证部署结果，去对应浏览器，或者直接通过metamask来查看


const counter = await ethers.getContractAt("counter", "0x5fbdb2315678afecb367f032d93f642f64180aa3");
