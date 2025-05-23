import React from 'react';
import { Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-4 mb-2">
      <div className="flex items-center">
        <Cloud size={32} className="text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">SkyCast</h1>
      </div>
    </header>
  );
};

export default Header;