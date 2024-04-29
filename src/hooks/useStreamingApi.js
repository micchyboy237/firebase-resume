import { useState, useRef } from 'react';

const useStreamingApi = (url) => {
  const [responseChunks, setResponseChunks] = useState([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null); // Reference to the AbortController
  const [streamingActive, setStreamingActive] = useState(true); // Control variable for streaming loop

  const run = async (requestData) => {
    setLoading(true);
    setResponseChunks([]);
    controllerRef.current = new AbortController(); // Create a new AbortController
    const { signal } = controllerRef.current;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Transfer-Encoding': 'chunked'
        },
        body: JSON.stringify(requestData),
        signal // Pass the signal to the fetch request
      });

      const reader = response.body.getReader();

      let chunks = [];

      while (streamingActive) {
        const { done, value } = await reader.read({ signal }); // Pass the signal to reader.read()

        if (done) {
          console.log('Stream complete');
          break;
        }

        const chunkText = new TextDecoder().decode(value);
        const chunkObj = JSON.parse(chunkText);

        chunks.push(chunkObj);

        // Update state with the current chunks
        setResponseChunks((prevChunks) => [...prevChunks, chunkObj]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const stop = () => {
    console.log('Stopping stream...');
    setStreamingActive(false); // Update the control variable to stop the streaming loop
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort the fetch request if it's ongoing
    }
  };

  const clear = () => {
    stop();
    setResponseChunks([]);
  };

  const decoded_data = responseChunks.map((chunk) => chunk.response).join('');
  console.log('decoded_data\n', decoded_data);

  return {
    run,
    stop,
    clear,
    loading,
    data: decoded_data,
    rawData: responseChunks
  };
};

export default useStreamingApi;
