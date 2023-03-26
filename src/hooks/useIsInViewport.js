import { useEffect, useMemo, useState } from 'react';

const useIsInViewport = (htmlNode) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting),
        {
          threshold: [0.8] // If 80% of the element is in the screen, we count it!
          // Can change the thresholds based on your needs. The default is 0 - it'll run only when the element first comes into view
        }
      ),
    []
  );

  useEffect(() => {
    if (htmlNode) {
      observer.observe(htmlNode);

      return () => {
        observer.disconnect();
      };
    }
  }, [htmlNode, observer]);

  return isIntersecting;
};

export default useIsInViewport;
