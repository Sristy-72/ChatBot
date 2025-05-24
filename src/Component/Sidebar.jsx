import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const messages = [
  {
    id: 1,
    name: 'Luis Easton',
    message: 'I bought this product...',
    time: '1m',
    avatar: 'L',
    color: '#c7ccff'
  },
  {
    id: 2,
    name: 'Ivan',
    message: 'Hi there, I have a que...',
    time: '5m',
    badge: '3min',
    badgeColor: '#fcd34d',
    avatar: 'I',
    color: '#f87171'
  },
  {
    id: 3,
    name: 'Francesca',
    message: 'Good morning, let me...',
    time: '9m',
    avatar: 'F',
    color: '#93c5fd'
  },
  {
    id: 4,
    name: 'Nadia',
    message: 'Bug report',
    time: '13m',
    avatarIcon: '🛠️'
  },
  {
    id: 5,
    name: 'Carlos Abu',
    message: 'Hey there, I’m here to...',
    time: '21m',
    avatarIcon: '🔄'
  }
];

// Sidebar.js
function Sidebar({ onSelectMessage }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (msg) => {
    setSelectedId(msg.id);
    onSelectMessage(msg);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h3>Your inbox</h3>
      </div>

      <div className="sidebar-header">
        <div className="dropdowns">
          <span className="dropdown">
            5 Open <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </span>
          <span className="dropdown">
            Newest <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </span>
        </div>
      </div>

      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${selectedId === msg.id ? 'active' : ''}`}
            onClick={() => handleClick(msg)}
          >
            <div className="avatar" style={{ backgroundColor: msg.color }}>
              {msg.avatarIcon || msg.avatar}
            </div>
            <div className="message-info">
              <div className="name">{msg.name}</div>
              <div className="preview">{msg.message}</div>
            </div>
            <div className="meta">
              {msg.badge && (
                <span className="badge" style={{ backgroundColor: msg.badgeColor }}>
                  {msg.badge}
                </span>
              )}
              <div className="time">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
