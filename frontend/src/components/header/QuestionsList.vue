<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useQuestionStore } from "@stores/question";

const questionStore = useQuestionStore();

const buttonHeight = ref("40px");

const updateButtonStyle = () => {
  if (window.innerWidth < 768) {
    const scrollY = window.scrollY;
    const maxScroll = 50;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    const heightDiff = 16;
    const currentHeight = 40 - scrollProgress * heightDiff;

    buttonHeight.value = `${currentHeight}px`;
  } else {
    buttonHeight.value = "40px";
  }
};

onMounted(() => {
  updateButtonStyle();
  window.addEventListener("scroll", updateButtonStyle);
  window.addEventListener("resize", updateButtonStyle);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateButtonStyle);
  window.removeEventListener("resize", updateButtonStyle);
});
</script>

<template>
  <div v-if="questionStore.questions.length > 0" class="flex gap-4">
    <button
      v-for="(question, index) in questionStore.questions"
      :key="index"
      :style="{ height: buttonHeight }"
      :class="[
        'text-center text-xs md:text-sm transition-all duration-200 ease-out px-8 rounded-lg font-semibold',
        questionStore.currentQuestionIndex === index
          ? 'bg-blue-800 text-white'
          : 'bg-blue-900 hover:bg-blue-700 text-gray-200'
      ]"
      @click="questionStore.setCurrentQuestionIndex(index)"
    >
      Q{{ index + 1 }}
    </button>
  </div>
</template>
