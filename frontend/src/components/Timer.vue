<script setup>
import { useTimerStore } from "../stores/timer";

const timerStore = useTimerStore();
</script>

<template>
  <div class="flex items-center gap-4">
    <span class="text-white font-mono text-xl">{{
      timerStore.formattedTime
    }}</span>
    <div class="flex gap-2">
      <button
        @click="
          timerStore.isRunning
            ? timerStore.pauseTimer()
            : timerStore.startTimer()
        "
        class="px-4 py-2 rounded bg-white text-blue-900 hover:bg-blue-100 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="timerStore.isTimeUp"
      >
        <span v-if="timerStore.isRunning">⏸️</span>
        <span v-else-if="timerStore.isPaused">▶️</span>
        <span v-else>▶️</span>
      </button>
      <button
        @click="timerStore.resetTimer"
        class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="
          timerStore.isRunning ||
          timerStore.timeRemaining === timerStore.timeLimit
        "
      >
        🔄
      </button>
    </div>
  </div>
</template>
