import useTextStream from '../../hooks/useTextStream';
import { API_URL_MODELS_GENERATE } from '../../source/apis';
import { generateUrl } from './helpers';
import useStreamingApi from '../../hooks/useStreamingApi';

const StreamStatus = {
  pending: 'pending',
  loading: 'loading',
  done: 'done',
  stopped: 'stopped',
  error: 'error'
};

const useChat = () => {
  const { run, ...streamState } = useStreamingApi(API_URL_MODELS_GENERATE);
  //   const { run, ...streamState } = useTextStream();

  const generate = (prompt, generationConfig) => {
    const body = {
      prompt,
      ...(generationConfig || {})
    };

    run(body);
  };

  return [generate, streamState];
};

export default useChat;
