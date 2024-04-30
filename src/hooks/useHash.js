import { useState, useEffect } from 'react';

const useHash = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const setUrlHash = (newHash) => {
    window.location.hash = newHash;
  };

  const deleteUrlHash = () => {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    );
    setHash('');
  };

  return { hash, setUrlHash, deleteUrlHash };
};

export default useHash;
