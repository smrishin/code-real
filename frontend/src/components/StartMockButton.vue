<!-- button to get questions -->
<template>
  <div>
    <button
      class="px-4 py-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 border border-red-700/20 transition-colors flex items-center gap-2 capitalize"
      @click="getQuestions"
      :disabled="isLoading"
    >
      Start Mock
    </button>
    <Loader v-if="isLoading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useQuestionStore } from "../stores/question";
import DOMPurify from "dompurify";
import Loader from "./Loader.vue";
import { useTimerStore } from "../stores/timer";

const settingsStore = useSettingsStore();
const questionStore = useQuestionStore();
const timerStore = useTimerStore();
const isLoading = ref(false);

const getQuestions = async () => {
  const secretCode = prompt("Please enter the secret code:");
  if (!secretCode) return;

  isLoading.value = true;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || ""}/api/questions`,
      {
        method: "POST",
        body: JSON.stringify({
          company: settingsStore.company,
          noOfQuestions: settingsStore.questionCount,
          difficulty: settingsStore.difficulty,
          topics: settingsStore.topics,
          secretCode: secretCode
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 401) {
        alert("Invalid secret code. Please try again.");
      } else {
        alert(error.message || "Error getting questions");
      }
      return;
    }

    const data = await response.json();

    // Store questions in the question store
    questionStore.setQuestions(
      data.map((q, index) => ({
        id: index.toString(),
        name: q.name,
        leetcodeLink: q.leetcodeLink,
        solutionLink: q.solutionLink,
        difficulty: q.difficulty,
        topic: q.topic,
        questionHTML: DOMPurify.sanitize(q.questionHTML),
        initialCode: q.initialCode || ""
      }))
    );

    timerStore.startTimer();
  } catch (error) {
    console.error("Error:", error);
    alert("Error getting questions");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
