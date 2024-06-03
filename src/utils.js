export const waitForElement = (elementOrSelector, parent = document) => {
  const getElement = () => {
    if (typeof elementOrSelector === 'string') {
      return parent.querySelector(elementOrSelector);
    }

    return elementOrSelector;
  };

  return new Promise((resolve) => {
    const element = getElement(elementOrSelector);

    if (element) {
      return resolve(element);
    }

    const observer = new MutationObserver((mutations) => {
      const observedElement = getElement(elementOrSelector);

      if (observedElement) {
        resolve(observedElement);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};

export const scrollToHash = () => {
  const hash = window.location.hash;

  if (hash) {
    waitForElement(hash).then((elm) => {
      elm.scrollIntoView({ behavior: 'instant' });
    });
  }
};

export const isVideoFile = (url) => {
  const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv', '.webm'];
  const extension = url.split('.').pop().toLowerCase();
  return videoExtensions.includes(`.${extension}`);
};

/**
 * Converts string to snake case.
 * @param {string} str - The string to convert.
 * @returns {string} The snake cased string.
 */
export const snakeCase = (str) => {
  return str
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim() // Trim leading and trailing whitespace
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert underscore between camelCase words
    .replace(/[\s\-]+/g, '_') // Replace spaces and hyphens with underscores
    .toLowerCase(); // Convert to lowercase
};
