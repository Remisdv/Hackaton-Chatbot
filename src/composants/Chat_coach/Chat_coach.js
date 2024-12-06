import React, { useState, useRef, useEffect } from 'react';
import './Chat_coach.css';

const Chat_coach = () => {
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
    <div className="ChatCoach">
      <h2>ChatBot - Vous parlez à un coach</h2>
      <div className="ChatCoach-container">
        <div className="ChatCoach-messages">
          {messages.map((message, index) => (
            <div key={index} className={`ChatCoach-message ${message.isUser ? 'user' : 'coach'}`}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="ChatCoach-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez votre message..."
            className="ChatCoach-input"
          />
          <button type="submit" className="ChatCoach-submit-button">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat_coach;
