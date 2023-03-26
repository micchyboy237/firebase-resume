import { useEffect, useState } from 'react';
import { waitForElement } from '../utils';
import useInitialized from './useInitialized';

const useDOMLoaded = (selector, parent) => {
  const initialized = useInitialized();
  const [element, setElement] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (initialized) {
      waitForElement(selector, parent).then((elm) => {
        setElement(elm);
        setLoaded(true);
      });
    }
  }, [initialized]);

  return { loaded, element };
};

export default useDOMLoaded;
