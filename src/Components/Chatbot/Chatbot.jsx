import React, { useState } from 'react';
import useChat from './useChat';
import AutoResizingTextarea from '../AutoResizingTextarea';

const generationConfig = {
  top_k: 10,
  temperature: 0.8
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const [generate, { data, error, loading, clear, stop }] = useChat();

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
    <>
      {showChatbot && (
        <div
          id="chatbot"
          style={{
            position: 'fixed',
            zIndex: 999,
            bottom: 12,
            right: 12
          }}
        >
          <div className="bg-white border rounded shadow-lg">
            <div className="flex justify-between items-center bg-gray-200 rounded-t p-2">
              <p className="font-semibold">Chatbot</p>
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => setShowChatbot(false)}
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <label
                  htmlFor="prompt-textarea"
                  className="block text-gray-600"
                >
                  Prompt
                </label>
                <AutoResizingTextarea
                  id="prompt-textarea"
                  className="border rounded w-full"
                  placeholder="Prompt"
                  value={prompt}
                  onChangeValue={setPrompt}
                />
                {error && (
                  <p className="text-red-500">{JSON.stringify(error)}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
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
                {loading ||
                  (data && <p className="mt-4 mb-2 text-sm">Response:</p>)}

                {data && (
                  <div className="flex-1">
                    {Object.entries(data).map(([key, value]) =>
                      renderNestedValue(key, value)
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        id="chatbot-toggle"
        style={{
          position: 'fixed',
          zIndex: 999,
          bottom: 100,
          right: 12
        }}
      >
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="cursor-pointer rounded bg-blue-500 hover:bg-blue-700 text-white font-bold"
        >
          Scroll to Top
        </button>
      </div>
    </>
  );
};

export default Chatbot;
