import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useSettingsStore } from "./settings";

export const useTimerStore = defineStore("timer", () => {
  const settingsStore = useSettingsStore();

  // State
  const timeLimit = ref(settingsStore.timeLimit * 60); // Convert minutes to seconds
  const timeRemaining = ref(timeLimit.value);
  const isRunning = ref(false);
  const isPaused = ref(false);

  // Watch for settings changes
  watch(
    () => settingsStore.timeLimit,
    (newTimeLimit) => {
      timeLimit.value = newTimeLimit * 60;
      if (!isRunning.value) {
        timeRemaining.value = timeLimit.value;
      }
    }
  );

  // Getters
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });

  const isTimeUp = computed(() => timeRemaining.value === 0);

  // Actions
  let timerInterval = null;

  const startTimer = () => {
    if (!isRunning.value && !isPaused.value) {
      timeRemaining.value = timeLimit.value;
    }
    isRunning.value = true;
    isPaused.value = false;

    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--;
      } else {
        clearInterval(timerInterval);
        isRunning.value = false;
        isPaused.value = false;
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    isRunning.value = false;
    isPaused.value = true;
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning.value = false;
    isPaused.value = false;
    timeRemaining.value = timeLimit.value;
  };

  const setTimeLimit = (minutes) => {
    timeLimit.value = minutes * 60;
    if (!isRunning.value) {
      timeRemaining.value = timeLimit.value;
    }
  };

  // Cleanup
  function cleanup() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  }

  return {
    // State
    timeLimit,
    timeRemaining,
    isRunning,
    isPaused,
    // Getters
    formattedTime,
    isTimeUp,
    // Actions
    startTimer,
    pauseTimer,
    resetTimer,
    setTimeLimit,
    cleanup
  };
});
