import useTextStream from '../../hooks/useTextStream';
import { API_URL_MODELS_GENERATE } from '../../source/apis';
import { generateUrl } from './helpers';

const StreamStatus = {
  pending: 'pending',
  loading: 'loading',
  done: 'done',
  stopped: 'stopped',
  error: 'error'
};

const useChat = () => {
  const { run, ...streamState } = useTextStream();

  const generate = (prompt, generationConfig) => {
    const body = {
      prompt,
      ...(generationConfig || {})
    };

    if (streamState.status !== StreamStatus.loading) {
      run(API_URL_MODELS_GENERATE, body);
    }
  };

  return [generate, streamState];
};

export default useChat;
