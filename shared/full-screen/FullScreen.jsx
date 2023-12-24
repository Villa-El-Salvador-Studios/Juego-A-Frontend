// FullScreenContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const FullScreenContext = createContext();

export const useFullScreen = () => {
  const context = useContext(FullScreenContext);
  if (!context) {
    throw new Error('useFullScreen debe ser utilizado dentro de un proveedor FullScreenProvider');
  }
  return context;
};

export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setFullScreen] = useState(false);

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen().then(() => setFullScreen(true));
  };

  const exitFullScreen = () => {
    document.exitFullscreen().then(() => setFullScreen(false));
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, enterFullScreen, exitFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};
