<script setup>
import { useTimerStore } from "../stores/timer";
import { ref } from "vue";

const viewTimer = ref(true);

const timerStore = useTimerStore();
</script>

<template>
  <div
    class="flex items-center rounded-md px-2 py-1 gap-4 w-fit"
    :class="{
      'bg-blue-800': viewTimer,
      'bg-blue-900': !viewTimer
    }"
  >
    <!-- timer display -->
    <span
      class="font-mono transition-all duration-300 ease-out-in text-center"
      :class="{
        'text-red-600': timerStore.isTimeUp,
        'text-white': !timerStore.isTimeUp,
        'w-14 pl-2': viewTimer,
        'w-6': !viewTimer
      }"
    >
      <span v-if="viewTimer">{{ timerStore.formattedTime }}</span>
      <img v-else src="../assets/timer.svg" alt="timer" class="w-4 h-4" />
    </span>

    <!-- view timer button -->
    <button
      @click="viewTimer = !viewTimer"
      class="px-2 py-1 rounded hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="viewTimer">
        <img src="../assets/eye-off.svg" alt="eye-off" class="w-4 h-4" />
      </span>
      <span v-else>
        <img src="../assets/eye.svg" alt="eye" class="w-4 h-4" />
      </span>
    </button>

    <!-- pause/play button -->
    <button
      @click="
        timerStore.isRunning ? timerStore.pauseTimer() : timerStore.startTimer()
      "
      class="px-2 py-1 rounded hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="timerStore.isTimeUp"
    >
      <img
        src="../assets/pause.svg"
        alt="pause"
        class="w-4 h-4"
        v-if="timerStore.isRunning"
      />
      <img src="../assets/play.svg" alt="play" class="w-4 h-4" v-else />
    </button>

    <!-- reset button -->
    <button
      @click="timerStore.resetTimer"
      class="px-2 py-1 rounded text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="
        timerStore.isRunning ||
        timerStore.timeRemaining === timerStore.timeLimit
      "
    >
      <img src="../assets/reset.svg" alt="reset" class="w-4 h-4" />
    </button>
  </div>
</template>
