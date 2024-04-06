import React from 'react';
import useChat from './useChat';
import AutoResizingTextarea from '../AutoResizingTextarea';

const model = 'dost-asti-gpt2';
const checkpoint = 'base_model';
const generationConfig = {
  max_length: 512,
  top_k: 5,
  top_p: 0.92,
  no_repeat_ngram_size: 0
};

const Chatbot = () => {
  const [prompt, setPrompt] = React.useState('');

  const [generate, { data, error, loading, clear, stop }] = useChat(model, {
    checkpoint
  });

  const renderNestedValue = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="nested-object">
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className="flex items-center">
              <div className="w-32 font-bold">{nestedKey}</div>
              <div className="flex-1">
                {renderNestedValue(nestedKey, nestedValue)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return value;
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="prompt-textarea" className="block w-full text-gray-600">
          Prompt
        </label>
        {/* <textarea
              id='prompt-textarea'
              className='px-4 py-2 border rounded w-full'
              placeholder='Prompt'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            /> */}
        <AutoResizingTextarea
          id="prompt-textarea"
          className="px-4 py-2 border rounded w-full"
          placeholder="Prompt"
          value={prompt}
          onChangeValue={setPrompt}
        />
        {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
      </div>

      <div className="flex items-center">
        {!loading && (
          <button
            disabled={loading}
            className="px-4 py-2 border rounded bg-blue-500 text-white"
            onClick={() => generate(prompt, generationConfig)}
          >
            {!loading && !data ? 'Generate' : 'Re-generate'}
          </button>
        )}

        {!loading && (
          <button
            className="px-4 py-2 border rounded bg-gray-200 border border-gray-400"
            onClick={() => clear()}
          >
            Clear
          </button>
        )}
        {loading && (
          <button
            className="px-4 py-2 border rounded bg-gray-200 border border-gray-400"
            onClick={() => stop()}
          >
            Stop
          </button>
        )}
      </div>

      <div>
        {loading || (data && <p className="mt-4 mb-2 text-sm">Response:</p>)}

        {data && (
          <div className="flex-1">
            {Object.entries(data).map(([key, value]) =>
              renderNestedValue(key, value)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
