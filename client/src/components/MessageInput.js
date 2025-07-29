import React, { useState, useEffect, useRef } from 'react';

const MessageInput = ({ onSendMessage, onTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleTyping = (value) => {
    setMessage(value);
    
    // Handle typing indicator
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      onTyping(true);
    } else if (isTyping && !value.trim()) {
      setIsTyping(false);
      onTyping(false);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator after 2 seconds of no typing
    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTyping(false);
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim());
    setMessage('');
    
    // Stop typing indicator
    setIsTyping(false);
    onTyping(false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit}>
        <div className="message-input-wrapper">
          <textarea
            className="message-input"
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Connecting..." : "Type a message..."}
            disabled={disabled}
            rows={1}
            style={{
              minHeight: '50px',
              maxHeight: '120px',
              overflowY: 'auto'
            }}
          />
          <button
            type="submit"
            className="send-button"
            disabled={disabled || !message.trim()}
          >
            <span>Send</span>
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput; 