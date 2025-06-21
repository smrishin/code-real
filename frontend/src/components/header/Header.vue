<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { CodeBracketIcon } from "@heroicons/vue/24/outline";

import Timer from "@components/header/Timer.vue";
import SettingsButton from "@components/settings/SettingsButton.vue";
import ContactButton from "@components/contact/ContactButton.vue";
import RestartMockButton from "@components/header/RestartMockButton.vue";
import StartMockButton from "@components/header/StartMockButton.vue";
import QuestionsList from "@components/header/QuestionsList.vue";

import { useQuestionStore } from "@stores/question";

const questionStore = useQuestionStore();

const scrollY = ref(0);

// Computed header height
const headerHeight = computed(() => {
  if (window.innerWidth >= 768) {
    return "3.5rem";
  }

  // Mobile: smooth transition from 7rem to 5.5rem based on scroll
  const maxScroll = 50;
  const scrollProgress = Math.min(scrollY.value / maxScroll, 1);
  const heightDiff = 1.5; // Difference between max and min height in rem
  const currentHeight = 7 - scrollProgress * heightDiff;

  return `${currentHeight}rem`;
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
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
    :style="{ height: headerHeight }"
    class="sticky top-0 z-10 flex flex-col justify-evenly items-center w-screen bg-blue-950 transition-all duration-200 ease-out"
  >
    <div class="flex justify-between items-center w-full">
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
          <Timer />
        </div>
      </div>
    </div>

    <!-- Mobile secondary header-->
    <div class="md:hidden flex justify-between items-center gap-4 px-4 w-full">
      <StartMockButton
        v-if="questionStore.questions.length === 0"
        button-text="Start New Mock"
        :for-mobile-header="true"
      />

      <div
        v-if="questionStore.questions.length > 0"
        class="flex w-full items-center gap-4"
      >
        <QuestionsList class="flex-1" />
        <RestartMockButton button-text="New Mock" />
      </div>
    </div>
  </header>
</template>
