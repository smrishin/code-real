import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  // State
  const company = ref("");
  const difficulty = ref([]);
  const questionCount = ref(1);
  const topics = ref([]);

  // Available options
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Twitter",
    "LinkedIn"
  ];

  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const availableTopics = [
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

  // Actions
  function setCompany(newCompany) {
    company.value = newCompany;
  }

  function setDifficulty(levels) {
    difficulty.value = levels;
  }

  function setQuestionCount(count) {
    questionCount.value = Math.min(Math.max(1, count), 3);
  }

  function setTopics(selectedTopics) {
    topics.value = selectedTopics;
  }

  function resetSettings() {
    company.value = "";
    difficulty.value = [];
    questionCount.value = 1;
    topics.value = [];
  }

  return {
    // State
    company,
    difficulty,
    questionCount,
    topics,
    // Available options
    companies,
    difficultyLevels,
    availableTopics,
    // Actions
    setCompany,
    setDifficulty,
    setQuestionCount,
    setTopics,
    resetSettings
  };
});
