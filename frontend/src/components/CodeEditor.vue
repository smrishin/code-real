<template>
  <vue-monaco-editor
    v-model:value="code"
    language="python"
    theme="vs-dark"
    :options="options"
    class="h-full"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";

const props = defineProps({
  initialCode: {
    type: String,
    default: 'print("Hello, world!")'
  }
});

const code = ref(props.initialCode);
const options = {
  automaticLayout: true,
  minimap: { enabled: false },
  formatOnType: true,
  formatOnPaste: true,
  tabSize: 4,
  insertSpaces: true
};

// Update code if initialCode prop changes
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
