<script setup>
import { ref, watch } from "vue";
import { useTimerStore } from "../stores/timer";

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["toggle-settings"]);
const isOpen = ref(false);
const timerStore = useTimerStore();

// Watch for modal state changes from parent
watch(
  () => props.isModalOpen,
  (newValue) => {
    isOpen.value = newValue;
  }
);

const toggleSettings = () => {
  if (!timerStore.isRunning) {
    isOpen.value = !isOpen.value;
    emit("toggle-settings", isOpen.value);
  }
};
</script>

<template>
  <button
    @click="toggleSettings"
    :disabled="timerStore.isRunning"
    class="w-full h-10 flex items-center justify-center bg-gray-700 transition-colors group"
    :title="
      timerStore.isRunning
        ? 'Cannot change settings while timer is running'
        : 'Settings'
    "
  >
    <div
      class="text-white text-xl font-bold transition-transform duration-300 group-hover:rotate-90"
    >
      ⚙️
    </div>
  </button>
</template>

<style scoped></style>
