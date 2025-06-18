<template>
  <vue-monaco-editor
    v-model:value="code"
    language="python"
    theme="vs-dark"
    :options="options"
    class="py-4 h-full"
  />
  <div v-if="leetcodeLink" class="fixed bottom-5 right-5 text-sm">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
    >
      <div
        v-if="showToast"
        class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white rounded-md whitespace-nowrap"
      >
        Code Copied!
      </div>
    </Transition>
    <button
      @click="handleLeetCodeClick"
      class="flex items-center gap-2 px-3 py-1 text-amber-500 bg-transparent hover:bg-amber-500/10 backdrop-blur-sm backdrop-brightness-80 rounded-md"
    >
      <PlayIcon class="w-4 h-4" />
      Run
      <img
        src="../assets/leetcode.png"
        alt="LeetCode"
        class="w-4 h-4 rounded-full mr-1"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { openLink } from "../utils";
import { PlayIcon } from "@heroicons/vue/24/outline";

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
const showToast = ref(false);

const handleLeetCodeClick = async () => {
  try {
    await navigator.clipboard.writeText(code.value);
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 5000);
    openLink(props.leetcodeLink);
  } catch (err) {
    console.error("Failed to copy code to clipboard:", err);
    // Still open LeetCode even if copy fails
    openLink(props.leetcodeLink);
  }
};

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
  readOnly: props.disabled
}));

// Initial setup
onMounted(() => {
  code.value = props.initialCode;
});
</script>

<style scoped>
.vue-monaco-editor,
.vue-monaco-editor .monaco-editor {
  height: 100%;
}
</style>
