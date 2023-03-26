import { useState } from 'react';

const useLazyFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const callFetch = async (url, options) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      const json = await response.json();

      setData(json);
    } catch (err) {
      console.error(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const initLoaded = !!data;
  const initLoading = !initLoaded && loading;

  return [callFetch, { loading, data, error, initLoading, initLoaded }];
};

export default useLazyFetch;
