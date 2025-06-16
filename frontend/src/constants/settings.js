// Default Settings
export const DEFAULT_SETTINGS = {
  COMPANY: "Amazon",
  DIFFICULTY: ["Medium"],
  QUESTION_COUNT: 1,
  TIME_LIMIT: 30 // in minutes
};

export const QUESTION_LIMIT = 1; // max 3

export const TIME_LIMITS = [
  { label: "5 seconds (Testing only)", value: 1 / 12 },
  { label: "10 minutes", value: 10 },
  { label: "15 minutes", value: 15 },
  { label: "20 minutes", value: 20 },
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "60 minutes", value: 60 }
];

// Available Options
export const COMPANIES = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Twitter",
  "LinkedIn"
];

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

export const AVAILABLE_TOPICS = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Greedy",
  "Binary Search",
  "Heap",
  "Stack",
  "Queue",
  "Hash Table",
  "Sorting",
  "Bit Manipulation"
];
