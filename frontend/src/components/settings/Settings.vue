<script setup>
import {
  ChevronDownIcon,
  ExclamationTriangleIcon
} from "@heroicons/vue/24/outline";

import { useSettingsStore } from "@stores/settings";

import { QUESTION_LIMIT, TIME_LIMITS } from "@constants/settings";

const settingsStore = useSettingsStore();

const props = defineProps({
  fieldClass: {
    type: String,
    default:
      "border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
  }
});
</script>

<template>
  <div class="grid md:grid-cols-2 gap-6 space-y-6">
    <!-- Company Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-100 mb-2">
        Company
      </label>
      <div class="relative group">
        <select
          v-model="settingsStore.company"
          class="w-full rounded-md px-3 py-2 pr-8 appearance-none"
          :class="fieldClass"
        >
          <option
            v-for="company in settingsStore.companies"
            :key="company"
            :value="company"
          >
            {{ company }}
          </option>
        </select>
        <ChevronDownIcon
          class="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-200"
        />
      </div>
    </div>

    <!-- Difficulty Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-100 mb-2">
        Difficulty
      </label>
      <div class="flex flex-wrap gap-4">
        <label
          v-for="level in settingsStore.difficultyLevels"
          :key="level"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="level"
            v-model="settingsStore.difficulty"
            class="rounded border-gray-600 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
          />
          <span class="ml-2 text-gray-100">{{ level }}</span>
        </label>
      </div>
      <div class="flex gap-4 h-1">
        <span
          v-if="settingsStore.difficulty.length === 0"
          class="flex gap-1 text-xs text-red-400 font-bold"
        >
          <ExclamationTriangleIcon class="w-4 h-4" />
          Select at least one difficulty
        </span>
      </div>
    </div>

    <!-- Question Count -->
    <div>
      <label class="block text-sm font-medium text-gray-100 mb-2">
        Number of Questions
      </label>
      <div class="relative group">
        <select
          v-model.number="settingsStore.questionCount"
          class="w-full rounded-md px-3 py-2 pr-8 appearance-none"
          :class="fieldClass"
        >
          <option v-for="i in QUESTION_LIMIT" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
        <ChevronDownIcon
          class="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-200"
        />
      </div>
    </div>

    <!-- Time Limit -->
    <div>
      <label class="block text-sm font-medium text-gray-100 mb-2">
        Time Limit
      </label>
      <div class="relative group">
        <select
          v-model="settingsStore.timeLimit"
          class="w-full rounded-md px-3 py-2 pr-8 appearance-none"
          :class="fieldClass"
        >
          <option
            v-for="limit in TIME_LIMITS"
            :key="limit.value"
            :value="limit.value"
          >
            {{ limit.label }}
          </option>
        </select>
        <ChevronDownIcon
          class="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-200"
        />
      </div>
    </div>

    <!-- Topics -->
    <div class="col-span-full">
      <div class="md:hidden flex justify-end items-center mb-3 h-1">
        <!-- Mobile error message -->
        <span
          v-if="settingsStore.topics.length === 0"
          class="flex gap-1 text-xs text-red-400 font-bold"
        >
          <ExclamationTriangleIcon class="w-4 h-4" />
          Select at least one topic
        </span>
      </div>
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-medium text-gray-100"> Topics </label>
        <div class="flex items-center gap-4">
          <!-- Desktop error message -->
          <span
            v-if="settingsStore.topics.length === 0"
            class="hidden md:flex gap-1 text-xs text-red-400 font-bold"
          >
            <ExclamationTriangleIcon class="w-4 h-4" />
            Select at least one topic
          </span>

          <!-- Topic count -->
          <span class="text-xs text-gray-400 font-bold">
            {{ settingsStore.topics.length }} /
            {{ settingsStore.availableTopics.length }}
          </span>

          <!-- Select All/Unselect All button -->
          <button
            @click="
              settingsStore.topics.length ===
              settingsStore.availableTopics.length
                ? (settingsStore.topics = [])
                : (settingsStore.topics = [...settingsStore.availableTopics])
            "
            class="mr-2 py-1 text-xs w-24 font-bold text-white rounded-md transition-colors duration-300"
            :class="
              settingsStore.topics.length ===
              settingsStore.availableTopics.length
                ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                : 'px-3 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
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
      <div class="min-h-40 overflow-y-auto rounded-md p-2" :class="fieldClass">
        <div class="grid md:grid-cols-2 gap-2">
          <label
            v-for="topic in settingsStore.availableTopics"
            :key="topic"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="topic"
              v-model="settingsStore.topics"
              class="rounded border-gray-600 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
            <span class="ml-2 text-gray-100 text-sm">{{ topic }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
