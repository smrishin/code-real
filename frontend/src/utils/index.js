"use strict";

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

export { openLink, scrollToElement };
