<script setup>
import CodeEditor from "./components/CodeEditor.vue";
import SettingsButton from "./components/SettingsButton.vue";
import SettingsModal from "./components/SettingsModal.vue";
import QuestionsButton from "./components/QuestionsButton.vue";
import Timer from "./components/Timer.vue";
import Question from "./components/Question.vue";
import { onUnmounted, ref, watch, computed } from "vue";
import { useTimerStore } from "./stores/timer";
import { useQuestionStore } from "./stores/question";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();

// Settings modal state
const isSettingsOpen = ref(false);

const toggleSettings = (isOpen) => {
  isSettingsOpen.value = isOpen;
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
  <div
    class="z-10 flex justify-between items-center w-screen h-[3.5rem] bg-blue-900"
  >
    <div class="pl-4">
      <img src="/logo.png" class="h-10 p-2" alt="logo" />
    </div>
    <div class="flex items-center gap-2">
      <div class="pr-4">
        <Timer />
      </div>

      <div class="pr-4">
        <QuestionsButton />
      </div>
    </div>
  </div>

  <div class="flex w-screen h-[calc(100vh-3.5rem)] overflow-hidden">
    <!-- Left sidebar -->
    <div class="w-10 bg-gray-700 flex flex-col gap-6">
      <SettingsButton
        :is-modal-open="isSettingsOpen"
        @toggle-settings="toggleSettings"
      />

      <!-- Questions List -->
      <div
        v-if="questionStore.questions.length > 0"
        class="flex flex-col gap-2"
      >
        <button
          v-for="(question, index) in questionStore.questions"
          :key="index"
          :class="[
            'text-center transition-colors',
            questionStore.currentQuestionIndex === index
              ? 'bg-blue-800 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          ]"
          @click="questionStore.setCurrentQuestionIndex(index)"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>

    <!-- Settings Modal -->
    <SettingsModal :is-open="isSettingsOpen" @close="toggleSettings(false)" />

    <!-- Question Pane -->
    <div class="w-1/2 overflow-auto border-r border-gray-300">
      <Question v-if="currentQuestion" :question="currentQuestion" />

      <div v-else class="flex justify-center gap-10 pt-20">
        <QuestionsButton />
        <div class="w-10">
          <SettingsButton
            :is-modal-open="isSettingsOpen"
            @toggle-settings="toggleSettings"
          />
        </div>
      </div>
    </div>

    <!-- Code Editor Pane -->
    <div class="w-1/2 h-[calc(100vh-2.5rem)] overflow-auto">
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
