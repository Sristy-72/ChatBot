// App.js
import './App.css';
import Sidebar from './Component/Sidebar';
import CopilotPanel from './Component/Copilot';
import ChatSection from './Component/ChatSection';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatHistories, setChatHistories] = useState({});

  const handleSend = async (text) => {
    if (!selectedMessage) return;

    const userMsg = { sender: 'user', text };
    const userId = selectedMessage.id;

    // Add user message
    setChatHistories((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), userMsg],
    }));

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: text }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMsg = {
        sender: 'bot',
        text: response.data.choices[0].message.content,
      };

      // Add bot response
      setChatHistories((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), userMsg, botMsg],
      }));
    } catch (err) {
      const errorMsg = { sender: 'bot', text: '⚠️ Error fetching response.' };
      setChatHistories((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), userMsg, errorMsg],
      }));
    }
  };

  return (
    <div className="app-container">
      <Sidebar onSelectMessage={setSelectedMessage} />
      <ChatSection
        selectedMessage={selectedMessage}
        messages={
          selectedMessage ? chatHistories[selectedMessage.id] || [] : []
        }
        onSend={handleSend}
      />
      <CopilotPanel />
    </div>
  );
}

export default App;
