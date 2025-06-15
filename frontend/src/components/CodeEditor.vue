<template>
  <vue-monaco-editor
    v-model:value="code"
    language="python"
    theme="vs-dark"
    :options="options"
    class="py-4 h-full"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";

const props = defineProps({
  initialCode: {
    type: String,
    default: 'print("Hello, world!")'
  },
  disabled: {
    type: Boolean,
    default: false
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
