import React, { useEffect, useRef } from 'react';
import useDOMLoaded from '../hooks/useDOMLoaded';
import useIsInViewport from '../hooks/useIsInViewport';
import firebaseAnalytics from '../firebaseAnalytics';

const withAnalytics = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const containerRef = useRef(null);
    const hasSentAnalyticsRef = useRef(false);

    const { loaded, element } = useDOMLoaded('*', containerRef.current);
    const isInViewport = useIsInViewport(element);

    useEffect(() => {
      setTimeout(() => {
        if (!hasSentAnalyticsRef.current && loaded && isInViewport) {
          hasSentAnalyticsRef.current = true;

          const path = window.location.href.substring(
            window.location.origin.length
          );

          firebaseAnalytics.logView(path, 'View Section');
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
