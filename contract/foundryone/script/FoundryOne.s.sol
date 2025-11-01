// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Vm.sol";
import {Script, console } from "forge-std/Script.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

import "../src/FoundryOne.sol";
import "../test/EmptyContract.sol";


contract TreasureManagerScript is Script {
    EmptyContract public emptyContract;
    FoundryOne public theWebThree;
    FoundryOne public theWebThreeImplementation;
    ProxyAdmin public theWebThreeProxyAdmin;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        emptyContract = new EmptyContract();

        TransparentUpgradeableProxy proxyTheWebThree = new TransparentUpgradeableProxy(address(emptyContract), deployerAddress, "");

        theWebThree = FoundryOne(payable(address(proxyTheWebThree)));

        console.log("theWebThree address======", address(theWebThree));

        theWebThreeImplementation = new FoundryOne();
        theWebThreeProxyAdmin = ProxyAdmin(getProxyAdminAddress(address(proxyTheWebThree)));

        // theWebThreeProxyAdmin.upgradeAndCall(
        //     ITransparentUpgradeableProxy(address(theWebThree)),
        //     address(theWebThreeImplementation),
        //     abi.encodeWithSelector(
        //         FoundryOne.initialize.selector,
        //         10e28,
        //         msg.sender
        //     )
        // );
           theWebThreeProxyAdmin.upgradeAndCall(
            ITransparentUpgradeableProxy(address(theWebThree)),
            address(theWebThreeImplementation),
            abi.encodeWithSelector(
                FoundryOne.initialize.selector,
                10e28,
                deployerAddress  //使用deployerAddress作为owner
            )
        );
        //theWebThree.mint(msg.sender, 10e28);
        theWebThree.mint(deployerAddress, 10e28);  // 使用deployerAddress调用mint

        vm.stopBroadcast();
    }

    function getProxyAdminAddress(address proxy) internal view returns (address) {
        address CHEATCODE_ADDRESS = 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D;
        Vm vm = Vm(CHEATCODE_ADDRESS);

        bytes32 adminSlot = vm.load(proxy, ERC1967Utils.ADMIN_SLOT);
        return address(uint160(uint256(adminSlot)));
    }
}
