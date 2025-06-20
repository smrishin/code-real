<script setup>
import CodeEditor from "./components/editor-pane/CodeEditor.vue";
// import SideBarLeft from "./components/SideBarLeft.vue";
import Landing from "./components/main-pane/Landing.vue";
import Question from "./components/main-pane/Question.vue";
import Header from "./components/header/Header.vue";
import SettingsModal from "./components/settings/SettingsModal.vue";
import ContactModal from "./components/contact/ContactModal.vue";
import DesktopRecommendationModal from "./components/common/DesktopRecommendationModal.vue";

import { onUnmounted, watch, computed, onMounted } from "vue";
import { useTimerStore } from "./stores/timer";
import { useQuestionStore } from "./stores/question";
import { useModalStore } from "./stores/modal";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();
const modalStore = useModalStore();

// Computed properties for current question
const currentQuestion = computed(() => questionStore.getCurrentQuestion());

// Mobile detection function
const isMobileDevice = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
};

// Check if user has already dismissed the modal
const hasUserDismissedModal = () => {
  return localStorage.getItem("desktopRecommendationDismissed") === "true";
};

// Show desktop recommendation modal on mobile
const checkAndShowDesktopRecommendation = () => {
  if (isMobileDevice() && !hasUserDismissedModal()) {
    modalStore.openDesktopRecommendation();
  }
};

// Handle modal close and remember user's choice
const handleDesktopRecommendationClose = () => {
  localStorage.setItem("desktopRecommendationDismissed", "true");
  modalStore.closeDesktopRecommendation();
};

// Cleanup on component unmount
onUnmounted(() => {
  timerStore.cleanup();
});

// Check for mobile device on mount
onMounted(() => {
  checkAndShowDesktopRecommendation();
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

  <!-- Desktop Recommendation Modal -->
  <DesktopRecommendationModal @close="handleDesktopRecommendationClose" />

  <div
    class="flex flex-col md:flex-row w-screen md:h-[calc(100vh-3.5rem)] overflow-hidden"
  >
    <!-- Left sidebar -->
    <!-- <SideBarLeft /> -->

    <!-- Question Pane -->
    <div class="w-full md:w-1/2 overflow-auto md:border-r md:border-gray-700">
      <Landing v-if="!currentQuestion" />
      <Question v-else :question="currentQuestion" />
    </div>

    <!-- Code Editor Pane -->
    <div class="w-full md:w-1/2 h-1/2 md:h-full flex">
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
