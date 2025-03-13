import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loader mb-4"></div>
      <p className="text-muted-foreground text-lg">Loading your request...</p>
    </div>
  );
};

export default LoadingIndicator;
