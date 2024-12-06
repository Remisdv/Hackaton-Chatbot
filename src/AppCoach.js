import React from 'react';
import './App.css';
import CoachDashboard from './composants/CoachDashboard/CoachDashboard';

const AppCoach = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tableau de Bord du Coach</h1>
      </header>
      <div className="App-content">
        <CoachDashboard />
      </div>
    </div>
  );
};

export default AppCoach;
