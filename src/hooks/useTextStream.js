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
  let eventSource = useRef(null);

  const fetchEventStream = (url) => {
    setLoading(true);
    setError(null);
    setStatus(StreamStatus.loading);

    eventSource.current = new EventSource(url);

    eventSource.current.onmessage = function (e) {
      const message = e.data;

      if (message?.trim() === 'stop') {
        setLoading(false);
        stopEventStream();
        setStatus(StreamStatus.done);
      } else {
        setData((d) => [...d, message || '\n']);
      }
    };

    eventSource.current.onerror = function (e) {
      if (![StreamStatus.stopped, StreamStatus.done].includes(status)) {
        console.error('EventSource failed:', e);
        setLoading(false);

        console.info('Closing Stream');

        eventSource.current?.close();

        setError(new Error('Stream ended unexpectedly.'));
        setStatus(StreamStatus.error);
      }
    };
  };

  const stopEventStream = () => {
    setLoading(false);

    if (eventSource.current) {
      console.info('Closing Stream');

      eventSource.current.close();
      setStatus(StreamStatus.stopped);
    }
  };

  const runEventStream = (url) => {
    clearData();

    fetchEventStream(url);
  };

  const clearData = () => {
    stopEventStream();
    setLoading(false);
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
