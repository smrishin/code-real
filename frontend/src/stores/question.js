import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("question", () => {
  // State
  const currentQuestion = ref(null);
  const userCode = ref("");
  const isEditorDisabled = ref(false);

  // Actions
  function setQuestion(question) {
    currentQuestion.value = question;
    userCode.value = question?.initialCode || "";
  }

  function updateCode(code) {
    userCode.value = code;
  }

  function setEditorDisabled(disabled) {
    isEditorDisabled.value = disabled;
  }

  function resetQuestion() {
    currentQuestion.value = null;
    userCode.value = "";
    isEditorDisabled.value = false;
  }

  return {
    // State
    currentQuestion,
    userCode,
    isEditorDisabled,
    // Actions
    setQuestion,
    updateCode,
    setEditorDisabled,
    resetQuestion
  };
});
