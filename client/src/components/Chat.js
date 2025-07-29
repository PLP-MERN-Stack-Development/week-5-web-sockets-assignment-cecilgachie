import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../socket/socket';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = ({ user, onLogout, onNotification }) => {
  const [currentRoom, setCurrentRoom] = useState('general');
  const [privateChats, setPrivateChats] = useState([]);
  const [selectedPrivateChat, setSelectedPrivateChat] = useState(null);
  const [readReceipts, setReadReceipts] = useState({});
  
  const { 
    isConnected, 
    messages, 
    users, 
    typingUsers,
    sendMessage, 
    sendPrivateMessage,
    setTyping 
  } = useSocket();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mark messages as read when they come into view
    const markAsRead = () => {
      const unreadMessages = messages.filter(msg => 
        !msg.read && msg.sender !== user.username
      );
      
      if (unreadMessages.length > 0) {
        // Emit read receipt for unread messages
        unreadMessages.forEach(msg => {
          // This would be handled by the socket server
          // For now, we'll just mark them locally
          setReadReceipts(prev => ({
            ...prev,
            [msg.id]: true
          }));
        });
      }
    };

    markAsRead();
  }, [messages, user.username]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    const messageData = {
      id: Date.now().toString(),
      message: messageText,
      sender: user.username,
      timestamp: new Date().toISOString(),
      room: currentRoom,
      isPrivate: !!selectedPrivateChat,
      recipient: selectedPrivateChat
    };

    if (selectedPrivateChat) {
      sendPrivateMessage(selectedPrivateChat, messageText);
      onNotification(`Message sent to ${selectedPrivateChat}`, 'success');
    } else {
      sendMessage(messageText);
      onNotification('Message sent', 'success');
    }
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
    setSelectedPrivateChat(null);
    onNotification(`Joined ${room}`, 'info');
  };

  const handlePrivateChat = (targetUser) => {
    if (targetUser === user.username) return;
    
    setSelectedPrivateChat(targetUser);
    setCurrentRoom(null);
    
    // Add to private chats if not already there
    if (!privateChats.includes(targetUser)) {
      setPrivateChats(prev => [...prev, targetUser]);
    }
    
    onNotification(`Started private chat with ${targetUser}`, 'info');
  };

  const handleTyping = (isTyping) => {
    setTyping(isTyping);
  };

  const getCurrentChatTitle = () => {
    if (selectedPrivateChat) {
      return `Private Chat with ${selectedPrivateChat}`;
    }
    return currentRoom ? `#${currentRoom}` : 'Chat';
  };

  const getFilteredMessages = () => {
    if (selectedPrivateChat) {
      return messages.filter(msg => 
        (msg.sender === user.username && msg.recipient === selectedPrivateChat) ||
        (msg.sender === selectedPrivateChat && msg.recipient === user.username)
      );
    }
    return messages.filter(msg => !msg.isPrivate);
  };

  return (
    <div className="container">
      <div className="chat-container">
        <Sidebar
          user={user}
          users={users}
          currentRoom={currentRoom}
          onRoomChange={handleRoomChange}
          onPrivateChat={handlePrivateChat}
          onLogout={onLogout}
          isConnected={isConnected}
          privateChats={privateChats}
          selectedPrivateChat={selectedPrivateChat}
        />
        
        <div className="main-chat">
          <div className="chat-header">
            <h2>{getCurrentChatTitle()}</h2>
            <div className="connection-status">
              <div className={`status-indicator ${isConnected ? '' : 'offline'}`}></div>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          
          <MessageList
            messages={getFilteredMessages()}
            currentUser={user.username}
            typingUsers={typingUsers}
            readReceipts={readReceipts}
            messagesEndRef={messagesEndRef}
          />
          
          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            disabled={!isConnected}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat; 