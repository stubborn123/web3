Compiler:
compiler 选择对应版本的solidity
选择编译并不会消耗gas,因为编译是在本地进行，不涉及链上操作，肯定不会消耗Gas。

Compiler configuration
选择编译语言
EVM Version版本，从上到下是新到旧的版本

编译成功后，在Solidity Compiler页面，查看详情“Compilation Details”

在详情里面，可以查看ABI，BYTECODE这些。


Deploy:
（1）Environment
Enviroment,选择部署的环境Remix VM（内置模拟区块链环境，运行在浏览器内存），但是这个也不涉及链上交易，不会产生gas

浏览器扩展，通过浏览器钱包连接真实网络（Mainnet、Testnet、BSC等），这个浏览器扩展也是一个环境，只不是这个是通过钱包来处理这个环境。会产生gas

WalletConnect,通过 WalletDirect/WC 协议连接手机钱包，会产生gas

Custom - External Node RPC，使用你自己的节点 RPC（HTTP/WebSocket）这个是自己去定义。

（2）Account
如果选择的是Remix VM，会给你分配一个账户
选择Provider，则就会选择你的连接钱包的账户


（3）Gas Limit
因为是EVM，GAS Limit最大接受的Gas
如果是Remix则自动估算

不要搞太低，否则合约部署失败


（4）Value
用于部署的以太坊代币（wei），小数点8位
如果你的合约构造函数是 payable，就可以接收这个数值；
否则设置了也会出错。

（5）Contract
选择要部署的合约


Analyzer：
分析器，是 Remix 内置的一个 智能合约静态检测工具。
分析检测代码合约，目前检测会展示两个一个是Remix规则，另一个是Solhnit。

Remix 列显示的是来自 Remix 官方提供的分析规则；（场景：安全审计、漏洞预防	）
Solhint 列显示的是来自 Solhint 规则集（类似 ESLint for Solidity）。（场景：团队协作、规范代码）



File

artifacts 英文对应的意思人工制品，编译产物目录
这个build-info，删掉后编译又会有

scripts 自动化操作脚本（部署、交互、验证、批处理）

