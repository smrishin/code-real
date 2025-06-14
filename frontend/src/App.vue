<script setup>
import { marked } from "marked";

import CodeEditor from "./components/CodeEditor.vue";

const md =
  '## Google Software Engineer Interview Question: Identifying Fraudulent Transactions\n\n**Problem Statement:**\n\nGoogle Pay is investigating potentially fraudulent transaction patterns. As part of this effort, you are tasked with building a function to quickly determine if a given list of transaction IDs contains any duplicates. A large number of transactions are processed daily, and identifying duplicates efficiently is critical to prevent potential abuse and maintain system integrity. Given a list of transaction IDs, determine if any ID appears more than once.\n\n**Function Signature (Python):**\n\n```python\ndef contains_duplicate_transaction(transaction_ids: list[str]) -> bool:\n    """\n    Checks if a list of transaction IDs contains any duplicates.\n    """\n    pass\n```\n\n**Examples:**\n\nExample 1:\n```\nInput: transaction_ids = ["A123", "B456", "C789", "A123"]\nOutput: True  // The transaction ID "A123" appears twice.\n```\n\nExample 2:\n```\nInput: transaction_ids = ["X987", "Y654", "Z321"]\nOutput: False // All transaction IDs are unique.\n```\n\n**Constraints:**\n\n*   1 <= `transaction_ids.length` <= 10<sup>5</sup>\n*   `transaction_ids[i]` is a string containing alphanumeric characters.\n*   Assume that there will be only one valid answer.\n\n<details>\n  <summary><b>Detailed Explanation</b></summary>\n\n  The problem requires you to identify if there are any duplicate strings within a given list.  The core logic is straightforward: iterate through the list and check if an element has appeared before.  \n\n  **Edge Cases & Clarifying Assumptions:**\n\n  *   **Empty List:** An empty list should be considered as not containing duplicates, and your function should return `False`.\n  *   **Case Sensitivity:** Assume the transaction IDs are case-sensitive. `"a123"` is different from `"A123"`.\n  *   **Null/None Values:** Assume the input list does not contain null or None values.\n  *   **Production Considerations:**\n      *   In a real production environment, you might need to consider the size of the `transaction_ids` list. For very large lists, you might need to use a more memory-efficient data structure or a distributed approach.\n      *   You\'d also need proper error handling and logging to track any issues during the duplicate detection process.\n      *   Consider the possibility of concurrency: if multiple threads or processes are accessing and modifying the transaction data, synchronization mechanisms (like locks or atomic operations) might be necessary to avoid race conditions.\n\n</details>\n\n<details>\n  <summary><b>Explicit Constraints & Complexity Expectations</b></summary>\n\n  *   **Input Size:** 1 <= N <= 10<sup>5</sup>, where N is the number of transaction IDs.\n  *   **Data Types:** `transaction_ids` is a list of strings.\n  *   **Time Complexity:**  Aim for O(N) time complexity.  A solution that iterates through the list once is ideal.\n  *   **Space Complexity:** Aim for O(N) space complexity in the worst-case scenario (all elements are unique), or potentially O(1) if you can modify the input array in-place (which might not be desirable in a production environment).  O(N) space is acceptable if it simplifies the code and improves readability.\n</details>\n```\n';

const renderedMarkdown = marked.parse(md);

// Extract the code from the markdown
const codeMatch = md.match(/```python\n([\s\S]*?)```/);
const initialCode = codeMatch ? codeMatch[1].trim() : "";
</script>

<template>
  <div class="min-h-10 w-screen bg-blue-900">
    <!-- will contain header -->
  </div>
  <div class="flex w-screen h-[calc(100vh-2.5rem)] overflow-hidden gap-4">
    <div class="min-w-10 min-h-10 bg-gray-700">
      <!-- will contain question buttons -->
    </div>

    <!-- Left Pane -->
    <div class="w-1/2 overflow-auto border-r border-gray-300">
      <div class="p-4">
        <div v-html="renderedMarkdown" class="prose max-w-none" />
      </div>
    </div>

    <!-- Right Pane -->
    <div class="w-1/2 h-[calc(100vh-2.5rem)] overflow-auto">
      <div class="py-4 h-full">
        <CodeEditor :initial-code="initialCode" />
      </div>
    </div>
  </div>
  <!-- <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
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
