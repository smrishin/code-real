<script setup>
import { ref, computed, watch } from "vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

import Modal from "@components/common/Modal.vue";
import Settings from "@components/settings/Settings.vue";

import { useModalStore } from "@stores/modal";
import { useSettingsStore } from "@stores/settings";

const modalStore = useModalStore();
const settingsStore = useSettingsStore();

const showError = ref(false);

const isError = computed(() => {
  return (
    settingsStore.difficulty.length === 0 || settingsStore.topics.length === 0
  );
});

const closeModal = () => {
  if (isError.value) {
    showError.value = true;
    return;
  }
  modalStore.closeSettings();
};

watch(
  () => settingsStore.difficulty,
  () => {
    showError.value = false;
  }
);

watch(
  () => settingsStore.topics,
  () => {
    showError.value = false;
  }
);
</script>

<template>
  <Modal
    class="px-2"
    :is-open="modalStore.isSettingsOpen"
    title="Settings"
    min-height="min-h-[200px]"
    @close="closeModal"
  >
    <template #header-actions>
      <div
        v-if="showError"
        class="flex items-center text-xs text-red-400 font-bold"
      >
        <ExclamationTriangleIcon class="h-4 w-4 mr-1" />
        Fix the errors to continue
      </div>
      <button
        @click="settingsStore.resetSettings"
        class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-400"
      >
        Reset
      </button>
      <button
        @click="closeModal"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Done
      </button>
    </template>
    <Settings class="py-8" />
  </Modal>
</template>
