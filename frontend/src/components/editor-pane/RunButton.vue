<script setup>
import { ref } from "vue";
import { PlayIcon, ClipboardDocumentIcon } from "@heroicons/vue/24/outline";
import leetcodeLogo from "@logos/leetcode.png";
import { openLink } from "@utils";

const props = defineProps({
  leetcodeLink: {
    type: String,
    default: ""
  },
  code: {
    type: String,
    default: ""
  }
});

const showToast = ref(false);

const handleLeetCodeClick = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3 * 1000);
    openLink(props.leetcodeLink);
  } catch (err) {
    console.error("Failed to copy code to clipboard:", err);
    // Still open LeetCode even if copy fails
    openLink(props.leetcodeLink);
  }
};
</script>
<template>
  <div v-if="leetcodeLink" class="text-sm">
    <!-- Desktop Toast -->
    <div class="hidden md:block">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-2 opacity-0"
      >
        <div
          v-if="showToast"
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-md whitespace-nowrap"
        >
          <ClipboardDocumentIcon class="w-5 h-5" />
          Code Copied!
        </div>
      </Transition>
    </div>
    <!-- Mobile Toast -->
    <div class="md:hidden">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-2 opacity-0"
      >
        <div
          v-if="showToast"
          class="fixed z-50 right-4 top-32 flex items-center gap-2 px-4 py-2 bg-green-500 bg-opacity-50 text-white rounded-lg whitespace-nowrap shadow-xl font-semibold text-sm transition-all duration-300 ease-in-out"
        >
          <ClipboardDocumentIcon class="w-5 h-5" />
          Code Copied!
        </div>
      </Transition>
    </div>

    <!-- Run Button -->
    <button
      @click="handleLeetCodeClick"
      class="flex items-center gap-2 px-3 py-1 text-amber-500 hover:bg-amber-500/10 backdrop-blur-sm backdrop-brightness-80 rounded-md"
    >
      <PlayIcon class="w-4 h-4" />
      Run
      <img
        :src="leetcodeLogo"
        alt="LeetCode"
        class="w-4 h-4 rounded-full mr-1"
      />
    </button>
  </div>
</template>
