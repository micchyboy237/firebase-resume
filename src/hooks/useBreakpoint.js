import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  xs: 0
};

const getWindowWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return 0;
};

const useBreakpoint = (breakpointsToCheck) => {
  const getBreakpoint = () => {
    let breakpoint = {};

    let windowWidth = getWindowWidth();

    for (const key in BREAKPOINTS) {
      if (!breakpointsToCheck?.length || breakpointsToCheck.includes(key)) {
        breakpoint[key] = windowWidth > BREAKPOINTS[key];
      }
    }

    return breakpoint;
  };

  const [breakpoint, setBreakpoint] = useState({
    '2xl': false,
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: false
  });

  useEffect(() => {
    // Initial check on component mount
    const handleResize = () => {
      const breakpoint = getBreakpoint();

      setBreakpoint(breakpoint);
    };

    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
