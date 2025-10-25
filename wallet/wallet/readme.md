一 使用ts注意事项：
（1）安装npm，并安装typescript
```
npm install -g typescript

```
(2)vscode配置
安装vscode，并安装TypeScript官方插件


建议安装pretter，EsLint（静态代码分析）



二 测试Jest框架
（1）安装测试框架
```
npm install --save-dev jest ts-jest @types/jest
```

这里要注意最开始版本29，现在有30版本，可以直接指定jest版本

Jest 29 + ts-jest 29 是经过广泛测试的稳定组合

```
npm install --save-dev jest@29 ts-jest@29 @types/jest@29
```


（2）调整设置jest，不如说创建或修改jest.config.js文件


（3）测试

```
npx jest
```
另外设置测试私钥



PS

注意的点
（1）避免泄露私钥


离线签名
解释不需要连接到网络的签名，以eth的index.ts为例，在定义参数的都没有网络对应的。只需要私钥和交易参数，整个签名的过程在本地完成。




### 使用说明
使用这个钱包工程，最好是用vscode打开wallet文件夹，否则执行命令的时候会用到根目录，如果是整个git目录结构的话会有一些问题。
