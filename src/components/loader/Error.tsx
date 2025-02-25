import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 text-red-800 bg-red-100 rounded-lg border border-red-300">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-red-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01M21 12c0 5.523-4.478 10-10 10S1 17.523 1 12 5.478 2 12 2s10 4.478 10 10z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
