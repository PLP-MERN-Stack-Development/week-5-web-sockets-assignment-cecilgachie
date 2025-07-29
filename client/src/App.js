import React, { useState, useEffect } from 'react';
import { useSocket } from './socket/socket';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Notification from './components/Notification';

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { isConnected, connect, disconnect } = useSocket();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      connect(userData.username);
    }
  }, [connect]);

  const handleLogin = (username) => {
    const userData = {
      id: Date.now().toString(),
      username,
      avatar: username.charAt(0).toUpperCase()
    };
    
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
    connect(username);
    
    addNotification('Successfully connected to chat!', 'success');
  };

  const handleLogout = () => {
    disconnect();
    setUser(null);
    localStorage.removeItem('chatUser');
    addNotification('Disconnected from chat', 'info');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="app">
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Chat 
          user={user} 
          onLogout={handleLogout}
          onNotification={addNotification}
        />
      )}
      
      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
}

export default App; 