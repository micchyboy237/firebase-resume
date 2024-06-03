import React, { useEffect, useRef } from 'react';
import firebaseAnalytics from '../firebaseAnalytics';
import useDOMLoaded from '../hooks/useDOMLoaded';
import useIsInViewport from '../hooks/useIsInViewport';

const withAnalytics = (WrappedComponent, eventName) => {
  const EnhancedComponent = (props) => {
    const containerRef = useRef(null);

    const { loaded, element } = useDOMLoaded('*', containerRef.current);
    const isInViewport = useIsInViewport(element);

    useEffect(() => {
      setTimeout(() => {
        if (loaded && isInViewport) {
          if (eventName) {
            firebaseAnalytics.logView(eventName);
          }
        }
      }, 400);
    }, [isInViewport]);

    return (
      <div ref={containerRef}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return EnhancedComponent;
};

export default withAnalytics;
