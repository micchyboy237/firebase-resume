import React, { useState, useEffect } from 'react';

const Delay = ({ timeout = 0, children }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const timerId = setTimeout(() => {
      if (isMounted) {
        setShouldRender(true);
      }
    }, timeout);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [timeout]);

  return shouldRender ? <>{children}</> : null;
};

export default Delay;
