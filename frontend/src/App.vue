<script setup>
import CodeEditor from "./components/CodeEditor.vue";
import SideBarLeft from "./components/SideBarLeft.vue";
import Landing from "./components/Landing.vue";
import Timer from "./components/Timer.vue";
import Question from "./components/Question.vue";
import { onUnmounted, watch, computed } from "vue";
import { useTimerStore } from "./stores/timer";
import { useQuestionStore } from "./stores/question";
import { CodeBracketIcon } from "@heroicons/vue/24/outline";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();

const resetMock = () => {
  if (confirm("Are you sure you want to reset the mock?")) {
    questionStore.resetQuestions();
    timerStore.resetTimer();
  }
};

// Computed properties for current question
const currentQuestion = computed(() => questionStore.getCurrentQuestion());

// Cleanup on component unmount
onUnmounted(() => {
  timerStore.cleanup();
});

// Watch for timer state changes
watch(
  () => timerStore.isTimeUp,
  (isTimeUp) => {
    questionStore.setEditorDisabled(isTimeUp);
  }
);
</script>

<template>
  <header
    class="z-10 flex justify-between items-center w-screen h-[3.5rem] bg-blue-900"
  >
    <!-- Logo -->
    <div class="pl-4">
      <CodeBracketIcon class="w-10 h-10 text-amber-500" />
    </div>

    <!-- Reset Mock Button -->
    <div class="flex items-center gap-2">
      <div v-if="questionStore.questions.length > 0" class="pr-4">
        <button
          class="px-4 py-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 border border-red-700/20 transition-colors flex items-center gap-2 capitalize"
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

  <div class="flex w-screen h-[calc(100vh-3.5rem)] overflow-hidden">
    <!-- Left sidebar -->
    <SideBarLeft />

    <!-- Question Pane -->
    <div class="w-1/2 overflow-auto border-r border-gray-700">
      <Landing v-if="!currentQuestion" />
      <Question v-else :question="currentQuestion" />
    </div>

    <!-- Code Editor Pane -->
    <div class="w-1/2 h-[calc(100vh-2.5rem)] overflow-auto bg-[#1E1E1E]">
      <CodeEditor
        :initial-code="questionStore.getCurrentCode()"
        :disabled="questionStore.isEditorDisabled"
        :leetcode-link="currentQuestion?.leetcodeLink || ''"
        @update:value="questionStore.updateCode"
      />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
