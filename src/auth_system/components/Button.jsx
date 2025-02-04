import React from 'react';

const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        disabled
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-highlight hover:bg-highlightHover text-white'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
