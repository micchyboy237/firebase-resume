export const waitForElement = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
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
      console.debug('Element is ready');

      elm.scrollIntoView({ behavior: 'instant' });
    });
  }
};
