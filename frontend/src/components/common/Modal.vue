<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: "w-[calc(100vw-30rem)]"
  },
  maxHeight: {
    type: String,
    default: "max-h-[calc(100vh-10rem)]"
  },
  titleClass: {
    type: String,
    default: ""
  },
  minHeight: {
    type: String,
    default: "min-h-[200px]"
  }
});

const emit = defineEmits(["close", "open"]);

const closeModal = () => {
  emit("close");
};

// Close modal when clicking outside
const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

// Handle escape key
const handleEscape = (event) => {
  if (event.key === "Escape" && props.isOpen) {
    closeModal();
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});

watch(
  () => props.isOpen,
  (val) => {
    if (val) emit("open");
  }
);
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50"
    @click="handleBackdropClick"
  >
    <div
      :class="[width, maxHeight, minHeight]"
      class="flex flex-col justify-between bg-gray-900 rounded-lg shadow-xl overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div
        class="sticky top-0 backdrop-blur-[15px] px-6 pt-4 flex justify-between items-center"
      >
        <h2 class="text-xl font-semibold text-gray-100" :class="titleClass">
          {{ title }}
        </h2>
        <div class="flex justify-end space-x-3">
          <slot name="header-actions"></slot>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 pb-4">
        <slot></slot>
      </div>

      <div class="flex justify-center" :class="{ 'px-6 pb-6': $slots.footer }">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
