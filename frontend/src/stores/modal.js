import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  // Modal states
  const isSettingsOpen = ref(false);
  const isContactOpen = ref(false);

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

  // Close all modals
  const closeAllModals = () => {
    isSettingsOpen.value = false;
    isContactOpen.value = false;
  };

  return {
    // State
    isSettingsOpen,
    isContactOpen,

    // Actions
    openSettings,
    closeSettings,
    toggleSettings,
    openContact,
    closeContact,
    toggleContact,
    closeAllModals
  };
});
