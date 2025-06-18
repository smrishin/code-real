<script setup>
import { useModalStore } from "../stores/modal";
import { EnvelopeIcon } from "@heroicons/vue/24/outline";
import Tooltip from "./Tooltip.vue";

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
  <Tooltip text="Contact Us" :placement="toopTipPlacement">
    <button
      @click="toggleContact"
      class="w-full flex items-center justify-center text-blue-500 hover:text-red-400 transition-colors border-none"
    >
      <EnvelopeIcon class="w-6 h-6" />
    </button>
  </Tooltip>
</template>

<style scoped></style>
