<template>
  <div v-if="question" class="relative h-full">
    <div
      class="fixed bottom-5 right-1/2 py-1 px-4 text-sm text-gray-500 backdrop-blur-sm backdrop-brightness-80 rounded-lg"
      :class="{
        'text-green-500': question.difficulty === 'Easy',
        'text-yellow-500': question.difficulty === 'Medium',
        'text-red-500': question.difficulty === 'Hard'
      }"
    >
      {{ question.difficulty }}
    </div>
    <!-- Question Content -->
    <div class="p-4">
      <div v-html="question.questionHTML" class="prose max-w-none" />
    </div>

    <div class="flex justify-start gap-2 py-1 px-4">
      <button
        @click="openLink(question.leetcodeLink)"
        class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-500 bg-transparent hover:bg-red-500/10 rounded-md border border-red-500/20"
      >
        LeetCode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </button>
      <button
        @click="openLink(question.solutionLink)"
        class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-transparent hover:bg-white/10 rounded-md border border-white/20"
      >
        Solution
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </button>
      <span
        class="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md"
      >
        {{ question.topic }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { openLink } from "../utils";

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});
</script>
