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
      <div
        className="bg-white border rounded shadow-lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '10px',
          //   border: '1px solid #e0e0e0',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* <AutoResizingTextarea
              className="prompt-textarea"
              placeholder="Summarize your skills and experience."
              value={prompt}
              onChangeValue={setPrompt}
            /> */}
        <div id="chatbox">
          <div id="chatbox_header">
            <p
              style={{
                marginBottom: 0
              }}
            >
              Chatbot
            </p>
          </div>
          <div id="chatbox_body">
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

          <div id="chatbox_footer">
            <input
              required
              type="text"
              placeholder="Ask me anything!"
              defaultValue=""
              value={prompt}
              id="chatbar"
              onChange={(e) => setPrompt(e.target.value)}
              //   Send with Enter
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
                }
              }}
            />

            <div
              style={{
                // position: 'absolute',
                // right: 12,
                // top: 8,
                // bottom: 8,
                display: 'flex',
                alignItems: 'center'
              }}
            >
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
                  <i className="fa fa-envelope"></i>
                </button>
              ) : (
                <button className="stop" onClick={() => stop()}>
                  <i className="fa fa-phone"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* <div
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
        </div> */}
      </div>
    </div>
  );
};

export default Chatbot;
