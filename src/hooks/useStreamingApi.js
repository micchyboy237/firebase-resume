import { useState } from 'react';

const useStreamingApi = (url) => {
  const [responseChunks, setResponseChunks] = useState([]);
  const [loading, setLoading] = useState(false);

  const run = async (requestData) => {
    setLoading(true);
    setResponseChunks([]);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Transfer-Encoding': 'chunked'
        },
        body: JSON.stringify(requestData)
      });

      const reader = response.body.getReader();

      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();

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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const decoded_data = responseChunks.map((chunk) => chunk.response).join('');
  console.log('decoded_data\n', decoded_data);

  return {
    run,
    loading,
    data: decoded_data,
    rawData: responseChunks
  };
};

export default useStreamingApi;
