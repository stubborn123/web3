# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

（1）本地部署
启动本地节点
```
npx hardhat  node
```

本地部署
```
npx hardhat ignition deploy ./ignition/modules/xxx.ts --network localhost
```

本地验证合约没有区块链浏览器，没有意义，部署到区块链网络上再验证。


（2）在链上部署
在sepolia上部署

获取测试token

配置rpc地址，如果不是公共网就用别的平台（一般会有免费额度）

部署合约在链上，以sepolia为例
```
npx hardhat ignition deploy ignition/modules/counter.ts --network sepolia
```

验证合约
```
npx hardhat verify --network sepolia <YOUR_CONTRACT_ADDRESS>
```
也可以在对应的区块链浏览器


(3) 注意事项
注意不要硬编码把私钥暴露出来，可以把这个.env放到忽略

