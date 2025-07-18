// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./WelcomeToLootieNFT.sol";

contract QuestManager {
    WelcomeToLootieNFT public nft;
    mapping(address => bool) public hasClaimed;

    event QuestCompleted(address indexed user, uint256 tokenId);

    constructor(address _nft) {
        nft = WelcomeToLootieNFT(_nft);
    }

    function completeFollowXQuest() external {
        require(!hasClaimed[msg.sender], "Already claimed");
        uint256 tokenId = nft.nextTokenId();
        nft.mint(msg.sender);
        hasClaimed[msg.sender] = true;
        emit QuestCompleted(msg.sender, tokenId);
    }
} 