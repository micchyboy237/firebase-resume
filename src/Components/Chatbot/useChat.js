import useTextStream from '../../hooks/useTextStream';
import { API_URL_MODELS_GENERATE } from '../../services/apis';
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
    const params = {
      prompt,
      ...(generationConfig || {})
    };

    const streamUrl = generateUrl({
      origin: API_URL_MODELS_GENERATE,
      params: params
    });

    console.log('streamUrl', streamUrl);

    if (streamState.status !== StreamStatus.loading) {
      run(streamUrl);
    }
  };

  return [generate, streamState];
};

export default useChat;
