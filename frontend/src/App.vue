<script setup>
import CodeEditor from "./components/CodeEditor.vue";
// import SideBarLeft from "./components/SideBarLeft.vue";
import Landing from "./components/Landing.vue";
import Question from "./components/Question.vue";
import Header from "./components/Header.vue";
import SettingsModal from "./components/SettingsModal.vue";
import ContactModal from "./components/ContactModal.vue";
import { onUnmounted, watch, computed } from "vue";
import { useTimerStore } from "./stores/timer";
import { useQuestionStore } from "./stores/question";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();

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
  <!-- Header -->
  <Header />

  <!-- Settings Modal -->
  <SettingsModal />

  <!-- Contact Modal -->
  <ContactModal />

  <div class="flex w-screen h-[calc(100vh-3.5rem)] overflow-hidden">
    <!-- Left sidebar -->
    <!-- <SideBarLeft /> -->

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
