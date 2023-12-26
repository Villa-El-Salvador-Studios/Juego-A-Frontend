import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio debe usarse dentro de un AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const audioElement = useRef(null);

  useEffect(() => {
    audioElement.current = new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3');
  }, []);

  const playAudio = () => {
    const playPromise = audioElement.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAudioIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error al reproducir el audio:', error);
        });
    }
  };

  const stopAudio = () => {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    setAudioIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ audioIsPlaying, playAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
