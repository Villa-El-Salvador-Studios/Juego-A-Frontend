import React, { createContext, useContext, useEffect, useState } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3');

    const playAudio = () => {
      const playPromise = audioElement.play();

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

    // Exponer la función playAudio
    window.playAudio = playAudio;

    // Limpiar el efecto al desmontar el componente
    return () => {
      audioElement.pause();
      setAudioIsPlaying(false);
    };
  }, []);

  return <AudioContext.Provider value={{ audioIsPlaying }}>{children}</AudioContext.Provider>;
};
