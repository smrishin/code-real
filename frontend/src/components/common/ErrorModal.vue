<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

import Modal from "./Modal.vue";
import { useModalStore } from "../../stores/modal";

const modalStore = useModalStore();

const props = defineProps({
  errorMessage: {
    type: String,
    required: true
  }
});

const closeModal = () => {
  modalStore.closeError();
};
</script>

<template>
  <Modal
    :is-open="modalStore.isErrorOpen"
    title="Error"
    title-class="text-red-400"
    width="w-96"
    max-height="max-h-[90vh]"
    @close="closeModal"
  >
    <template #header-actions>
      <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col items-center justify-center gap-4">
      <p class="whitespace-pre-line text-gray-300 text-center py-4">
        {{ props.errorMessage }}
      </p>
    </div>
    <template #footer>
      <slot name="error-actions"></slot>
    </template>
  </Modal>
</template>
