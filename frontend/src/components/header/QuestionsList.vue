<script setup>
import { useQuestionStore } from "../../stores/question";

const questionStore = useQuestionStore();

defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div v-if="questionStore.questions.length > 0" class="flex gap-4 flex-1">
    <button
      v-for="(question, index) in questionStore.questions"
      :key="index"
      :class="[
        'text-center text-xs md:text-sm max-w-30 transition-colors px-8 rounded-lg font-semibold flex-1',
        isScrolled ? 'h-6' : 'h-10',
        questionStore.currentQuestionIndex === index
          ? 'bg-blue-800 text-white'
          : 'bg-blue-900 hover:bg-blue-700 text-gray-200'
      ]"
      @click="questionStore.setCurrentQuestionIndex(index)"
    >
      Q{{ index + 1 }}
    </button>
  </div>
</template>
