import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  // Modal states
  const isSettingsOpen = ref(false);
  const isContactOpen = ref(false);
  const isErrorOpen = ref(false);
  const isPromptSecretCodeOpen = ref(false);
  const isConfirmRestartOpen = ref(false);
  const isTimeUpOpen = ref(false);
  const isDesktopRecommendationOpen = ref(false);

  // Actions
  const openSettings = () => {
    isSettingsOpen.value = true;
  };

  const closeSettings = () => {
    isSettingsOpen.value = false;
  };

  const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
  };

  const openContact = () => {
    isContactOpen.value = true;
  };

  const closeContact = () => {
    isContactOpen.value = false;
  };

  const toggleContact = () => {
    isContactOpen.value = !isContactOpen.value;
  };

  const openError = () => {
    isErrorOpen.value = true;
  };

  const closeError = () => {
    isErrorOpen.value = false;
  };

  const openPromptSecretCode = () => {
    isPromptSecretCodeOpen.value = true;
  };

  const closePromptSecretCode = () => {
    isPromptSecretCodeOpen.value = false;
  };

  const openConfirmRestart = () => {
    isConfirmRestartOpen.value = true;
  };

  const closeConfirmRestart = () => {
    isConfirmRestartOpen.value = false;
  };

  const openTimeUp = () => {
    isTimeUpOpen.value = true;
  };

  const closeTimeUp = () => {
    isTimeUpOpen.value = false;
  };

  const openDesktopRecommendation = () => {
    isDesktopRecommendationOpen.value = true;
  };

  const closeDesktopRecommendation = () => {
    isDesktopRecommendationOpen.value = false;
  };

  // Close all modals
  const closeAllModals = () => {
    isSettingsOpen.value = false;
    isContactOpen.value = false;
    isErrorOpen.value = false;
    isPromptSecretCodeOpen.value = false;
    isConfirmRestartOpen.value = false;
    isTimeUpOpen.value = false;
    isDesktopRecommendationOpen.value = false;
  };

  return {
    // State
    isSettingsOpen,
    isContactOpen,
    isErrorOpen,
    isPromptSecretCodeOpen,
    isConfirmRestartOpen,
    isTimeUpOpen,
    isDesktopRecommendationOpen,
    // Actions
    openSettings,
    closeSettings,
    toggleSettings,
    openContact,
    closeContact,
    toggleContact,
    openError,
    closeError,
    openPromptSecretCode,
    closePromptSecretCode,
    openConfirmRestart,
    closeConfirmRestart,
    openTimeUp,
    closeTimeUp,
    openDesktopRecommendation,
    closeDesktopRecommendation,

    closeAllModals
  };
});
