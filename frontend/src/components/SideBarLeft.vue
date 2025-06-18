<script setup>
import SettingsModal from "./SettingsModal.vue";
import ContactModal from "./ContactModal.vue";
import SettingsButton from "./SettingsButton.vue";
import ContactButton from "./ContactButton.vue";
import { useQuestionStore } from "../stores/question";

const questionStore = useQuestionStore();
</script>

<template>
  <!-- Settings Modal -->
  <SettingsModal />

  <!-- Contact Modal -->
  <ContactModal />

  <div class="flex flex-col justify-between w-10 pt-2 pb-6 bg-gray-700 gap-2">
    <div class="flex flex-col">
      <SettingsButton class="py-4" toopTipPlacement="right" />

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

    <ContactButton class="py-2" />
  </div>
</template>

<style scoped></style>
