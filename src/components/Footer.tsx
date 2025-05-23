import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center text-gray-600">
      <p className="flex items-center justify-center gap-1">
        Made with <Heart size={16} className="text-red-500 animate-pulse" /> by{' '}
        <a 
          href="https://github.com/subham" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium hover:text-blue-500 transition-colors duration-300"
        >
          Subham Bhattacharya
        </a>
      </p>
    </footer>
  );
};

export default Footer;