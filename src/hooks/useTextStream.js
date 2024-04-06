import { useEffect, useRef, useState } from 'react';

const StreamStatus = {
  pending: 'pending',
  loading: 'loading',
  done: 'done',
  stopped: 'stopped',
  error: 'error'
};

const useTextStream = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(StreamStatus.pending);
  let controller = useRef(null);

  const fetchEventStream = (url, body) => {
    setLoading(true);
    setError(null);
    setStatus(StreamStatus.loading);

    controller.current = new AbortController();
    const signal = controller.current.signal;

    fetch(url, {
      method: 'POST',
      signal: signal,
      headers: {
        'Content-Type': 'application/json' // Set the content type header
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const reader = response.body.getReader();

        const streamReader = () => {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                setStatus(StreamStatus.done);
                setLoading(false);
                return;
              }
              let message = new TextDecoder().decode(value);
              console.log('Message: ', message);
              if (message.startsWith('data:')) {
                message = message.replace(/data:?\s?/, '');
              }

              if (message.trim() === 'stop') {
                setStatus(StreamStatus.done);
                setLoading(false);
                return;
              }
              setData((prevData) => [...prevData, message || '\n']);
              streamReader();
            })
            .catch((error) => {
              console.error('Error reading response body:', error);
              setLoading(false);
              setStatus(StreamStatus.error);
              setError(new Error('Stream ended unexpectedly.'));
            });
        };

        streamReader();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
        setStatus(StreamStatus.error);
        setError(new Error('Failed to fetch data from the server.'));
      });
  };

  const stopEventStream = () => {
    if (controller.current) {
      controller.current.abort();
      setStatus(StreamStatus.stopped);
      setLoading(false);
    }
  };

  const runEventStream = (url, body) => {
    clearData();
    fetchEventStream(url, body);
  };

  const clearData = () => {
    stopEventStream();
    setData([]);
    setStatus(StreamStatus.pending);
    setError(null);
  };

  useEffect(() => {
    return () => {
      stopEventStream();
    };
  }, []);

  return {
    loading,
    data: data.join(''),
    rawData: data,
    error,
    status,
    run: runEventStream,
    stop: stopEventStream,
    clear: clearData
  };
};

export default useTextStream;
