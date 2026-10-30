function AIAssistant() {
    return (
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>AI Assistant</h1>
            <p>Get intelligent insights and recommendations for your startup.</p>
          </div>
        </div>
  
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="ai-icon">🤖</div>
            <div>
              <h2>Startup AI Assistant</h2>
              <p>Ask me anything about your business</p>
            </div>
          </div>
  
          <div className="ai-message">
            <div className="ai-avatar">🤖</div>
            <div className="message-box">
              <strong>AI Assistant</strong>
              <p>
                Hello! I can help you with project planning, customer management,
                financial analysis, risk detection, and business decisions.
              </p>
            </div>
          </div>
  
          <div className="suggestions">
            <button>📊 Analyze Business Performance</button>
            <button>⚠️ Identify Business Risks</button>
            <button>📋 Suggest Project Improvements</button>
            <button>💰 Analyze Financial Performance</button>
          </div>
  
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask your AI assistant..."
            />
            <button>Send ➤</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AIAssistant;