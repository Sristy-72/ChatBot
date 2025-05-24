// // src/Component/ChatSection.js
// import React, { useState } from 'react';
// import './ChatSection.css';

// function ChatSection({ selectedMessage, messages, onSend }) {
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput('');
//   };

//   return (
//     <div className="chat-section">
//       {selectedMessage ? (
//         <div className="chat-header">
//           <strong>Chat with {selectedMessage.name}</strong>
//         </div>
//       ) : (
//         <div className="chat-header">Select a conversation to start chatting</div>
//       )}

//       <div className="chat-messages">
//         {messages.map((msg, i) => (
//           <div key={i} className={`chat-message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Ask a question..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }


// export default ChatSection;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatSection.css';

function ChatSection({ selectedMessage }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Reset messages when new user is selected
    setChatMessages([]);
  }, [selectedMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChatMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Error fetching response.' },
      ]);
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-header">
        {selectedMessage ? (
          <strong>Chat with {selectedMessage.name}</strong>
        ) : (
          'Select a conversation to start chatting'
        )}
      </div>

      <div className="chat-messages">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatSection;

