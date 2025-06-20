<script setup>
import { CodeBracketIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted, onUnmounted } from "vue";

import Timer from "./Timer.vue";
import SettingsButton from "../settings/SettingsButton.vue";
import ContactButton from "../contact/ContactButton.vue";
import RestartMockButton from "./RestartMockButton.vue";
import StartMockButton from "./StartMockButton.vue";
import QuestionsList from "./QuestionsList.vue";
import { useQuestionStore } from "../../stores/question";

const questionStore = useQuestionStore();

// Scroll state for mobile header
const isScrolled = ref(false);

const handleScroll = () => {
  // Only apply scroll effect on mobile (less than md breakpoint)
  if (window.innerWidth < 768) {
    isScrolled.value = window.scrollY > 10;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="sticky top-0 z-10 flex justify-between items-center w-screen h-[3.5rem] bg-blue-950"
  >
    <div class="pl-4 flex items-center gap-7">
      <!-- Logo -->
      <CodeBracketIcon class="w-10 h-10 text-amber-500" />

      <!-- Settings Button -->
      <SettingsButton toopTipPlacement="bottom-right" />
      <ContactButton toopTipPlacement="bottom-right" />
    </div>

    <div class="flex items-center gap-4">
      <!-- Desktop -->
      <div class="hidden md:flex items-center gap-4">
        <StartMockButton v-if="questionStore.questions.length === 0" />

        <!-- Questions List -->
        <QuestionsList />

        <!-- Start New Mock Button -->
        <RestartMockButton />
      </div>

      <!-- Timer -->
      <div class="pr-4">
        <Timer :is-scrolled="isScrolled" />
      </div>
    </div>
  </header>

  <!-- Mobile secondary header-->
  <div
    :class="[
      'sticky top-[3.5rem] z-1 md:hidden flex justify-between items-center gap-4 px-4 w-screen bg-blue-950 transition-all duration-300 ease-in-out',
      isScrolled ? 'h-[2rem]' : 'h-[3.5rem]'
    ]"
  >
    <StartMockButton
      v-if="questionStore.questions.length === 0"
      :is-scrolled="isScrolled"
      button-text="Start New Mock"
      :full-width="true"
    />

    <div
      v-if="questionStore.questions.length > 0"
      class="flex items-center gap-4"
    >
      <QuestionsList :is-scrolled="isScrolled" />
      <RestartMockButton :is-scrolled="isScrolled" button-text="New Mock" />
    </div>
  </div>
</template>
