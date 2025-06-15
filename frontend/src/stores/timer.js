import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTimerStore = defineStore("timer", () => {
  // State
  const timeLimit = ref(45 * 60); // 45 minutes in seconds
  const timeRemaining = ref(timeLimit.value);
  const isRunning = ref(false);
  const isPaused = ref(false);

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

  function startTimer() {
    if (!isRunning.value && !isPaused.value) {
      timeRemaining.value = timeLimit.value;
    }
    isRunning.value = true;
    isPaused.value = false;

    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--;
      } else {
        stopTimer();
        alert("Time is up!");
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isRunning.value = false;
    isPaused.value = true;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining.value = timeLimit.value;
    isRunning.value = false;
    isPaused.value = false;
  }

  function setTimeLimit(minutes) {
    timeLimit.value = minutes * 60;
    resetTimer();
  }

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
