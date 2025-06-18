<script setup>
import { useSettingsStore } from "../stores/settings";
import { useModalStore } from "../stores/modal";
import { QUESTION_LIMIT, TIME_LIMITS } from "../constants/settings";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const settingsStore = useSettingsStore();
const modalStore = useModalStore();

const timeLimits = TIME_LIMITS;

const settings = ref({
  company: settingsStore.company,
  difficulty: settingsStore.difficulty,
  questionCount: settingsStore.questionCount,
  timeLimit: settingsStore.timeLimit
});

// Watch for settings changes
watch(
  () => settings.value,
  (newSettings) => {
    settingsStore.updateSettings(newSettings);
  },
  { deep: true }
);

const closeModal = () => {
  modalStore.closeSettings();
};

// Close modal when clicking outside
const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

// Handle escape key
const handleEscape = (event) => {
  if (event.key === "Escape" && modalStore.isSettingsOpen) {
    closeModal();
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <div
    v-if="modalStore.isSettingsOpen"
    class="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-gray-900 rounded-lg shadow-xl w-[calc(100vw-30rem)] max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-100">Settings</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-2 gap-4 px-6 py-4 space-y-6">
        <!-- Company Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-100 mb-2">
            Company
          </label>
          <select
            v-model="settingsStore.company"
            class="w-full rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
          >
            <option
              v-for="company in settingsStore.companies"
              :key="company"
              :value="company"
              class="bg-gray-700"
            >
              {{ company }}
            </option>
          </select>
        </div>

        <!-- Difficulty Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-100 mb-2">
            Difficulty
          </label>
          <div class="flex gap-4">
            <label
              v-for="level in settingsStore.difficultyLevels"
              :key="level"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :value="level"
                v-model="settingsStore.difficulty"
                class="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
              />
              <span class="ml-2 text-gray-100">{{ level }}</span>
            </label>
          </div>
        </div>

        <!-- Question Count -->
        <div>
          <label class="block text-sm font-medium text-gray-100 mb-2">
            Number of Questions
          </label>
          <select
            v-model.number="settingsStore.questionCount"
            class="w-full rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
          >
            <option v-for="i in QUESTION_LIMIT" :key="i" :value="i">
              {{ i }}
            </option>
          </select>
        </div>

        <!-- Time Limit -->
        <div>
          <label class="block text-sm font-medium text-gray-100 mb-2">
            Time Limit
          </label>
          <select
            v-model="settingsStore.timeLimit"
            class="w-full rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
          >
            <option
              v-for="limit in timeLimits"
              :key="limit.value"
              :value="limit.value"
              class="bg-gray-700"
            >
              {{ limit.label }}
            </option>
          </select>
        </div>

        <!-- Topics -->
        <div class="col-span-full">
          <label class="block text-sm font-medium text-gray-100 mb-2">
            Topics
          </label>
          <div
            class="max-h-40 overflow-y-auto border border-gray-600 rounded-md p-2 bg-gray-800"
          >
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="topic in settingsStore.availableTopics"
                :key="topic"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :value="topic"
                  v-model="settingsStore.topics"
                  class="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
                />
                <span class="ml-2 text-gray-100 text-sm">{{ topic }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 flex justify-center space-x-3">
        <button
          @click="settingsStore.resetSettings"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Reset
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>
