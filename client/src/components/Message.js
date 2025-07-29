import React from 'react';

const Message = ({ message, currentUser, formatTime, readReceipts }) => {
  const isSentByMe = message.sender === currentUser;
  const isSystemMessage = message.system;
  
  const getMessageClass = () => {
    if (isSystemMessage) return 'message system';
    return isSentByMe ? 'message sent' : 'message received';
  };

  const getReadReceipt = () => {
    if (!isSentByMe || !message.id) return null;
    
    const isRead = readReceipts[message.id];
    return (
      <div className="read-receipt">
        {isRead ? '✓ Read' : '✓ Delivered'}
      </div>
    );
  };

  if (isSystemMessage) {
    return (
      <div className={getMessageClass()}>
        <div className="message-content">
          {message.message}
        </div>
      </div>
    );
  }

  return (
    <div className={getMessageClass()}>
      <div className="message-info">
        {!isSentByMe && (
          <span style={{ fontWeight: 'bold', color: '#667eea' }}>
            {message.sender}
          </span>
        )}
        <span className="message-time">
          {formatTime(message.timestamp)}
        </span>
      </div>
      
      <div className="message-content">
        {message.message}
      </div>
      
      {getReadReceipt()}
    </div>
  );
};

export default Message; 