import React, { useState } from 'react';
import useChat from './useChat';
import AutoResizingTextarea from '../AutoResizingTextarea';
import ChatText from './Text';

const generationConfig = {
  temperature: 0.8,
  top_k: 10
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [chats, setChats] = useState([]);

  const [generate, { data: text, error, loading, clear, stop }] = useChat();
  console.log('CHATS', chats);
  console.log('Text: ', text);

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
              {/* <div id="chats">{data && <ChatText>{data}</ChatText>}</div> */}
              <div id="chats">
                {chats.map((chat, i) => (
                  <div key={i}>
                    <p className="chat-prompt">{chat.prompt}</p>
                    <ChatText className="chat-text">{chat.text}</ChatText>
                  </div>
                ))}
                {currentPrompt && (
                  <div key={chats.length - 1}>
                    <p className="chat-prompt">{currentPrompt}</p>
                    <ChatText className="chat-text">{text}</ChatText>
                  </div>
                )}
              </div>

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
              onClick={() => {
                clear();
                setChats([]);
                setPrompt('');
                setCurrentPrompt('');
              }}
            >
              Clear
            </button>
            {!loading ? (
              <button
                className="submit"
                onClick={() => {
                  setCurrentPrompt(prompt);
                  // Remove chats with empty text
                  setChats((prev) => prev.filter((chat) => chat.text));
                  if (text) {
                    setChats((prev) => [
                      ...prev,
                      { prompt: currentPrompt, text }
                    ]);
                  }
                  setTimeout(() => {
                    generate(prompt, generationConfig);
                    setPrompt('');
                  }, 0);
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
