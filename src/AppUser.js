import React, { useState, useEffect } from 'react';
import './App.css';
import Chat_user from './composants/Chat_user/Chat_user';
import Agenda from './composants/Agenda/Agenda';
import Graphs from './composants/Graphs/Graphs';

const AppUser = () => {
  const [useCoach, setUseCoach] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);

  useEffect(() => {
    setUpcomingSessions([
      { id: 1, coach: 'Coach A', time: '2024-07-05T17:00:00' },
      { id: 2, coach: 'Coach B', time: '2024-07-06T18:00:00' },
      { id: 3, coach: 'Coach C', time: '2024-07-03T17:00:00' },
    ]);

    setAvailableSlots([
      '2024-03-05T10:00:00',
      '2024-07-05T10:00:00',
      '2024-07-05T11:00:00',
      '2024-07-05T12:00:00',
      '2024-07-05T13:00:00',
      '2024-07-05T14:00:00',
      '2024-07-05T15:00:00',
      '2024-07-05T16:00:00',
      '2024-07-05T17:00:00',
    ]);
  }, []);

  const handleCheckboxChange = () => {
    setUseCoach(!useCoach);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleFullScreen = () => {
    setIsChatFullScreen(!isChatFullScreen);
  };

  const toggleAgenda = () => {
    setIsAgendaOpen(!isAgendaOpen);
  };

  const handleBookSession = (slot) => {
    setUpcomingSessions([...upcomingSessions, { id: Date.now(), coach: 'Coach A', time: slot }]);
  };

  const handleStartSession = (session) => {
    const sessionTime = new Date(session.time);
    const currentTime = new Date();
    if (sessionTime - currentTime <= 3600000) {
      setIsChatOpen(true);
      setIsChatFullScreen(true);
      setErrorMessage('');
      setUseCoach(true);
    } else {
      setErrorMessage('Il est trop tôt pour démarrer cette session. Veuillez revenir plus tard.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Votre Tableau de Bord</h1>
      </header>
      <div className="App-content">
        <aside className="App-sessions">
          <h2>Sessions de Coaching</h2>
          <button className="button" onClick={toggleAgenda}>Réserver une session</button>
          <ul>
            {upcomingSessions.map(session => (
              <li key={session.id}>
                {session.coach} - {new Date(session.time).toLocaleString()}
                <button className="button" onClick={() => handleStartSession(session)}>Commencer la session</button>
              </li>
            ))}
          </ul>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </aside>
        <section className="App-graphs">
          <h2>Votre Progression</h2>
          <Graphs />
          <button className="button" onClick={toggleChat}>Commencer une session</button>
        </section>
        {isChatOpen && (
          <div className={`chat-container ${isChatFullScreen ? 'full-screen' : ''}`}>
            <header className="chat-header">
              <span>Chat</span>
              <div>
                <button onClick={toggleFullScreen} className="resize-button">
                  {isChatFullScreen ? 'Pleine Écran' : 'Pleine Écran'}
                </button>
                <button onClick={toggleChat} className="close-button">x</button>
              </div>
            </header>
            <main className="chat-main">
              <Chat_user />
            </main>
          </div>
        )}
        {!isChatOpen && (
          <button onClick={toggleChat} className="open-button">Chat</button>
        )}
        {isAgendaOpen && (
          <Agenda slots={availableSlots} onBookSession={handleBookSession} onClose={toggleAgenda} />
        )}
      </div>
    </div>
  );
};

export default AppUser;
