
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 mb-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
        NeonProxy
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
        Access the web anonymously with our lightning-fast proxy service
      </p>
    </div>
  );
};

export default Hero;
