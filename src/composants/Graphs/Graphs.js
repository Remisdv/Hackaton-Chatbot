import React from 'react';
import './Graphs.css';

const Graphs = () => {
  const sessionData = [
    { session: 'Session 1', date: '2024-07-01T17:00:00', successRate: 75 },
    { session: 'Session 2', date: '2024-07-02T18:00:00', successRate: 82 },
    { session: 'Session 3', date: '2024-07-03T17:00:00', successRate: 68 },
    { session: 'Session 4', date: '2024-07-04T17:00:00', successRate: 90 },
    { session: 'Session 5', date: '2024-07-05T17:00:00', successRate: 74 },
    { session: 'Session 6', date: '2024-07-06T17:00:00', successRate: 88 },
    { session: 'Session 7', date: '2024-07-07T17:00:00', successRate: 95 },
    { session: 'Session 8', date: '2024-07-08T17:00:00', successRate: 85 },
    { session: 'Session 9', date: '2024-07-09T17:00:00', successRate: 77 },
    { session: 'Session 10', date: '2024-07-10T17:00:00', successRate: 92 },
  ];

  const monthData = [
    { month: 'Janvier', successRate: 75 },
    { month: 'Février', successRate: 82 },
    { month: 'Mars', successRate: 68 },
    { month: 'Avril', successRate: 90 },
    { month: 'Mai', successRate: 74 },
    { month: 'Juin', successRate: 88 },
    { month: 'Juillet', successRate: 95 },
  ];

  const generatePath = (data, width, height) => {
    const maxRate = 100;
    const step = width / (data.length - 1);
    const points = data.map((item, index) => `${index * step},${height - (item.successRate / maxRate) * height}`).join(' ');

    return points;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="graphs">
      <h3>Graphique de Progression</h3>
      <div className="graph">
        <h4>Pourcentage de Réussite par Session</h4>
        <div className="svg-container">
          <svg viewBox="0 0 700 400" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#007bff"
              strokeWidth="2"
              points={generatePath(sessionData, 700, 400)}
            />
          </svg>
        </div>
        <div className="graph-labels">
          {sessionData.map((item, index) => (
            <div key={index} className="label">
              <span>{formatDate(item.date)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="graph">
        <h4>Pourcentage de Réussite par Mois</h4>
        <div className="svg-container">
          <svg viewBox="0 0 700 400" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#007bff"
              strokeWidth="2"
              points={generatePath(monthData, 700, 400)}
            />
          </svg>
        </div>
        <div className="graph-labels">
          {monthData.map((item, index) => (
            <div key={index} className="label">
              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graphs;
