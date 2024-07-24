import React from 'react';

const RotatingLoader = () => {
  return (
    <div className="flex h-full">
      <div className="relative w-10 h-10 animate-spin">
        <div className="absolute w-4 h-4 bg-primary rounded-full animate-spin-slow bg-gray-900" />
        <div className="absolute w-4 h-4 bg-secondary rounded-full animate-spin-slower bg-gray-900" />
        <div className="absolute w-4 h-4 bg-muted rounded-full animate-spin-slowest bg-gray-900" />
      </div>
    </div>
  );
};

export default RotatingLoader;
