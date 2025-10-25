// 从主包 ethers 导入所有需要的功能
import { ethers } from 'ethers';

/**
 * Get address from seed
 * @param seedHex 助记词生成的种子（Hex编码），16进制的字符串，要随机生成的，不要自己定义
 * 单独获取助记词要注意根据BIP39生成随机的助记词，再转换为种子，最后生成一个16进制的二进制种子
 *
 * @param addressIndex  字符串类型的地址索引，用于确定HD钱包生成的索引地址，HD钱包分层钱包，解释根据对应的协议
 * 生成一个由一个种子生成多个地址的钱包，一方面不同的地址索引可以从一个种子来保活隐私。另外可以相当于掌握多个地址用到也很方便，这个字符串形式的数字
 * 
 */
export function createEthAddress(seedHex: string, addressIndex: string){
    // ethers v6 中使用 ethers.HDNodeWallet.fromSeed 从种子创建钱包
    const hdNode = ethers.HDNodeWallet.fromSeed(Buffer.from(seedHex, 'hex'));

    // 推导路径保持不变
    const derivedNode = hdNode.derivePath(`m/44'/60'/0'/0/${addressIndex}`);

    return JSON.stringify({
        privateKey: derivedNode.privateKey,
        publicKey: derivedNode.publicKey,
        address: derivedNode.address
    });
}

//ETH SDK 支持的EVM链
const SUPPORT_CHAIN_NETWORK = {
    1: 'Ethereum',
    11155111: 'Sepolia',
    42161: 'Arbitrum'
} as const;


// 定义支持的链ID类型
type SupportedChainId = keyof typeof SUPPORT_CHAIN_NETWORK;

/**
 * 签名以太坊交易
 * @param params 交易参数
 * @returns 签名后的交易数据
 */
export async function signEthTransaction(params: any): Promise<string>{
    const{
        privateKey,
        nonce,
        from,
        to,
        gasLimit,
        gasPrice,
        amount,
        data,
        chainId,
        decimal,
        maxFeePerGas,
        maxPriortyFeePerGas,
        tokenAddress
    } = params;

    if( !SUPPORT_CHAIN_NETWORK[chainId as SupportedChainId] ){
        throw new Error(`chaind id ${chainId} is not support.`);
    }

    // 直接从 ethers 创建钱包实例
    const wallet = new ethers.Wallet(privateKey);
    const txData : any = {
        nonce: ethers.toBeHex(nonce),
        from,
        to,
        gasLimit: ethers.toBeHex(gasLimit),
        value: ethers.toBeHex(ethers.parseUnits(amount, decimal)),
        chainId
    };

    //（1）在JavaScript里面会将非布尔值转换为布尔值（非0数字，非空字符串对象，不是null，不是undefined，不是Nan为true，反之为false）
    //（2）EIP-1559 对应给矿工的消费进行设置，小费（maxPriortyFeePerGas）+基础费用（被销毁的）= 实际费用 < 最大gas限制
    if(maxFeePerGas && maxPriortyFeePerGas){
        txData.maxFeePerGas = ethers.toBeHex(maxFeePerGas);
        txData.maxPriortyFeePerGas = ethers.toBeHex(maxPriortyFeePerGas);
    } else {
        //旧的也要兼容
        txData.gasPrice = ethers.toBeHex(gasPrice);
    }

    
    if(tokenAddress && tokenAddress !== '0x00'){
        const ABI = [
            'function transfer(address to , uint amount)'
        ];

        // ethers v6 中创建接口实例的方式
        const iface = new ethers.Interface(ABI);
        const idata = iface.encodeFunctionData('transfer', [to, ethers.parseUnits(amount, decimal)]);

        txData.data = idata;
        txData.to = tokenAddress;
        txData.value = 0;
    }

    if(data){
        txData.data = data;
    }
    return wallet.signTransaction(txData);
}

export function verifyEthAddress(params: any){
    const { address } = params;
    // ethers v6 中 isAddress 是顶级函数
    return ethers.isAddress(address);
}

export function importEthAddress(privateKey: string){
    const wallet = new ethers.Wallet(privateKey);
    return JSON.stringify({
        privateKey,
        address: wallet.address
    });
}

/**
 * 发送已签名的以太坊交易
 * @param params 交易参数
 * @returns 交易哈希
 */
export async function sendSignedTransaction(params: any): Promise<string> {
    const {
        signedTransaction,
        rpcUrl
    } = params;

    // ethers v6 中创建provider的方式
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    try {
        const txResponse = await provider.broadcastTransaction(signedTransaction);
        return txResponse.hash;
    } catch (error) {
        throw new Error(`发送交易失败: ${(error as Error).message}`);
    }
}