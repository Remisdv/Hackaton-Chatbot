import React from 'react';
import './Agenda.css';

const Agenda = ({ slots, onBookSession, onClose }) => {
  return (
    <div className="agenda">
      <div className="agenda-header">
        <h2>Réserver une session</h2>
        <button className="close-agenda" onClick={onClose}>×</button>
      </div>
      <ul>
        {slots.map((slot, index) => (
          <li key={index}>
            {new Date(slot).toLocaleString()}
            <button onClick={() => onBookSession(slot)}>Réserver</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agenda;
