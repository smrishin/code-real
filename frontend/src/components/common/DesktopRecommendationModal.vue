<script setup>
import { XMarkIcon, ComputerDesktopIcon } from "@heroicons/vue/24/outline";
import { useModalStore } from "../../stores/modal";
import Modal from "./Modal.vue";

const modalStore = useModalStore();

const emit = defineEmits(["close"]);

const closeModal = () => {
  modalStore.closeDesktopRecommendation();
  emit("close");
};
</script>

<template>
  <Modal
    :is-open="modalStore.isDesktopRecommendationOpen"
    title="Desktop Recommended"
    width="w-96"
    max-height="max-h-[90vh]"
    @close="closeModal"
  >
    <template #header-actions>
      <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col items-center gap-4 py-6">
      <!-- Desktop Icon -->
      <div class="flex justify-center">
        <ComputerDesktopIcon class="h-16 w-16 text-blue-500" />
      </div>

      <!-- Message -->
      <div class="text-center space-y-3">
        <h3 class="text-lg font-semibold text-gray-100">
          Best Experience on Desktop
        </h3>
        <p class="text-gray-300 leading-relaxed">
          This website is optimized for desktop use. For the best experience,
          using a desktop or laptop is recommended.
        </p>
      </div>

      <!-- Continue Button -->
      <div class="flex gap-3 mt-4">
        <button
          @click="closeModal"
          class="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  </Modal>
</template>
