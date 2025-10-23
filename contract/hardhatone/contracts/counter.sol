//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.28;

contract counter{
    uint256 public number;

    constructor(){
        number = 100;
    }

    function add(uint256 a,uint256 b) public pure returns(uint256) {
        return a + b;
    }

    function mul(uint256 a,uint256 b) public pure returns(uint256) {
        return a * b;
    }

    function sub(uint256 a, uint256 b) public pure returns(uint256) {
        return a - b;
    }

    function div(uint256 a,uint256 b) public pure returns(uint256) {
        return a / b;
    }

    //public view returns 分别表示public 公共任何地址都能调用
    //view 关键字 转台修饰符，表示这个函数不会被修改链上数据
    //returns这个是函数声明，表示返回一个类型要区别于return，return是一个返回函数，函数声明合约里面必须是returns
    function returnNumber() public view returns(uint256){
        return number;
    }
}