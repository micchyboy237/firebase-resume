import { useState, useEffect } from 'react';

const useInitialized = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return initialized;
};

export default useInitialized;
