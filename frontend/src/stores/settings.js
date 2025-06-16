import { defineStore } from "pinia";
import { ref } from "vue";
import {
  DEFAULT_SETTINGS,
  COMPANIES,
  DIFFICULTY_LEVELS,
  AVAILABLE_TOPICS
} from "../constants/settings";

export const useSettingsStore = defineStore("settings", () => {
  // Default values from constants
  const company = ref(DEFAULT_SETTINGS.COMPANY);
  const difficulty = ref([...DEFAULT_SETTINGS.DIFFICULTY]);
  const questionCount = ref(DEFAULT_SETTINGS.QUESTION_COUNT);
  const timeLimit = ref(DEFAULT_SETTINGS.TIME_LIMIT);
  const topics = ref([]);

  // Available options from constants
  const companies = COMPANIES;
  const difficultyLevels = DIFFICULTY_LEVELS;
  const availableTopics = AVAILABLE_TOPICS;

  // Actions
  const updateSettings = (newSettings) => {
    if (newSettings.company) company.value = newSettings.company;
    if (newSettings.difficulty) difficulty.value = newSettings.difficulty;
    if (newSettings.questionCount)
      questionCount.value = newSettings.questionCount;
    if (newSettings.timeLimit) timeLimit.value = newSettings.timeLimit;
  };

  function setTopics(selectedTopics) {
    topics.value = selectedTopics;
  }

  function resetSettings() {
    company.value = DEFAULT_SETTINGS.COMPANY;
    difficulty.value = [...DEFAULT_SETTINGS.DIFFICULTY];
    questionCount.value = DEFAULT_SETTINGS.QUESTION_COUNT;
    timeLimit.value = DEFAULT_SETTINGS.TIME_LIMIT;
    topics.value = [];
  }

  return {
    // State
    company,
    difficulty,
    questionCount,
    timeLimit,
    topics,
    // Available options
    companies,
    difficultyLevels,
    availableTopics,
    // Actions
    updateSettings,
    setTopics,
    resetSettings
  };
});
