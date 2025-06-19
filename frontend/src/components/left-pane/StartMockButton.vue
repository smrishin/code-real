<script setup>
import { ref, watch, nextTick } from "vue";
import DOMPurify from "dompurify";
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

import Loader from "../common/Loader.vue";
import ErrorModal from "../common/ErrorModal.vue";
import SettingsButton from "../settings/SettingsButton.vue";
import Modal from "../common/Modal.vue";

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

const secretCode = ref("");
const secretCodeInputTag = ref(null);
const showSecretCodeError = ref(false);
const showPassword = ref(false);

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

const getQuestions = async () => {
  try {
    if (!secretCode.value) {
      showSecretCodeError.value = true;
      return;
    }
    showSecretCodeError.value = false;
    modalStore.closePromptSecretCode();

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
          secretCode: secretCode.value
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

    timerStore.startTimer();
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "Error getting questions";
    modalStore.openError();
  } finally {
    isLoading.value = false;
    secretCode.value = "";
  }
};

watch(secretCode, (val) => {
  if (val !== "") {
    showSecretCodeError.value = false;
  }
});

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
watch(
  () => modalStore.isPromptSecretCodeOpen,
  (isOpen) => {
    if (!isOpen) {
      secretCode.value = "";
      showSecretCodeError.value = false;
      showPassword.value = false;
    }
  }
);
</script>

<template>
  <!-- Error Modal -->
  <ErrorModal :error-message="errorMessage">
    <template v-if="isSettingsError" #error-actions>
      <SettingsButton
        @click="modalStore.closeError"
        toopTipPlacement="left"
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
  <Modal
    :is-open="modalStore.isPromptSecretCodeOpen"
    title="Enter Secret Code"
    width="w-120"
    max-height="max-h-[90vh]"
    @open="nextTick(() => secretCodeInputTag?.focus())"
    @close="modalStore.closePromptSecretCode()"
  >
    <template #header-actions>
      <button @click="modalStore.closePromptSecretCode">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col items-center justify-center gap-4">
      <form @submit.prevent="getQuestions" class="w-full">
        <!-- Hidden username field for accessibility -->
        <input
          type="text"
          name="username"
          autocomplete="username"
          style="display: none"
          aria-hidden="true"
        />
        <div class="relative w-full">
          <input
            ref="secretCodeInputTag"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Secret Code"
            v-model="secretCode"
            autocomplete="new-password"
            class="w-full rounded-md border border-gray-600 mt-6 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
            @keyup.enter="getQuestions"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-6 text-gray-400 hover:text-gray-200 transition-colors h-10 flex items-center"
          >
            <EyeIcon v-if="!showPassword" class="h-5 w-5" />
            <EyeSlashIcon v-else class="h-5 w-5" />
          </button>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 h-1">
          <span v-if="showSecretCodeError" class="text-red-500 text-sm">
            Enter the secret code to start the mock
          </span>
        </div>
        <p class="text-gray-400 text-sm">
          <span class="font-bold">Note:</span> This is a secret code to prevent
          unauthorized access.
        </p>
      </form>
    </div>
    <template #footer>
      <button
        class="px-4 py-2 rounded-lg text-white font-bold text-md bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-2 capitalize"
        @click="getQuestions"
        :disabled="isLoading"
      >
        Start Mock
      </button>
    </template>
  </Modal>

  <!-- Start Mock Button (outside modal) -->
  <div>
    <button
      class="px-4 py-2 rounded-lg text-white font-bold text-md bg-blue-700 hover:bg-blue-800 border border-red-700/20 transition-colors flex items-center gap-2 capitalize"
      @click="onStartMockClick"
      :disabled="isLoading"
    >
      Start Mock
    </button>
    <Loader v-if="isLoading" />
  </div>
</template>

<style scoped></style>
