<script setup>
import { ref, computed, watch } from "vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

import { useModalStore } from "../../stores/modal";
import { useSettingsStore } from "../../stores/settings";
import { QUESTION_LIMIT, TIME_LIMITS } from "../../constants/settings";

import Modal from "../common/Modal.vue";

const modalStore = useModalStore();
const settingsStore = useSettingsStore();

const showError = ref(false);

const isError = computed(() => {
  return (
    settingsStore.difficulty.length === 0 || settingsStore.topics.length === 0
  );
});

watch(
  () => settingsStore.difficulty,
  () => {
    showError.value = false;
  }
);

watch(
  () => settingsStore.topics,
  () => {
    showError.value = false;
  }
);

const closeModal = () => {
  if (isError.value) {
    showError.value = true;
    return;
  }
  modalStore.closeSettings();
};
</script>

<template>
  <Modal
    :is-open="modalStore.isSettingsOpen"
    title="Settings"
    min-height="min-h-[200px]"
    @close="closeModal"
  >
    <template #header-actions>
      <div
        v-if="showError"
        class="flex items-center text-xs text-red-400 font-bold"
      >
        <ExclamationTriangleIcon class="h-4 w-4 mr-1" />
        Fix the errors to continue
      </div>
      <button
        @click="settingsStore.resetSettings"
        class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-400"
      >
        Reset
      </button>
      <button
        @click="closeModal"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Done
      </button>
    </template>

    <div class="grid grid-cols-2 gap-4 space-y-6 py-8">
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
        <div class="flex items-center gap-2">
          <span
            v-if="settingsStore.difficulty.length === 0"
            class="text-xs text-red-400 font-bold"
          >
            Select at least one difficulty
          </span>
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
            v-for="limit in TIME_LIMITS"
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
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-100">
            Topics
          </label>
          <div class="flex items-center gap-2">
            <span
              v-if="settingsStore.topics.length === 0"
              class="text-xs text-red-400 font-bold"
            >
              Select at least one topic
            </span>
            <span class="text-xs text-gray-400 font-bold">
              {{ settingsStore.topics.length }} /
              {{ settingsStore.availableTopics.length }}
            </span>
            <button
              @click="
                settingsStore.topics.length ===
                settingsStore.availableTopics.length
                  ? (settingsStore.topics = [])
                  : (settingsStore.topics = [...settingsStore.availableTopics])
              "
              class="px-3 py-1 text-xs w-24 font-bold text-white rounded-md"
              :class="
                settingsStore.topics.length ===
                settingsStore.availableTopics.length
                  ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              "
            >
              {{
                settingsStore.topics.length ===
                settingsStore.availableTopics.length
                  ? "Unselect All"
                  : "Select All"
              }}
            </button>
          </div>
        </div>
        <div
          class="min-h-40 overflow-y-auto border border-gray-600 rounded-md p-2 bg-gray-800"
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
  </Modal>
</template>
