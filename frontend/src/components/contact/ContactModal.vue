<script setup>
import {
  XMarkIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from "@heroicons/vue/24/outline";

import { useModalStore } from "../../stores/modal";

import Modal from "../common/Modal.vue";

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.closeContact();
};
</script>

<template>
  <Modal
    :is-open="modalStore.isContactOpen"
    title="Contact"
    width="w-96"
    max-height="max-h-[90vh]"
    @close="closeModal"
  >
    <template #header-actions>
      <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
        <XMarkIcon class="h-6 w-6" />
      </button>
    </template>

    <div class="flex flex-col gap-4 py-8">
      <!-- Email Button -->
      <a
        href="mailto:smrishin@gmail.com"
        class="flex justify-center items-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <EnvelopeIcon class="w-5 h-5 mr-3" />
        smrishin@gmail.com
      </a>

      <!-- Portfolio Button -->
      <a
        href="https://smrishin.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex justify-center items-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <BriefcaseIcon class="w-5 h-5 mr-3" />
        Portfolio
      </a>

      <!-- Github Button -->
      <a
        href="https://github.com/smrishin"
        target="_blank"
        rel="noopener noreferrer"
        class="flex justify-center items-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5 mr-3"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577v-2.173c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.107-.775.418-1.304.762-1.604-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.465-2.382 1.235-3.222-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.005-.405 1.022.006 2.048.139 3.006.405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.479 5.92.43.37.823 1.1.823 2.22v3.293c0 .32.218.694.825.576C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        GitHub
      </a>

      <!-- LinkedIn Button -->
      <a
        href="https://www.linkedin.com/in/hrishikeshtolmamdi"
        target="_blank"
        rel="noopener noreferrer"
        class="flex justify-center items-center px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5 mr-3"
        >
          <path
            d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.43c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.43h-3v-5.39c0-1.28-.02-2.94-1.79-2.94-1.79 0-2.06 1.4-2.06 2.84v5.49h-3v-10h2.88v1.36h.04c.4-.75 1.36-1.54 2.79-1.54 2.99 0 3.54 1.97 3.54 4.53v5.65z"
          />
        </svg>
        LinkedIn
      </a>
    </div>
  </Modal>
</template>
