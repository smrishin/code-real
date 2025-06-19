<script setup>
import { ref, watch } from "vue";
import {
  ClockIcon,
  EyeSlashIcon,
  PauseIcon,
  PlayIcon,
  ArrowPathIcon,
  XMarkIcon
} from "@heroicons/vue/24/outline";

import { useTimerStore } from "../../stores/timer";
import { useModalStore } from "../../stores/modal";

import Modal from "../common/Modal.vue";
import StartNewMockButton from "./StartNewMockButton.vue";

const timerStore = useTimerStore();
const modalStore = useModalStore();

const viewTimer = ref(true);
const showTimeUpToast = ref(false);

watch(
  () => timerStore.isTimeUp,
  (isTimeUp) => {
    if (isTimeUp) {
      showTimeUpToast.value = true;
      setTimeout(() => {
        showTimeUpToast.value = false;
        modalStore.openTimeUp();
      }, 5 * 1000);
    }
  }
);
</script>

<template>
  <!-- Time Up Toast -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="showTimeUpToast"
      class="fixed top-16 right-4 flex items-center gap-2 px-4 py-2 bg-red-600 bg-opacity-50 text-white rounded-lg whitespace-nowrap z-50 shadow-xl font-semibold text-sm animate-bounce"
    >
      <ClockIcon class="w-5 h-5" />
      Time's Up!
    </div>
  </Transition>

  <!-- Time Up Modal -->
  <Modal
    :is-open="modalStore.isTimeUpOpen"
    @close="modalStore.closeTimeUp"
    width="w-140"
    max-height="max-h-[90vh]"
    title="Time's Up!"
  >
    <template #header-actions>
      <button
        @click="modalStore.closeTimeUp"
        class="text-gray-400 hover:text-gray-500"
      >
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <p class="text-center text-sm text-gray-300 py-8">
      Your time is up!
      <br />
      You can still run the current code.
      <br />
      <br />
      Reset the timer to continue with the current mock in an untimed session.
      <br />
      Or start a new mock.
    </p>

    <template #footer>
      <div class="flex justify-center gap-4">
        <StartNewMockButton />

        <button
          class="text-sm font-semibold capitalize px-4 h-10 rounded-lg text-white bg-blue-700 hover:bg-blue-600 transition-colors"
          @click="modalStore.closeTimeUp"
        >
          Go Back To Current Mock
        </button>
      </div>
    </template>
  </Modal>

  <!-- Timer -->
  <div
    class="flex items-center rounded-lg px-3 h-10 w-fit hover:bg-blue-800"
    :class="{
      'bg-blue-800': viewTimer,
      'bg-blue-900 border border-blue-700': !viewTimer
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
