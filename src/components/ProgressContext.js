import React, { createContext, useState } from 'react';

// Create the context
export const ProgressContext = createContext();

// ProgressProvider component
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(1);  // Make sure level and setLevel are included

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <ProgressContext.Provider value={{ progress, level, updateProgress, setLevel }}>
      {children}
    </ProgressContext.Provider>
  );
};
