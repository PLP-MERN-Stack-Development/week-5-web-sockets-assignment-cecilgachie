import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      onLogin(username.trim());
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome to Chat App</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="auth-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
            autoFocus
          />
          <button 
            type="submit" 
            className="auth-button"
            disabled={isSubmitting || !username.trim()}
          >
            {isSubmitting ? 'Connecting...' : 'Join Chat'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth; 