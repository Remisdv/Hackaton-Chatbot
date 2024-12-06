import React, { useState } from 'react';
import Chat_user from './composants/Chat_user/Chat_user';
import Chat_coach from './composants/Chat_coach/Chat_coach';
import './User.css';

const User = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false },
  ]);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <div className="User">
      <header className="User-header">
        <h1>ChatBot</h1>
        <h2>Mode Manuel</h2>
      </header>
      <main className="User-main">
        <div className="User-chat-container">
          <Chat_user messages={messages} addMessage={addMessage} />
          <Chat_coach messages={messages} addMessage={addMessage} />
        </div>
      </main>
    </div>
  );
};

export default User;
