import React, { useState, useRef, useEffect } from 'react';
import './Chat_user.css';

const Chat_user = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, isUser: true };
    addMessage(userMessage);
    setInputValue('');
  };

  return (
    <div className="ChatUser">
      <h2>ChatBot - Vous parlez avec notre IA</h2>
      <div className="ChatUser-container">
        <div className="ChatUser-messages">
          {messages.map((message, index) => (
            <div key={index} className={`ChatUser-message ${message.isUser ? 'user' : 'coach'}`}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="ChatUser-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez votre message..."
            className="ChatUser-input"
          />
          <button type="submit" className="ChatUser-submit-button">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat_user;
