<script setup>
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";

import Modal from "@components/common/Modal.vue";

import { useQuestionStore } from "@stores/question";
import { useTimerStore } from "@stores/timer";
import { useModalStore } from "@stores/modal";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();
const modalStore = useModalStore();

defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: "New Mock"
  }
});

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
    class="px-2"
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

  <!-- Restart Mock Button -->
  <div v-if="questionStore.questions.length > 0">
    <button
      :class="[
        'flex items-center gap-2 text-center text-xs md:text-sm font-semibold capitalize px-2 md:px-4 rounded-lg text-white bg-blue-800 hover:bg-blue-700 transition-colors',
        isScrolled ? 'h-6' : 'h-10'
      ]"
      @click="onRestartMockClick"
      :disabled="questionStore.questions.length === 0"
    >
      {{ buttonText }}
      <PlusIcon v-if="buttonText === 'New Mock'" class="w-4 h-4 font-bold" />
    </button>
  </div>
</template>
