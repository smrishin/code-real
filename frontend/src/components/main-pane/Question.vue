<script setup>
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import leetcodeLogo from "@logos/leetcode.png";
import neetcodeLogo from "@logos/neetcode.jpg";
import { openLink } from "@utils";

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
      class="fixed z-10 md:absolute bottom-4 right-4 md:right-8 py-1 px-4 text-sm text-gray-500 backdrop-blur-sm backdrop-brightness-80 rounded-lg"
      :class="{
        'text-green-500': question.difficulty === 'Easy',
        'text-yellow-500': question.difficulty === 'Medium',
        'text-red-500': question.difficulty === 'Hard'
      }"
    >
      {{ question.difficulty }}
    </div>
    <!-- Question Content -->
    <div class="h-full overflow-auto">
      <div class="p-4">
        <div
          v-html="question.questionHTML"
          class="prose max-w-none prose-ul:list-disc prose-ol:list-decimal [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:whitespace-pre-wrap [&_code]:break-words"
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
          class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-amber-500 hover:bg-amber-500/10 rounded-md border border-amber-500/20"
        >
          <img
            :src="leetcodeLogo"
            alt="LeetCode"
            class="w-4 h-4 rounded-full mr-1"
          />
          LeetCode
          <ArrowTopRightOnSquareIcon class="w-4 h-4" />
        </button>
        <button
          @click="openLink(question.solutionLink)"
          class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white hover:bg-white/10 rounded-md border border-white/20"
        >
          <img
            :src="neetcodeLogo"
            alt="NeetCode"
            class="w-4 h-4 rounded-full mr-1"
          />
          Solution
          <ArrowTopRightOnSquareIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
