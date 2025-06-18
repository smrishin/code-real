<script setup>
import { useTimerStore } from "../stores/timer";
import { useModalStore } from "../stores/modal";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import Tooltip from "./Tooltip.vue";
import { computed } from "vue";

const timerStore = useTimerStore();
const modalStore = useModalStore();

const props = defineProps({
  toopTipPlacement: {
    type: String,
    default: "bottom-right"
  }
});

const tooltipText = computed(() =>
  timerStore.isRunning
    ? "Cannot change settings while timer is running"
    : "Settings"
);

const toggleSettings = () => {
  if (!timerStore.isRunning) {
    modalStore.toggleSettings();
  }
};
</script>

<template>
  <Tooltip :text="tooltipText" :placement="toopTipPlacement">
    <button
      @click="toggleSettings"
      :disabled="timerStore.isRunning"
      class="m-auto flex items-center justify-center transition-colors group border-none"
    >
      <Cog6ToothIcon
        class="w-6 h-6 text-white text-xl transition-transform duration-300"
        :class="{ 'group-hover:rotate-90': !timerStore.isRunning }"
      />
    </button>
  </Tooltip>
</template>

<style scoped></style>
