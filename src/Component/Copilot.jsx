import React from 'react';
import './Copilot.css';

function CopilotPanel() {
  return (
    <div className="copilot-panel">
      <div className="copilot-header">
        <div className="tab active">🧠 AI Copilot</div>
        <div className="tab">Details</div>
        <div className="tab-icon">▣</div>
      </div>

      <div className="copilot-body">
        <div className="copilot-center">
          <div className="copilot-icon">‼️</div>
          <div className="copilot-title">Hi, I’m Fin AI Copilot</div>
          <div className="copilot-subtitle">Ask me anything about this conversation.</div>
        </div>
        
      </div>
      <div className="copilot-suggestion">
          <span className="suggested-label">Suggested 🐝</span>
          <span className="suggested-chip">How do I get a refund?</span>
        </div>
        <div className="copilot-input">
          <input type="text" placeholder="Ask a question..." />
          <button>➤</button>
        </div>
    </div>
  );
}

export default CopilotPanel;
