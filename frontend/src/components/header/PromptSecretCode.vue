<script setup>
import { ref, watch, nextTick } from "vue";
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

import Modal from "@components/common/Modal.vue";

import { useModalStore } from "@stores/modal";

const modalStore = useModalStore();

const secretCode = ref("");
const secretCodeInputTag = ref(null);
const showSecretCodeError = ref(false);
const showPassword = ref(false);

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  if (!secretCode.value) {
    showSecretCodeError.value = true;
    return;
  }
  showSecretCodeError.value = false;
  modalStore.closePromptSecretCode();
  emit("submit", secretCode.value);
};

watch(secretCode, (val) => {
  if (val !== "") {
    showSecretCodeError.value = false;
  }
});

watch(
  () => modalStore.isPromptSecretCodeOpen,
  (isOpen) => {
    if (!isOpen) {
      secretCode.value = "";
      showSecretCodeError.value = false;
      showPassword.value = false;
    }
  }
);
</script>

<template>
  <Modal
    class="px-2"
    :is-open="modalStore.isPromptSecretCodeOpen"
    title="Enter Secret Code"
    width="w-120"
    max-height="max-h-[90vh]"
    @open="nextTick(() => secretCodeInputTag?.focus())"
    @close="modalStore.closePromptSecretCode()"
  >
    <template #header-actions>
      <button @click="modalStore.closePromptSecretCode">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col items-center justify-center gap-4">
      <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Hidden username field for accessibility -->
        <input
          type="text"
          name="username"
          autocomplete="username"
          style="display: none"
          aria-hidden="true"
        />
        <div class="relative w-full">
          <input
            ref="secretCodeInputTag"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Secret Code"
            v-model="secretCode"
            autocomplete="current-password"
            class="w-full rounded-md border border-gray-600 mt-6 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-100"
            @keyup.enter="handleSubmit"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-6 text-gray-400 hover:text-gray-200 transition-colors h-10 flex items-center"
          >
            <EyeIcon v-if="!showPassword" class="h-5 w-5" />
            <EyeSlashIcon v-else class="h-5 w-5" />
          </button>
        </div>
        <div class="flex flex-col items-center justify-center gap-4 h-10">
          <span v-if="showSecretCodeError" class="text-red-500 text-sm">
            Enter the secret code to start the mock
          </span>
        </div>
        <p class="text-gray-400 text-sm">
          <span class="font-bold">Note:</span> This is a secret code to prevent
          unauthorized access.
        </p>
      </form>
    </div>
    <template #footer>
      <button
        class="px-4 py-2 rounded-lg text-white font-bold text-md bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-2 capitalize"
        @click="handleSubmit"
      >
        Start Mock
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
