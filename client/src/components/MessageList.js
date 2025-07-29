import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUser, typingUsers, readReceipts, messagesEndRef }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTypingText = () => {
    if (typingUsers.length === 0) return null;
    
    const typingUsersFiltered = typingUsers.filter(user => user !== currentUser);
    
    if (typingUsersFiltered.length === 0) return null;
    
    if (typingUsersFiltered.length === 1) {
      return `${typingUsersFiltered[0]} is typing...`;
    } else if (typingUsersFiltered.length === 2) {
      return `${typingUsersFiltered[0]} and ${typingUsersFiltered[1]} are typing...`;
    } else {
      return 'Several people are typing...';
    }
  };

  return (
    <div className="messages-container">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          currentUser={currentUser}
          formatTime={formatTime}
          readReceipts={readReceipts}
        />
      ))}
      
      {getTypingText() && (
        <div className="typing-indicator">
          {getTypingText()}
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 