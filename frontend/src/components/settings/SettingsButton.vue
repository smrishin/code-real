<script setup>
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { scrollToElement } from "../../utils";

import Tooltip from "../common/Tooltip.vue";

import { useTimerStore } from "../../stores/timer";
import { useModalStore } from "../../stores/modal";
import { useQuestionStore } from "../../stores/question";

const timerStore = useTimerStore();
const questionStore = useQuestionStore();
const modalStore = useModalStore();

const props = defineProps({
  buttonText: {
    type: String,
    default: ""
  },
  toopTipPlacement: {
    type: String,
    default: "bottom-right"
  },
  disableTooltip: {
    type: Boolean,
    default: false
  }
});

const tooltipText = computed(() =>
  timerStore.isRunning
    ? "Cannot change settings while timer is running"
    : "Settings"
);

const toggleSettings = () => {
  if (questionStore.questions.length === 0) {
    scrollToElement("settings");
    return;
  }
  if (!timerStore.isRunning) {
    modalStore.toggleSettings();
  }
};
</script>

<template>
  <Tooltip
    :text="tooltipText"
    :placement="toopTipPlacement"
    :disabled="disableTooltip && !timerStore.isRunning"
  >
    <button
      @click="toggleSettings"
      :disabled="timerStore.isRunning"
      class="m-auto flex items-center justify-center transition-colors group"
      :class="{
        'px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800': !!buttonText
      }"
    >
      <span
        v-if="buttonText"
        class="text-white text-sm font-bold capitalize px-2 py-1"
        >{{ buttonText }}</span
      >
      <Cog6ToothIcon
        class="w-6 h-6 text-white text-xl transition-transform duration-300"
        :class="{ 'group-hover:rotate-90': !timerStore.isRunning }"
      />
    </button>
  </Tooltip>
</template>

<style scoped></style>
