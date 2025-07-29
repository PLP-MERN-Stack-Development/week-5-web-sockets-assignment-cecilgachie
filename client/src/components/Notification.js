import React, { useEffect } from 'react';

const Notification = ({ id, message, type, onRemove }) => {
  useEffect(() => {
    // Auto remove after 5 seconds
    const timer = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <button 
        onClick={() => onRemove(id)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification; 