<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

import { useQuestionStore } from "../../stores/question";
import { useTimerStore } from "../../stores/timer";
import { useModalStore } from "../../stores/modal";

import Modal from "../common/Modal.vue";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();
const modalStore = useModalStore();

const onRestartMockClick = () => {
  modalStore.openConfirmRestart();
};

const restartMock = () => {
  questionStore.restartQuestions();
  timerStore.resetTimer();
  modalStore.closeAllModals();
};
</script>

<template>
  <!-- Confirm Restart Modal -->
  <Modal
    :is-open="modalStore.isConfirmRestartOpen"
    title="Confirm New Mock"
    width="w-120"
    max-height="max-h-[90vh]"
    @close="modalStore.closeConfirmRestart"
  >
    <template #header-actions>
      <button @click="modalStore.closeConfirmRestart">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col items-center justify-center gap-4">
      <p class="whitespace-pre-line text-gray-300 text-center pt-8 pb-4">
        If you start a new mock, you will lose your current questions and
        progress.
        <br />
        <br />
        Are you sure you want to start a new mock?
      </p>
    </div>

    <template #footer>
      <button
        class="px-4 py-2 rounded-lg text-white font-semibold text-sm bg-red-800 hover:bg-red-900 border border-red-700/20 transition-colors flex items-center gap-2 capitalize"
        @click="restartMock"
      >
        Start New Mock
      </button>
    </template>
  </Modal>

  <!-- Start New Mock Button -->
  <div v-if="questionStore.questions.length > 0" class="">
    <button
      class="flex items-center gap-2 text-sm font-semibold capitalize px-4 h-10 rounded-lg text-white bg-blue-800 hover:bg-blue-700 transition-colors"
      @click="onRestartMockClick"
      :disabled="questionStore.questions.length === 0"
    >
      Start New Mock
    </button>
  </div>
</template>
