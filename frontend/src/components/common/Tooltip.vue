<script setup>
import { ref } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  placement: { type: String, default: "top" },
  disabled: { type: Boolean, default: false }
});

const show = ref(false);

const placements = {
  top: "left-1/2 -translate-x-1/2 bottom-full mb-2",
  bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
  right: "top-1/2 left-full ml-2 -translate-y-1/2",
  left: "top-1/2 right-full mr-2 -translate-y-1/2",
  "top-right": "left-1/2 bottom-full mb-2",
  "top-left": "right-1/2 bottom-full mb-2",
  "bottom-right": "left-1/2 top-full mt-2",
  "bottom-left": "right-1/2 top-full mt-2"
};
</script>

<template>
  <div
    class="relative inline-block"
    @mouseenter="!disabled && (show = true)"
    @mouseleave="!disabled && (show = false)"
    @focus="!disabled && (show = true)"
    @blur="!disabled && (show = false)"
    @focusin="show = true"
    @focusout="show = false"
    tabindex="0"
  >
    <slot />
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <span
        v-if="show"
        :class="[
          'absolute z-50 bg-gray-900 text-white text-xs rounded px-2 py-1 shadow whitespace-nowrap pointer-events-none',
          placements[props.placement] || placements.top
        ]"
      >
        {{ text }}
      </span>
    </Transition>
  </div>
</template>
