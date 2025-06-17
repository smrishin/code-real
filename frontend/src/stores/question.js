import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("question", () => {
  // State
  const questions = ref([]); // Array of questions
  const currentQuestionIndex = ref(null); // Index of the currently selected question
  const userCodes = ref({}); // Map of question ID to user code
  const isEditorDisabled = ref(false);

  // Actions
  function setQuestions(newQuestions) {
    questions.value = newQuestions.map((q) => ({
      ...q,
      initialCode: q.initialCode || ""
    }));
    // Initialize user codes for all questions
    newQuestions.forEach((q) => {
      if (!userCodes.value[q.id]) {
        userCodes.value[q.id] = q.initialCode || "";
      }
    });
    // Set the first question as current if available
    if (newQuestions.length > 0 && currentQuestionIndex.value === null) {
      currentQuestionIndex.value = 0;
    }
  }

  function setCurrentQuestionIndex(index) {
    if (index >= 0 && index < questions.value.length) {
      currentQuestionIndex.value = index;
    }
  }

  function getCurrentQuestion() {
    if (currentQuestionIndex.value !== null) {
      return questions.value[currentQuestionIndex.value];
    }
    return null;
  }

  function updateCode(code) {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      userCodes.value[currentQuestion.id] = code;
    }
  }

  function getCurrentCode() {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      return userCodes.value[currentQuestion.id] || "";
    }
    return "";
  }

  function setEditorDisabled(disabled) {
    isEditorDisabled.value = disabled;
  }

  function resetQuestions() {
    questions.value = [];
    currentQuestionIndex.value = null;
    userCodes.value = {};
    isEditorDisabled.value = false;
  }

  return {
    // State
    questions,
    currentQuestionIndex,
    userCodes,
    isEditorDisabled,
    // Actions
    setQuestions,
    setCurrentQuestionIndex,
    getCurrentQuestion,
    updateCode,
    getCurrentCode,
    setEditorDisabled,
    resetQuestions
  };
});
