import React, { useState } from 'react';
import useChat from './useChat';
import AutoResizingTextarea from '../AutoResizingTextarea';
import ChatText from './Text';

const generationConfig = {
  top_k: 10,
  temperature: 0.8
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const [generate, { data, error, loading, clear, stop }] = useChat();

  return (
    <div id="chatbot">
      <div className="bg-white border rounded shadow-lg">
        <div className="p-4">
          <div className="mb-3">
            {/* <AutoResizingTextarea
              className="prompt-textarea"
              placeholder="Summarize your skills and experience."
              value={prompt}
              onChangeValue={setPrompt}
            /> */}
            <div id="chatbox">
              <div id="chats">{data && <ChatText>{data}</ChatText>}</div>

              <input
                required
                type="text"
                placeholder="Ask me anything!"
                defaultValue=""
                value={prompt}
                id="chatbar"
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* {error && <p className="text-red-500">{JSON.stringify(error)}</p>} */}
          </div>

          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <button
              className="clear"
              disabled={loading}
              onClick={() => clear()}
            >
              Clear
            </button>
            {!loading ? (
              <button
                className="submit"
                onClick={() => {
                  generate(prompt, generationConfig);
                  setPrompt('');
                }}
              >
                Send
              </button>
            ) : (
              <button className="stop" onClick={() => stop()}>
                Stop
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
