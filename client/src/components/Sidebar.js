import React from 'react';

const Sidebar = ({ 
  user, 
  users, 
  currentRoom, 
  onRoomChange, 
  onPrivateChat, 
  onLogout,
  isConnected,
  privateChats,
  selectedPrivateChat
}) => {
  const rooms = ['general', 'random', 'help', 'off-topic'];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Chat App</h2>
        <div className="user-info">
          <div className="user-avatar">
            {user.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{user.username}</div>
            <div className="user-status">
              <div className={`status-indicator ${isConnected ? '' : 'offline'}`}></div>
              {isConnected ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Logout
        </button>
      </div>

      <div className="rooms-section">
        <h3>Rooms</h3>
        <ul className="room-list">
          {rooms.map(room => (
            <li 
              key={room}
              className={`room-item ${currentRoom === room ? 'active' : ''}`}
              onClick={() => onRoomChange(room)}
            >
              <span className="room-icon">#</span>
              {room}
            </li>
          ))}
        </ul>

        {privateChats.length > 0 && (
          <>
            <h3>Private Chats</h3>
            <ul className="room-list">
              {privateChats.map(chatUser => (
                <li 
                  key={chatUser}
                  className={`room-item ${selectedPrivateChat === chatUser ? 'active' : ''}`}
                  onClick={() => onPrivateChat(chatUser)}
                >
                  <span className="room-icon">👤</span>
                  {chatUser}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="users-section">
        <h3>Online Users ({users.length})</h3>
        <ul className="user-list">
          {users.map(userItem => (
            <li 
              key={userItem.id || userItem.username}
              className="user-item"
              onClick={() => onPrivateChat(userItem.username)}
              style={{ cursor: 'pointer' }}
            >
              <div className="status-indicator"></div>
              <div className="user-avatar" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                {userItem.username.charAt(0).toUpperCase()}
              </div>
              {userItem.username}
              {userItem.username === user.username && ' (You)'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 