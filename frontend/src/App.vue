<script setup>
import { marked } from "marked";
import CodeEditor from "./components/CodeEditor.vue";
import SettingsButton from "./components/SettingsButton.vue";
import SettingsModal from "./components/SettingsModal.vue";
import { onUnmounted, ref, watch } from "vue";
import { useTimerStore } from "./stores/timer";
import { useQuestionStore } from "./stores/question";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();

// Settings modal state
const isSettingsOpen = ref(false);

const toggleSettings = (isOpen) => {
  isSettingsOpen.value = isOpen;
};

const md =
  '## Google Software Engineer Interview Question: Identifying Fraudulent Transactions\n\n**Problem Statement:**\n\nGoogle Pay is investigating potentially fraudulent transaction patterns. As part of this effort, you are tasked with building a function to quickly determine if a given list of transaction IDs contains any duplicates. A large number of transactions are processed daily, and identifying duplicates efficiently is critical to prevent potential abuse and maintain system integrity. Given a list of transaction IDs, determine if any ID appears more than once.\n\n**Function Signature (Python):**\n\n```python\ndef contains_duplicate_transaction(transaction_ids: list[str]) -> bool:\n    """\n    Checks if a list of transaction IDs contains any duplicates.\n    """\n    pass\n```\n\n**Examples:**\n\nExample 1:\n```\nInput: transaction_ids = ["A123", "B456", "C789", "A123"]\nOutput: True  // The transaction ID "A123" appears twice.\n```\n\nExample 2:\n```\nInput: transaction_ids = ["X987", "Y654", "Z321"]\nOutput: False // All transaction IDs are unique.\n```\n\n**Constraints:**\n\n*   1 <= `transaction_ids.length` <= 10<sup>5</sup>\n*   `transaction_ids[i]` is a string containing alphanumeric characters.\n*   Assume that there will be only one valid answer.\n\n<details>\n  <summary><b>Detailed Explanation</b></summary>\n\n  The problem requires you to identify if there are any duplicate strings within a given list.  The core logic is straightforward: iterate through the list and check if an element has appeared before.  \n\n  **Edge Cases & Clarifying Assumptions:**\n\n  *   **Empty List:** An empty list should be considered as not containing duplicates, and your function should return `False`.\n  *   **Case Sensitivity:** Assume the transaction IDs are case-sensitive. `"a123"` is different from `"A123"`.\n  *   **Null/None Values:** Assume the input list does not contain null or None values.\n  *   **Production Considerations:**\n      *   In a real production environment, you might need to consider the size of the `transaction_ids` list. For very large lists, you might need to use a more memory-efficient data structure or a distributed approach.\n      *   You\'d also need proper error handling and logging to track any issues during the duplicate detection process.\n      *   Consider the possibility of concurrency: if multiple threads or processes are accessing and modifying the transaction data, synchronization mechanisms (like locks or atomic operations) might be necessary to avoid race conditions.\n\n</details>\n\n<details>\n  <summary><b>Explicit Constraints & Complexity Expectations</b></summary>\n\n  *   **Input Size:** 1 <= N <= 10<sup>5</sup>, where N is the number of transaction IDs.\n  *   **Data Types:** `transaction_ids` is a list of strings.\n  *   **Time Complexity:**  Aim for O(N) time complexity.  A solution that iterates through the list once is ideal.\n  *   **Space Complexity:** Aim for O(N) space complexity in the worst-case scenario (all elements are unique), or potentially O(1) if you can modify the input array in-place (which might not be desirable in a production environment).  O(N) space is acceptable if it simplifies the code and improves readability.\n</details>\n```\n';

const renderedMarkdown = marked.parse(md);

// Extract the code from the markdown
const codeMatch = md.match(/```python\n([\s\S]*?)```/);
const initialCode = codeMatch ? codeMatch[1].trim() : "";

// Set initial question
questionStore.setQuestion({
  initialCode,
  title: "Identifying Fraudulent Transactions",
  difficulty: "Medium",
  company: "Google",
  topics: ["Arrays", "Hash Table"]
});

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

    <div class="pr-4 flex items-center gap-4">
      <span class="text-white font-mono text-xl">{{
        timerStore.formattedTime
      }}</span>
      <div class="flex gap-2">
        <button
          @click="
            timerStore.isRunning
              ? timerStore.pauseTimer()
              : timerStore.startTimer()
          "
          class="px-4 py-2 rounded bg-white text-blue-900 hover:bg-blue-100 transition-colors flex items-center gap-2"
          :disabled="!timerStore.isPaused && timerStore.isTimeUp"
        >
          <span v-if="timerStore.isRunning">⏸️</span>
          <span v-else-if="timerStore.isPaused">▶️</span>
          <span v-else>▶️</span>
        </button>
        <button
          @click="timerStore.resetTimer"
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
          :disabled="!timerStore.isPaused && !timerStore.isTimeUp"
        >
          🔄
        </button>
      </div>
    </div>
  </div>

  <div class="flex w-screen h-[calc(100vh-3.5rem)] overflow-hidden">
    <!-- Left sidebar -->
    <div class="w-10 bg-gray-700 flex flex-col">
      <SettingsButton
        :is-modal-open="isSettingsOpen"
        @toggle-settings="toggleSettings"
      />
    </div>

    <!-- Settings Modal -->
    <SettingsModal :is-open="isSettingsOpen" @close="toggleSettings(false)" />

    <!-- Left Pane -->
    <div class="w-1/2 overflow-auto border-r border-gray-300">
      <!-- top right difficulty -->
      <div class="p-4">
        <div v-html="renderedMarkdown" class="prose max-w-none" />
      </div>
      <!-- at the end, question name and topic, tags if exist -->
      <!-- bottom right -->
      <!-- leetcode link -->
      <!-- solution link -->
    </div>

    <!-- Right Pane -->
    <div class="w-1/2 h-[calc(100vh-2.5rem)] overflow-auto">
      <CodeEditor
        :initial-code="questionStore.userCode"
        :disabled="questionStore.isEditorDisabled"
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

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
