//导入测试的模块
import { signEthTransaction } from "../wallet/eth";


describe('eth unit test case' , () => {

    test('sign', async () => {
        const rawHex = await signEthTransaction({
            "privateKey" : "你的测试私钥",
            "nonce" : 0,
            "from" :"0x3B29376Fa81AF52fbd90ed423aC030dafb57C7D3",
            "to":"0x7c2b26F51E44581CC1A30C6a71A800Df818383af",
            "gasLimit":"21000",
            "amount":"0.0001",
            "gasPrice":5795962165,
            "decimal":18,
            "chainId":11155111,
            "tokenAddress":"0x00",//“空”或者0x00都代表为以太坊转账而不是别的代币转账
            "rpcUrl": 'https://rpc.sepolia.org'//sepolia的URL
        })

        console.log('sign start -------')
        console.log(rawHex)
        console.log('sign end ---------')
    });

});