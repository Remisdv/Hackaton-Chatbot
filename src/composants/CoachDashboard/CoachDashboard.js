import React, { useState } from 'react';
import './CoachDashboard.css';

const CoachDashboard = () => {
  // État pour les disponibilités des coachs
  const [availability, setAvailability] = useState([
    '2024-07-05T10:00:00',
    '2024-07-05T11:00:00',
    '2024-07-05T12:00:00',
  ]);

  // État pour les chats actifs avec les utilisateurs
  const [activeChats, setActiveChats] = useState([
    { id: 1, user: 'User A', messages: [{ text: "Bonjour, j'ai une question.", isUser: true }] },
    { id: 2, user: 'User B', messages: [{ text: "Pouvez-vous m'aider avec quelque chose ?", isUser: true }] },
  ]);

  // État pour les chats actifs avec l'IA
  const [activeIAChats, setActiveIAChats] = useState([
    { id: 1, user: 'User C', messages: [{ text: "Comment fonctionne l'IA ?", isUser: true }] },
  ]);

  // État pour la nouvelle disponibilité à ajouter
  const [newAvailability, setNewAvailability] = useState('');

  // Fonction pour ajouter une nouvelle disponibilité
  const addAvailability = () => {
    if (newAvailability) {
      // TODO: Envoyer cette nouvelle disponibilité au backend
      setAvailability([...availability, newAvailability]);
      setNewAvailability('');
    }
  };

  // Fonction pour gérer l'envoi des messages dans les chats utilisateurs
  const handleChatSubmit = (chatId, message) => {
    setActiveChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { text: message, isUser: false }] }
          : chat
      )
    );
    // TODO: Envoyer ce message au backend pour le chat spécifique
  };

  // Fonction pour gérer l'envoi des messages dans les chats IA
  const handleIASubmit = (chatId, message) => {
    setActiveIAChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { text: message, isUser: false }] }
          : chat
      )
    );
    // TODO: Envoyer ce message au backend pour le chat spécifique
  };

  return (
    <div className="CoachDashboard">
      <h2>Tableau de Bord du Coach</h2>
      <div className="availability">
        <h3>Disponibilités</h3>
        <ul>
          {availability.map((slot, index) => (
            <li key={index}>{new Date(slot).toLocaleString()}</li>
          ))}
        </ul>
        <input
          type="datetime-local"
          value={newAvailability}
          onChange={(e) => setNewAvailability(e.target.value)}
        />
        <button onClick={addAvailability}>Ajouter Disponibilité</button>
      </div>
      <div className="chats-container">
        <div className="chats-column active-chats">
          <h3>Chats Utilisateurs en Cours</h3>
          {activeChats.map(chat => (
            <div key={chat.id} className="chat">
              <h4>Chat avec {chat.user}</h4>
              <div className="messages">
                {chat.messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.isUser ? 'user' : 'coach'}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.elements.message.value;
                  handleChatSubmit(chat.id, message);
                  e.target.reset();
                }}
              >
                <input type="text" name="message" placeholder="Entrez votre message..." />
                <button type="submit">Envoyer</button>
              </form>
            </div>
          ))}
        </div>
        <div className="chats-column active-ia-chats">
          <h3>Chats IA en Cours</h3>
          {activeIAChats.map(chat => (
            <div key={chat.id} className="chat">
              <h4>Chat avec {chat.user}</h4>
              <div className="messages">
                {chat.messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.isUser ? 'user' : 'coach'}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const message = e.target.elements.message.value;
                  handleIASubmit(chat.id, message);
                  e.target.reset();
                }}
              >
                <input type="text" name="message" placeholder="Entrez votre message..." />
                <button type="submit">Envoyer</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
