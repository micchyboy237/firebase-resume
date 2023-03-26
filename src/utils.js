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
