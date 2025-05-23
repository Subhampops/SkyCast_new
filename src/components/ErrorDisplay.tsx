import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center">
      <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;