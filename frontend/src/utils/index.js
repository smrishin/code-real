"use strict";

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Mobile detection function
const isMobileDevice = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
};

export { openLink, scrollToElement, isMobileDevice };
