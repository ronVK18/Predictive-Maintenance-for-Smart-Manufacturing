import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Temp = () => {
  // State for messages and loading status
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending messages to backend
  const handleSendMessage = async (message) => {
    // Add user message to chat
    const userMessage = { text: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send query to backend API
      const response = await axios.post('http://localhost:3000/api/chat/query', {
        query: message,
      });

      // Add bot response to chat
      const botMessage = {
        text: response.data.answer,
        isUser: false,
        sources: response.data.sources,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Add error message if request fails
      const errorMessage = {
        text: 'Sorry, there was an error processing your request.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Chat message component (previously separate)
  const ChatMessage = ({ message, isUser }) => {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          <p>{message.text}</p>
          {!isUser && message.sources && (
            <div className="text-xs mt-1 text-gray-500">
              Sources: {message.sources.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Chat input component (previously separate)
  const ChatInput = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        handleSendMessage(message);
        setMessage('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="flex gap-2 text-black">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about machines..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Machine Maintenance Assistant</h1>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Ask me anything about your machines, their status, or maintenance records
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isUser={message.isUser}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="mt-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Temp;