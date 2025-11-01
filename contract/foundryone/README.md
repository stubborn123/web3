## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

构建合约和编译合约的区别 : 编译是将solidity转换为EVM字节码，构建包括编译还有后面部署合约的准备工作 build命令同时完成包括编译在内的工作。


```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

cast工具有多强大们都有什么功能和用途？？？
怎么配合forge的使用????


```shell
$ forge --help
$ anvil --help
$ cast --help
```


### forge目录结构：
src 编写智能合约  .sol
test 编写测试用例  .t.sol
script 部署合约的脚本  .s.sol


### OpenZeppelin框架：
OpenZeppelin框架是一个开源的智能合约开发框架，专注于提供安全，经过审计的只能合约模板的智能合约模板和工具，主要用途：
（1）提供安全标准合约实现，实现了各种的ERC标准（ERC20，ERC721，ERC1155等）实现可升级的合约模式
（2）安全开发工具
（3）提供代理模式的可升级合约框架
（4）还有一些别的功能，数学库，安全随机数等

OpenZepplin是智能合约开发最广泛使用的框架之一，包括Uniswap，Aave等DeFi项目都采用。与Hardhat，Foundry这些集成。社区也比较活跃，有维护和更新这些支持。

OpenZeeplin合约版本
OpenZepplin主要版本分为标准版本，可升级版本。这里选择可升级的合约

代码导入
```
// 导入标准 OpenZeppelin 合约
import "openzeppelin-contracts/contracts/[具体路径]/[合约名称].sol";

// 导入可升级版本的 OpenZeppelin 合约
import "openzeppelin-contracts-upgradeable/contracts/[具体路径]/[合约名称].sol";
```

标准安装
```
forge install OpenZeppelin/openzeppelin-contracts
```

可升级安装
```
forge install OpenZeppelin/openzeppelin-contracts-upgradeable
```

### Remapping
Remapping文件是foundry开发框架的一个配置文件，用于定义Solidity导入路径映射关系，有了这个就不必指定完整的相对或绝对的路径。

手动创建

Remapping文件的查询命令
```
forge remappings 
```


### 部署合约
用于执行s.sol部署脚本，部署智能合约
测试环境可以带私钥尝试
 forge script ./script/FoundryOne.s.sol:TreasureManagerScript --rpc-url https://rpc.roothashpay.com --private-key 你的私钥 --broadcast


设置环境以window为例
 $env:PRIVATE_KEY="XXXXXXXXc"

查看是否设置成功
echo %PRIVATE_KEY%



部署
 forge script ./script/FoundryOne.s.sol:TreasureManagerScript --rpc-url https://rpc.roothashpay.com --broadcast 


ps msg.sender 和 deployerAddress
deployerAddress 脚本中采用通过私钥明确计算出来的部署地址
```
      uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);
```

验证合约
verify 验证
--rpc-url https://rpc.roothashpay.com                          指定连接到区块链网络RPC节点地址
--verifier blockscout                                          指定使用区块浏览器验证服务商
--verifier-url 'https://explorer.roothashpay.com/api/'         指定区块浏览器的 API 接口地址

0x0e4B5e7c52EBB0a471716fBcc215Ef84eD752e16  部署合约地址
./src/FounftyOne.sol:TheWebThree            指定合约文件路径和合约名称（合约文件:合约名称）

forge verify-contract --rpc-url https://rpc.roothashpay.com --verifier blockscout --verifier-url 'https://explorer.roothashpay.com/api/' 0x6C780989BCe35E2667a844fEb296824c24DF83c8 ./src/FounftyOne.sol:TheWebThree 