<script setup>
import { openLink } from "../../utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div v-if="question" class="relative h-full">
    <div
      class="fixed bottom-5 right-1/2 -translate-x-1/4 py-1 px-4 text-sm text-gray-500 backdrop-blur-sm backdrop-brightness-80 rounded-lg"
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
      <div
        v-html="question.questionHTML"
        class="prose max-w-none prose-ul:list-disc prose-ol:list-decimal"
      />
    </div>

    <!-- Topic -->
    <div class="flex justify-start gap-2 py-1 px-4">
      <span
        class="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-full"
      >
        {{ question.topic }}
      </span>
    </div>

    <!-- LeetCode and Solution Buttons -->
    <div class="flex justify-start gap-2 py-2 px-4 pb-5">
      <button
        @click="openLink(question.leetcodeLink)"
        class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-amber-500 bg-transparent hover:bg-amber-500/10 rounded-md border border-amber-500/20"
      >
        <img
          src="../../assets/leetcode.png"
          alt="LeetCode"
          class="w-4 h-4 rounded-full mr-1"
        />
        LeetCode
        <ArrowTopRightOnSquareIcon class="w-4 h-4" />
      </button>
      <button
        @click="openLink(question.solutionLink)"
        class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-transparent hover:bg-white/10 rounded-md border border-white/20"
      >
        <img
          src="../../assets/neetcode.jpg"
          alt="NeetCode"
          class="w-4 h-4 rounded-full mr-1"
        />
        Solution
        <ArrowTopRightOnSquareIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
