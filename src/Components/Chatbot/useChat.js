import React from 'react';
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

const useChat = ({ onDone, ...options } = {}) => {
  const promptRef = React.useRef('');
  const { run, ...streamState } = useTextStream({
    onDone: (text, status) => {
      onDone?.({
        prompt: promptRef.current,
        text,
        status
      });
    },
    ...options
  });

  const generate = (prompt, generationConfig) => {
    promptRef.current = prompt;
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
