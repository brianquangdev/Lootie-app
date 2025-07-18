// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/WelcomeToLootieNFT.sol";
import "../src/QuestManager.sol";

contract QuestManagerTest is Test {
    WelcomeToLootieNFT nft;
    QuestManager questManager;
    address user = address(0x123);
    address attacker = address(0x456);

    function setUp() public {
        nft = new WelcomeToLootieNFT(address(this));
        questManager = new QuestManager(address(nft));
        nft.transferOwnership(address(this));
        nft.setQuestManager(address(questManager));
    }

    function testMintNFT() public {
        vm.prank(user);
        questManager.completeFollowXQuest();
        assertEq(nft.ownerOf(0), user);
        assertTrue(questManager.hasClaimed(user));
    }

    function testCannotMintTwice() public {
        vm.prank(user);
        questManager.completeFollowXQuest();
        vm.prank(user);
        vm.expectRevert("Already claimed");
        questManager.completeFollowXQuest();
    }

    function testOnlyQuestManagerCanMint() public {
        vm.prank(attacker);
        vm.expectRevert("Not authorized");
        nft.mint(attacker);
    }

    function testNFTIsSoulbound() public {
        vm.prank(user);
        questManager.completeFollowXQuest();
        vm.prank(user);
        vm.expectRevert("Soulbound: non-transferable");
        nft.transferFrom(user, attacker, 0);
    }
} 