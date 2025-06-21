<script setup>
import { EnvelopeIcon } from "@heroicons/vue/24/outline";

import { useModalStore } from "@stores/modal";

import Tooltip from "@components/common/Tooltip.vue";

const modalStore = useModalStore();

const props = defineProps({
  toopTipPlacement: {
    type: String,
    default: "bottom-right"
  }
});

const toggleContact = () => {
  modalStore.toggleContact();
};
</script>

<template>
  <Tooltip text="Contact" :placement="toopTipPlacement">
    <button
      @click="toggleContact"
      class="w-full flex items-center justify-center text-blue-500 hover:text-red-400 transition-colors border-none"
    >
      <EnvelopeIcon class="w-6 h-6" />
    </button>
  </Tooltip>
</template>

<style scoped></style>
