// src/data/sims.ts
export type CourseId =
  | "soccer"
  | "obstacle"
  | "wallclimb"
  | "pushblock"
  | "pyramids"
  | "food_collector"
  | "hallway"
  | "gridworld"
  | "walker"
  | "crawler"
  | "ball3d"
  | "basic"
  | "patterns"
  | "sorter"
  | "worm";

export interface SimCatalogItem {
  id: CourseId;
  name: string;
  synopsis: string;
  difficulty: ("medium" | "hard" | "expert")[];
  skills: string[]; // PATHFINDING, MEMORY, STRATEGY, TIMING, AGILITY, BALANCE, COORDINATION, PLANNING
  status: "coming_soon" | "prototype" | "available";
  placeholder: {
    ascii: string[]; // small ASCII thumbnail lines
    note?: string; // e.g., "Unity WebGL build pending"
  };
  metrics: string[]; // suggested metrics this sim will emit later
  evolutionRewards: string[]; // abilities/bodies likely to unlock here
  tags?: string[]; // "navigation", "control", "multi-agent", etc.
}

export const SIM_CATALOG: SimCatalogItem[] = [
  {
    id: "soccer",
    name: "Soccer",
    synopsis: "Team coordination and ball control in competitive matches.",
    difficulty: ["medium", "hard", "expert"],
    skills: ["COORDINATION", "STRATEGY", "TEAMWORK"],
    status: "prototype",
    placeholder: {
      ascii: [
        "+---------+",
        "|  _   _  |",
        "| |_| |_| |",
        "|   _     |",
        "+---------+",
      ],
      note: "WebGL scene to be embedded here.",
    },
    metrics: ["goals", "assists", "possession", "passes_completed"],
    evolutionRewards: ["teamplay", "ball_control"],
    tags: ["multi-agent", "sports"],
  },
  {
    id: "ball3d",
    name: "3D Ball",
    synopsis: "Platform balance and micro-control.",
    difficulty: ["medium", "hard"],
    skills: ["MICRO_CONTROL", "FEEDBACK"],
    status: "prototype",
    placeholder: { ascii: ["———◯———"], note: "Balance task." },
    metrics: ["time_balanced_ms", "falls"],
    evolutionRewards: ["precision_control"],
    tags: ["control"],
  },
  {
    id: "obstacle",
    name: "Dungeon Escape",
    synopsis: "Navigate through treacherous dungeon corridors and overcome obstacles.",
    difficulty: ["medium", "hard", "expert"],
    skills: ["TIMING", "AGILITY", "ADAPTATION"],
    status: "prototype",
    placeholder: {
      ascii: ["    __", "__ /  \\__", "\\__    __/", "   \\__/   "],
      note: "Unity dungeon WIP.",
    },
    metrics: ["time_ms", "jumps", "falls", "successful_clearances"],
    evolutionRewards: ["jump", "run"],
    tags: ["control", "single-agent"],
  },
  {
    id: "wallclimb",
    name: "Climbing Wall",
    synopsis: "Precision, planning, and vertical movement.",
    difficulty: ["hard", "expert"],
    skills: ["PLANNING", "CONTROL", "COORDINATION"],
    status: "prototype",
    placeholder: {
      ascii: ["   /\\", "  /  \\", " /____\\", " |    |"],
      note: "WebGL scene to be embedded here.",
    },
    metrics: ["holds_used", "time_ms", "slips", "top_reached"],
    evolutionRewards: ["climb", "advanced_mechanica"],
    tags: ["control", "single-agent"],
  },
  // Extras from ML-Agents samples:
  {
    id: "pushblock",
    name: "Push Block",
    synopsis: "Three agents work together to push blocks to destinations through coordination and teamwork.",
    difficulty: ["medium", "hard"],
    skills: ["STRATEGY", "COORDINATION", "TEAMWORK"],
    status: "prototype",
    placeholder: { ascii: ["[■] → [◊]"], note: "WebGL scene to be embedded here." },
    metrics: ["blocks_scored", "time_ms", "collisions", "team_coordination"],
    evolutionRewards: ["strength", "precision_control", "teamwork"],
    tags: ["control", "multi-agent", "cooperation"],
  },
  {
    id: "pyramids",
    name: "Pyramids",
    synopsis: "Navigate through 3D pyramid mazes, collect keys, and solve door puzzles with strategic planning.",
    difficulty: ["hard", "expert"],
    skills: ["MEMORY", "PLANNING", "SEQUENCING", "NAVIGATION"],
    status: "prototype",
    placeholder: { ascii: [" /\\", "/__\\", "\\  /", " \\/"], note: "WebGL scene to be embedded here." },
    metrics: ["keys_collected", "doors_opened", "time_ms", "maze_navigation"],
    evolutionRewards: ["plan", "navigate_pro", "memory"],
    tags: ["navigation", "puzzle", "single-agent"],
  },
  {
    id: "food_collector",
    name: "Food Collector",
    synopsis: "Multi-agent foraging and cooperation in a competitive environment with hazards and food collection.",
    difficulty: ["medium", "hard"],
    skills: ["COOPERATION", "COMPETITION", "AVOIDANCE", "FORAGING"],
    status: "prototype",
    placeholder: { ascii: ["(•) (•)  ✹"], note: "WebGL scene to be embedded here." },
    metrics: ["food_collected", "hazards_hit", "team_score", "cooperation_rate"],
    evolutionRewards: ["swarm", "teamplay", "foraging"],
    tags: ["multi-agent", "navigation", "cooperation"],
  },
  {
    id: "hallway",
    name: "Hallway",
    synopsis: "Signal matching and short-term memory challenges in a hallway environment with pattern recognition.",
    difficulty: ["medium"],
    skills: ["MEMORY", "SIGNAL_MATCH", "PATTERN_RECOGNITION"],
    status: "prototype",
    placeholder: { ascii: ["|    |", "|    |", "|____|"], note: "WebGL scene to be embedded here." },
    metrics: ["correct_matches", "steps", "time_ms", "memory_retention"],
    evolutionRewards: ["working_memory", "pattern_recognition"],
    tags: ["navigation", "cognition", "single-agent"],
  },
  {
    id: "gridworld",
    name: "GridWorld",
    synopsis: "Lightweight discrete navigation in a grid-based environment with strategic pathfinding and obstacle avoidance.",
    difficulty: ["medium", "hard"],
    skills: ["PLANNING", "PATHFINDING", "STRATEGY"],
    status: "prototype",
    placeholder: { ascii: ["[.][.][.]", "[.][#][.]", "[.][.][X]"], note: "WebGL scene to be embedded here." },
    metrics: ["steps", "time_ms", "optimality_gap", "path_efficiency"],
    evolutionRewards: ["plan", "pathfinding", "strategy"],
    tags: ["navigation", "discrete", "single-agent"],
  },
  {
    id: "walker",
    name: "Walker",
    synopsis: "Humanoid locomotion and balance with bipedal movement, stability control, and walking mechanics.",
    difficulty: ["hard", "expert"],
    skills: ["BALANCE", "COORDINATION", "LOCOMOTION", "STABILITY"],
    status: "prototype",
    placeholder: { ascii: [" o ", "/|\\", "/ \\"], note: "WebGL scene to be embedded here." },
    metrics: ["distance", "falls", "time_ms", "stability_score"],
    evolutionRewards: ["run", "balance", "locomotion"],
    tags: ["locomotion", "control", "single-agent"],
  },
  {
    id: "crawler",
    name: "Crawler",
    synopsis: "Quadruped gait learning and obstacle traversal with adaptive locomotion and terrain navigation.",
    difficulty: ["hard", "expert"],
    skills: ["GAIT", "COORDINATION", "ADAPTATION", "TERRAIN_NAVIGATION"],
    status: "prototype",
    placeholder: { ascii: ["/\\__/\\", "\\_/  \\_"], note: "WebGL scene to be embedded here." },
    metrics: ["distance", "contacts", "falls", "terrain_adaptation"],
    evolutionRewards: ["coordination", "adaptation_pro", "terrain_mastery"],
    tags: ["locomotion", "control", "single-agent"],
  },
  {
    id: "patterns",
    name: "Puzzle",
    synopsis: "Pattern recognition and matching tasks with visual processing and cognitive pattern analysis.",
    difficulty: ["medium", "hard"],
    skills: ["PATTERN_RECOGNITION", "VISUAL_PROCESSING", "COGNITIVE_ANALYSIS"],
    status: "prototype",
    placeholder: { ascii: ["[■]", "→", "[◊]"], note: "Unity WebGL build pending" },
    metrics: ["patterns_matched", "accuracy", "response_time", "complexity_level"],
    evolutionRewards: ["pattern_mastery", "visual_processing", "cognitive_enhancement"],
    tags: ["pattern", "visual", "single-agent"],
  },
  {
    id: "sorter",
    name: "Classifier",
    synopsis: "Object classification and sorting tasks with multi-criteria decision making and organizational skills.",
    difficulty: ["medium", "hard"],
    skills: ["CLASSIFICATION", "ORGANIZATION", "DECISION_MAKING"],
    status: "prototype",
    placeholder: { ascii: ["[A][B][C]", "↓", "[A][B][C]"], note: "Unity WebGL build pending" },
    metrics: ["accuracy", "speed", "categories", "efficiency"],
    evolutionRewards: ["classification", "organization"],
    tags: ["classification", "organization", "single-agent"],
  },
  {
    id: "worm",
    name: "Slitherer",
    synopsis: "Snake-like locomotion and navigation with body coordination and obstacle avoidance in confined spaces.",
    difficulty: ["medium", "hard"],
    skills: ["LOCOMOTION", "BODY_COORDINATION", "NAVIGATION"],
    status: "prototype",
    placeholder: { ascii: ["~", "~", "~"], note: "Unity WebGL build pending" },
    metrics: ["length", "speed", "obstacles_avoided", "efficiency"],
    evolutionRewards: ["locomotion", "coordination"],
    tags: ["locomotion", "navigation", "single-agent"],
  },
  {
    id: "basic",
    name: "Basic Training",
    synopsis: "Fundamental reinforcement learning concepts with simple environment interactions and basic reward structures.",
    difficulty: ["medium"],
    skills: ["BASIC_RL", "ENVIRONMENT_INTERACTION", "REWARD_LEARNING"],
    status: "prototype",
    placeholder: { ascii: ["[■]", "→", "[◊]"], note: "Coming soon." },
    metrics: ["episodes", "rewards", "success_rate", "learning_curve"],
    evolutionRewards: ["basic_learning", "environment_mastery"],
    tags: ["learning", "basic", "single-agent"],
  },
];

// Helper functions for filtering and searching
export const getSimById = (id: CourseId): SimCatalogItem | undefined => {
  return SIM_CATALOG.find(sim => sim.id === id);
};

export const getSimsByStatus = (status: SimCatalogItem['status']): SimCatalogItem[] => {
  return SIM_CATALOG.filter(sim => sim.status === status);
};

export const getSimsByTag = (tag: string): SimCatalogItem[] => {
  return SIM_CATALOG.filter(sim => sim.tags?.includes(tag));
};

export const getSimsByDifficulty = (difficulty: string): SimCatalogItem[] => {
  return SIM_CATALOG.filter(sim => sim.difficulty.includes(difficulty as SimCatalogItem['difficulty'][0]));
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  SIM_CATALOG.forEach(sim => {
    sim.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getAllDifficulties = (): string[] => {
  const difficulties = new Set<string>();
  SIM_CATALOG.forEach(sim => {
    sim.difficulty.forEach(diff => difficulties.add(diff));
  });
  return Array.from(difficulties).sort();
};
