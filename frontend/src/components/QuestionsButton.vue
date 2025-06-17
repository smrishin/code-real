<!-- button to get questions -->
<template>
  <div>
    <button
      class="px-4 py-2 rounded text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
      @click="getQuestions"
      :disabled="isLoading"
    >
      Get Questions
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

const settingsStore = useSettingsStore();
const questionStore = useQuestionStore();
const isLoading = ref(false);

const getQuestions = async () => {
  const secretCode = prompt("Please enter the secret code:");
  if (!secretCode) return;

  isLoading.value = true;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`, {
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
    });

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
  } catch (error) {
    console.error("Error:", error);
    alert("Error getting questions");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
