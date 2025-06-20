<script setup>
import { ref, watch } from "vue";
import DOMPurify from "dompurify";

import Loader from "../common/Loader.vue";
import ErrorModal from "../common/ErrorModal.vue";
import SettingsButton from "../settings/SettingsButton.vue";
import PromptSecretCode from "./PromptSecretCode.vue";

import { useSettingsStore } from "../../stores/settings";
import { useQuestionStore } from "../../stores/question";
import { useTimerStore } from "../../stores/timer";
import { useModalStore } from "../../stores/modal";

const settingsStore = useSettingsStore();
const questionStore = useQuestionStore();
const timerStore = useTimerStore();
const modalStore = useModalStore();
const isLoading = ref(false);

const errorMessage = ref("");
const isSettingsError = ref(false);
const showTryAgainButton = ref(false);

const props = defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: "Start Mock"
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const validateSettings = () => {
  const errors = [];

  if (settingsStore.difficulty.length === 0) {
    errors.push("Select at least one difficulty in settings");
  }
  if (settingsStore.topics.length === 0) {
    errors.push("Select at least one topic in settings");
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join("\n");
    isSettingsError.value = true;
    modalStore.openError();
    return false;
  }

  return true;
};

const onStartMockClick = () => {
  modalStore.closeError();
  if (validateSettings()) {
    modalStore.openPromptSecretCode();
  }
};

const getQuestions = async (secretCode) => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || ""}/api/questions`,
      {
        method: "POST",
        body: JSON.stringify({
          company: settingsStore.company,
          noOfQuestions: settingsStore.questionCount,
          difficulty: settingsStore.difficulty,
          topics: settingsStore.topics,
          secretCode: secretCode
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 401) {
        errorMessage.value = "Invalid secret code. Please try again.";
      } else {
        errorMessage.value = error.message || "Error getting questions";
      }
      showTryAgainButton.value = true;
      modalStore.openError();
      return;
    }

    const data = await response.json();

    // Store questions in the question store
    questionStore.setQuestions(
      data.map((q, index) => ({
        id: index.toString(),
        name: q.name,
        leetcodeLink: q.leetcodeLink,
        solutionLink: q.solutionLink,
        difficulty: q.difficulty,
        topic: q.topic,
        questionHTML: DOMPurify.sanitize(q.questionHTML),
        initialCode: q.initialCode || ""
      }))
    );

    // reset timer if timer is 0
    if (timerStore.timeRemaining === 0) {
      timerStore.resetTimer();
    }

    // Start timer
    timerStore.startTimer();
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "Error getting questions";
    modalStore.openError();
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => modalStore.isErrorOpen,
  (isOpen) => {
    if (!isOpen) {
      errorMessage.value = "";
      isSettingsError.value = false;
      showTryAgainButton.value = false;
    }
  }
);
</script>

<template>
  <Loader v-if="isLoading" />

  <!-- Error Modal -->
  <ErrorModal :error-message="errorMessage">
    <template v-if="isSettingsError" #error-actions>
      <SettingsButton
        @click="modalStore.closeError"
        toopTipPlacement="top"
        buttonText="Settings"
        disableTooltip
      />
    </template>
    <template v-if="showTryAgainButton" #error-actions>
      <button
        class="px-4 py-2 rounded-lg text-white font-bold text-md bg-blue-700 hover:bg-blue-800 border border-red-700/20 transition-colors flex items-center gap-2 capitalize"
        @click="onStartMockClick"
        :disabled="isLoading"
      >
        Try Again
      </button>
    </template>
  </ErrorModal>

  <!-- Prompt secret code modal -->
  <PromptSecretCode @submit="getQuestions" />

  <!-- Start Mock Button (outside modal) -->
  <div
    class="flex justify-center items-center"
    :class="{ 'w-full': fullWidth }"
  >
    <button
      :class="[
        'flex justify-center items-center gap-2 text-center text-xs md:text-base font-semibold capitalize px-2 md:px-4 rounded-lg text-white bg-blue-800 hover:bg-blue-700 transition-all duration-300 ease-in-out',
        isScrolled ? 'h-6 mx-20' : 'h-10',
        fullWidth ? 'w-full' : ''
      ]"
      @click="onStartMockClick"
      :disabled="isLoading"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped></style>
