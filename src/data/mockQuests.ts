export const mockQuests = [
  {
    id: 1,
    title: "Login 5 days straight",
    gameTitle: "Gold Rush",
    gameImage: "https://placehold.co/400x240/FFD700/0000?text=Gold+Rush",
    reward: "200 GLD",
    progress: 60,
    status: "in_progress",
    type: "Daily",
    joinedPlayers: "1,520",
    tasks: [
      { description: "Login Day 1", completed: true, reward: "40 GLD" },
      { description: "Login Day 2", completed: true, reward: "40 GLD" },
      { description: "Login Day 3", completed: true, reward: "40 GLD" },
      { description: "Login Day 4", completed: false, reward: "40 GLD" },
      { description: "Login Day 5", completed: false, reward: "40 GLD" }
    ]
  },
  {
    id: 2,
    title: "Kill 10 bosses",
    gameTitle: "MetaKnightZ",
    gameImage: "https://placehold.co/400x240/8B5CF6/FFFF?text=MetaKnightZ",
    reward: "Dragon Slayer NFT",
    progress: 70,
    status: "in_progress",
    type: "Epic",
    joinedPlayers: "2,340",
    tasks: [
      { description: "Kill Forest Boss", completed: true, reward: "50 MKNZ" },
      { description: "Kill Mountain Boss", completed: true, reward: "50 MKNZ" },
      { description: "Kill Desert Boss", completed: true, reward: "50 MKNZ" },
      { description: "Kill Ice Boss", completed: false, reward: "50 MKNZ" },
      { description: "Kill Final Boss", completed: false, reward: "Dragon NFT" }
    ]
  },
  {
    id: 3,
    title: "Survive 100 waves",
    gameTitle: "Zombie Cry",
    gameImage: "https://placehold.co/400x240/DC2626/FFFF?text=Zombie+Cry",
    reward: "500 ZCRY + Golden Gun NFT",
    progress: 0,
    status: "available",
    type: "HOT",
    joinedPlayers: "890",
    tasks: [
      { description: "Survive Wave 1-20", completed: false, reward: "100 ZCRY" },
      { description: "Survive Wave 21-40", completed: false, reward: "100 ZCRY" },
      { description: "Survive Wave 41-60", completed: false, reward: "100 ZCRY" },
      { description: "Survive Wave 61-80", completed: false, reward: "100 ZCRY" },
      { description: "Survive Wave 81-100", completed: false, reward: "100 ZCRY + NFT" }
    ]
  },
  {
    id: 4,
    title: "Collect 50 crystals",
    gameTitle: "Dragon Quest",
    gameImage: "https://placehold.co/400x240/F59E0B/0000?text=Dragon+Quest",
    reward: "300 FIRE",
    progress: 100,
    status: "claim",
    type: "Daily",
    joinedPlayers: "3,120",
    tasks: [
      { description: "Collect 10 Red Crystals", completed: true, reward: "60 FIRE" },
      { description: "Collect 10 Blue Crystals", completed: true, reward: "60 FIRE" },
      { description: "Collect 10 Green Crystals", completed: true, reward: "60 FIRE" },
      { description: "Collect 10 Yellow Crystals", completed: true, reward: "60 FIRE" },
      { description: "Collect 10 Purple Crystals", completed: true, reward: "60 FIRE" }
    ]
  },
  {
    id: 5,
    title: "Win 20 PvP matches",
    gameTitle: "Space Wars",
    gameImage: "https://placehold.co/400x240/3B82F6/FFFF?text=Space+Wars",
    reward: "400 STAR + Cruiser NFT",
    progress: 25,
    status: "in_progress",
    type: "Epic",
    joinedPlayers: "1,780",
    tasks: [
      { description: "Win 5 Rookie matches", completed: true, reward: "80 STAR" },
      { description: "Win 5 Veteran matches", completed: false, reward: "80 STAR" },
      { description: "Win 5 Elite matches", completed: false, reward: "80 STAR" },
      { description: "Win 3 Master matches", completed: false, reward: "80 STAR" },
      { description: "Win 2 Champion matches", completed: false, reward: "80 STAR + NFT" }
    ]
  },
  {
    id: 6,
    title: "Cast 100 spells",
    gameTitle: "Wizard Tower",
    gameImage: "https://placehold.co/400x240/7C3AED/FFFF?text=Wizard+Tower",
    reward: "250 MAGIC",
    progress: 100,
    status: "completed",
    type: "Daily",
    joinedPlayers: "2,650",
    tasks: [
      { description: "Cast 20 Fire spells", completed: true, reward: "50 MAGIC" },
      { description: "Cast 20 Water spells", completed: true, reward: "50 MAGIC" },
      { description: "Cast 20 Earth spells", completed: true, reward: "50 MAGIC" },
      { description: "Cast 20 Air spells", completed: true, reward: "50 MAGIC" },
      { description: "Cast 20 Dark spells", completed: true, reward: "50 MAGIC" }
    ]
  }
]; 