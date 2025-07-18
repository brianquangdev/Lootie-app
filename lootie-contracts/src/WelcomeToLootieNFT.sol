// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WelcomeToLootieNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    address public questManager;

    modifier onlyQuestManager() {
        require(msg.sender == questManager, "Not authorized");
        _;
    }

    constructor(address initialOwner) ERC721("Welcome to Lootie", "LOOTIEPASS") Ownable(initialOwner) {}

    function setQuestManager(address _questManager) external onlyOwner {
        questManager = _questManager;
    }

    function mint(address to) external onlyQuestManager {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    // OpenZeppelin v5: override _update to block all transfers except mint/burn
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        // Allow mint (from == address(0)) and burn (to == address(0))
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: non-transferable");
        }
        return super._update(to, tokenId, auth);
    }
} 