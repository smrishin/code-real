<script setup>
import { CodeBracketIcon } from "@heroicons/vue/24/outline";

import { useQuestionStore } from "../../stores/question";
import { useTimerStore } from "../../stores/timer";

import Timer from "./Timer.vue";
import SettingsButton from "../settings/SettingsButton.vue";
import ContactButton from "../contact/ContactButton.vue";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();

const resetMock = () => {
  if (confirm("Are you sure you want to reset the mock?")) {
    questionStore.resetQuestions();
    timerStore.resetTimer();
  }
};
</script>

<template>
  <header
    class="z-10 flex justify-between items-center w-screen h-[3.5rem] bg-blue-950"
  >
    <div class="pl-4 flex items-center gap-7">
      <!-- Logo -->
      <CodeBracketIcon class="w-10 h-10 text-amber-500" />

      <!-- Settings Button -->
      <SettingsButton toopTipPlacement="bottom-right" />
      <ContactButton toopTipPlacement="bottom-right" />
    </div>

    <!-- Questions List -->
    <div class="flex items-center gap-4">
      <div v-if="questionStore.questions.length > 0" class="flex gap-4">
        <button
          v-for="(question, index) in questionStore.questions"
          :key="index"
          :class="[
            'text-center transition-colors px-8 h-10 rounded-lg',
            questionStore.currentQuestionIndex === index
              ? 'bg-blue-800 text-white'
              : 'bg-blue-900 hover:bg-blue-700 text-gray-200'
          ]"
          @click="questionStore.setCurrentQuestionIndex(index)"
        >
          Q{{ index + 1 }}
        </button>
      </div>

      <!-- Reset Mock Button -->
      <div v-if="questionStore.questions.length > 0" class="">
        <button
          class="flex items-center gap-2 capitalize px-4 h-10 rounded-lg text-white bg-blue-800 hover:bg-blue-700 transition-colors"
          @click="resetMock"
          :disabled="questionStore.questions.length === 0"
        >
          Reset Mock
        </button>
      </div>

      <!-- Timer -->
      <div class="pr-4">
        <Timer />
      </div>
    </div>
  </header>
</template>
