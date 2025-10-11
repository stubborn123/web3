import { Interface } from '@ethersproject/abi';
import { hexlify } from 'ethers';

//引入上面的以来里面的ethers库
const ethers = require('ethers');

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
    const hdNode = ethers.utils.HDNode.fromSeed(Buffer.from(seedHex,'hex'))

    //这里 m表示的是主密钥，44指的是BIP44标准的（BIP的B是比特币，I是提升，P是协议，但是这个标准对其他都是适用）
    //60 是以太坊的币种编号（在BIP44标准中的以太坊是60）
    const{
        privateKey,
        publicKey,
        address
    } = hdNode.derivePath("m/44'/60'/0'/0/" + addressIndex +'');


    //转换为JSON字符串
    return JSON.stringify({
        privateKey,
        publicKey,
        address
    });
}

//ETH SDK 支持的EVM链
const SUPPORT_CHAIN_NETWORK = {
    1:'Ethereum',
    11155111: 'Sepolia',
    42161:'Arbitrum'
}

/**
 * 
 * @param params 这个any表示任意类型，相比一些后端的泛型还随意
 * 
 * Promise返回一个promise对象可以类似Java后端的异步返回的Future对象。这里代表如果执行成功的话返回字符串
 * （Promise<string>）  这个Promise是JavaScript的ES6带来的特性，用于处理异步，不是TypeScript独有的
 * 是替代传统的回调函数，使异步代码更加易读
 * 
 * @returns 
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

    if( !SUPPORT_CHAIN_NETWORK[chainId] ){
        throw new Error('chaind id ${chainId} is not support.');
    }

    //const wallet = new ethers.Wallet(Buffer.from(privateKey,'hex'));
    const wallet = new ethers.Wallet(privateKey);
    const txData : any = {
        //hexlify 16进制
        //v5 升到v6 ，除了这个helify的位置改变，校验也变得严格
        // 可以考虑toBeHex来替代helify
        nonce: ethers.toBeHex(nonce),
        from,
        to,
        gasLimit:ethers.toBeHex(gasLimit),
        value:ethers.toBeHex(ethers.parseUnits(amount,decimal)),
        chainId
    }

    if(maxFeePerGas && maxPriortyFeePerGas){
        txData.maxFeePerGas = ethers.toBeHex(maxFeePerGas);
        txData.maxPriortyFeePerGas = ethers.toBeHex(maxPriortyFeePerGas);
    }else{
        txData.gasPrice = ethers.toBeHex(gasPrice)
    }

    if(tokenAddress && tokenAddress !== '0x00'){
        const ABI = [
            'function transfer(address to , uint amount)'
        ];

        //interfac关键字是TypeScript特有的特性
        const iface = new Interface(ABI)
        const idata = iface.encodeFunctionData('transfer', [to,ethers.toBeHex(ethers.utils.parseUnits(amount,decimal))]);

        txData.data = idata;
        txData.to = tokenAddress;
        txData.value = 0;
    }

    if(data){
        txData.data = data;
    }
    return wallet.signTransaction(txData);
}

export function verifyEthAddress(params:any){
    const { address } = params;
    return ethers.utils.isAddress(address);
}

export function importEthAddress(privateKey: string){
    const wallet = new ethers.Wallet(Buffer.from(privateKey,'hex'));
    return JSON.stringify({
        privateKey,
        address:wallet.address
    });
}

/**
 * 发送已签名的以太坊交易
 * @param params 交易参数
 * @returns 交易哈希
 */
export async function sendSignedTransaction(params: any): Promise<string> {
    const {
        signedTransaction,  // 已签名的交易数据
        rpcUrl              // 测试网络的RPC URL
    } = params;

    // 创建以太坊提供者，连接到测试网络
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    
    try {
        // 发送交易
        const txResponse = await provider.sendTransaction(signedTransaction);
        // 返回交易哈希
        return txResponse.hash;
    } catch (error) {
        throw new Error(`发送交易失败: ${(error as Error).message}`);
    }
}