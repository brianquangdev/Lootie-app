// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/WelcomeToLootieNFT.sol";
import "../src/QuestManager.sol";

contract DeployLootie is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy NFT contract, owner là ví deploy
        WelcomeToLootieNFT nft = new WelcomeToLootieNFT(msg.sender);

        // Deploy QuestManager, truyền địa chỉ NFT
        QuestManager questManager = new QuestManager(address(nft));

        // Set questManager cho NFT
        nft.setQuestManager(address(questManager));

        vm.stopBroadcast();
    }
} 