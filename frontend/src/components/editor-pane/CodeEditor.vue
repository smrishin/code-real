<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";

import RunButton from "./RunButton.vue";

const props = defineProps({
  initialCode: {
    type: String,
    default: 'print("Hello, world!")'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  leetcodeLink: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:value"]);

const code = ref(props.initialCode);

// Watch for code changes and emit updates
watch(code, (newValue) => {
  emit("update:value", newValue);
});

// Watch for initialCode prop changes
watch(
  () => props.initialCode,
  (newValue) => {
    code.value = newValue;
  }
);

const options = computed(() => ({
  automaticLayout: true,
  minimap: { enabled: false },
  formatOnType: true,
  formatOnPaste: true,
  tabSize: 4,
  insertSpaces: true,
  readOnly: props.disabled,
  wordWrap: "on",
  scrollBeyondLastColumn: 0,
  scrollBeyondLastLine: false,
  scrollbar: {
    horizontal: "hidden",
    vertical: "hidden"
  }
}));

// Initial setup
onMounted(() => {
  code.value = props.initialCode;
});
</script>

<template>
  <div class="flex flex-col flex-1 bg-[#1e1e1e]">
    <!-- Mobile Header -->
    <div class="md:hidden flex items-center justify-between px-4 pt-2">
      <span class="text-gray-400 font-semibold"> Code Editor </span>
      <RunButton :leetcode-link="props.leetcodeLink" :code="code" />
    </div>

    <!-- Code Editor -->
    <vue-monaco-editor
      v-model:value="code"
      language="python"
      theme="vs-dark"
      :options="options"
      class="py-4 h-full w-full"
    />

    <!-- Desktop Run Button -->
    <RunButton
      class="hidden md:block fixed bottom-5 right-5"
      :leetcode-link="props.leetcodeLink"
      :code="code"
    />
  </div>
</template>

<style scoped>
/* Hide the keyboard icon */
::v-deep(textarea.iPadShowKeyboard) {
  display: none !important;
}

::v-deep(.monaco-editor) {
  height: 100% !important;
  min-height: 200px !important;
  outline: #1e1e1e !important;
}

/* Mobile-specific */
@media (max-width: 767px) {
  ::v-deep(.monaco-editor) {
    height: calc(50vh) !important; /* Account for header and label */
  }
}
</style>
