import { expect } from "chai";
import hre from "hardhat";

// 使用 Viem 原生 API 进行合约部署和测试
describe("Counter Contract", function () {
  let counterContract: any; // 使用 any 类型作为临时解决方案

  beforeEach(async function () {
    // 使用 hre.viem.deployContract 部署合约
    counterContract = await hre.viem.deployContract("counter");
    // 等待部署完成（在 Viem 中，deployContract 已经会等待部署完成）
  });

  it("部署后初始number应该为100", async function () {
    const num = await counterContract.read.returnNumber();
    expect(num).to.equal(100n);
  });

  it("add函数应正确返回和", async function () {
    const result = await counterContract.read.add([2n, 3n]);
    expect(result).to.equal(5n);
  });

  it("mul函数应正确返回积", async function () {
    const result = await counterContract.read.mul([3n, 4n]);
    expect(result).to.equal(12n);
  });

  it("sub函数应正确返回差", async function () {
    const result = await counterContract.read.sub([10n, 4n]);
    expect(result).to.equal(6n);
  });

  it("div函数应正确返回商", async function () {
    const result = await counterContract.read.div([20n, 5n]);
    expect(result).to.equal(4n);
  });
});