// DOM Manipulation Utilities
export const createElement = (tag, classes, text) => {
  const el = document.createElement(tag);
  if (classes) el.className = classes;
  if (text) el.textContent = text;
  return el;
};

export const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

export const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};