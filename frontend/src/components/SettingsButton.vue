<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["toggle-settings"]);
const isOpen = ref(false);

// Watch for modal state changes from parent
watch(
  () => props.isModalOpen,
  (newValue) => {
    isOpen.value = newValue;
  }
);

const toggleSettings = () => {
  isOpen.value = !isOpen.value;
  emit("toggle-settings", isOpen.value);
};
</script>

<template>
  <button
    @click="toggleSettings"
    class="w-full h-10 flex items-center justify-center bg-gray-700 transition-colors group"
    :class="{ 'bg-gray-600': isOpen }"
    title="Settings"
  >
    <div
      class="text-white text-xl font-bold transition-transform duration-300 group-hover:rotate-90"
    >
      ⚙️
    </div>
  </button>
</template>

<style scoped></style>
