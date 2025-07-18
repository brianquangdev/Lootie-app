// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Quest {
    struct QuestInfo {
        string name;
        uint256 reward;
        bool active;
    }

    mapping(uint256 => QuestInfo) public quests;
    mapping(address => mapping(uint256 => bool)) public joined;
    address public owner;

    event QuestCreated(uint256 indexed id, string name, uint256 reward);
    event QuestJoined(address indexed user, uint256 indexed id);
    event RewardClaimed(address indexed user, uint256 indexed id, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createQuest(uint256 id, string calldata name, uint256 reward) external onlyOwner {
        require(!quests[id].active, "Quest exists");
        quests[id] = QuestInfo(name, reward, true);
        emit QuestCreated(id, name, reward);
    }

    function joinQuest(uint256 id) external {
        require(quests[id].active, "Quest not active");
        require(!joined[msg.sender][id], "Already joined");
        joined[msg.sender][id] = true;
        emit QuestJoined(msg.sender, id);
    }

    function claimReward(uint256 id) external {
        require(joined[msg.sender][id], "Not joined");
        require(quests[id].active, "Quest not active");
        // For demo: just emit event, no real token transfer
        emit RewardClaimed(msg.sender, id, quests[id].reward);
    }
} 