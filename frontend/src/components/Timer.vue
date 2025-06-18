<script setup>
import { useTimerStore } from "../stores/timer";
import { ref } from "vue";
import {
  ClockIcon,
  EyeSlashIcon,
  PauseIcon,
  PlayIcon,
  ArrowPathIcon
} from "@heroicons/vue/24/outline";

const viewTimer = ref(true);

const timerStore = useTimerStore();
</script>

<template>
  <div
    class="flex items-center rounded-md px-3 w-fit hover:bg-blue-800"
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
        'text-white': timerStore.timeRemaining >= 300,
        'text-red-600 animate-pulse':
          timerStore.timeRemaining < 300 && timerStore.isRunning,
        'w-16': viewTimer,
        'w-0': !viewTimer
      }"
    >
      <span v-if="viewTimer">{{ timerStore.formattedTime }}</span>
    </span>

    <!-- view timer button -->
    <button
      @click="viewTimer = !viewTimer"
      class="p-2 rounded transition-colors text-blue-500 hover:text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <EyeSlashIcon v-if="viewTimer" class="w-5 h-5" />
      <ClockIcon
        v-else
        class="w-5 h-5"
        :class="{
          'text-red-600': timerStore.isTimeUp,
          'text-red-600 animate-pulse':
            timerStore.timeRemaining < 300 && timerStore.isRunning,
          'animate-pulse': timerStore.isRunning
        }"
      />
    </button>

    <!-- pause/play button -->
    <button
      @click="
        timerStore.isRunning ? timerStore.pauseTimer() : timerStore.startTimer()
      "
      class="p-2 rounded text-blue-500 hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="timerStore.isTimeUp"
    >
      <PauseIcon v-if="timerStore.isRunning" class="w-5 h-5" />
      <PlayIcon v-else class="w-5 h-5" />
    </button>

    <!-- reset button -->
    <button
      @click="timerStore.resetTimer"
      class="p-2 rounded text-blue-500 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      :disabled="
        timerStore.isRunning ||
        timerStore.timeRemaining === timerStore.timeLimit
      "
    >
      <ArrowPathIcon class="w-5 h-5" />
    </button>
  </div>
</template>
