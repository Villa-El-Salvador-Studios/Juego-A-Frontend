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
  const audioElement = useRef(null);
  const [volume, setVolume] = useState(1); // Inicializado en 1 (volumen completo)

  // Lista de pistas de música de fondo
  const backgroundMusicAudioElements = [
    new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3'),
    new Audio('../../src/assets/audios/DRIVE.mp3'),
    new Audio('../../src/assets/audios/Fluffing-a-Duck.mp3'),
    new Audio('../../src/assets/audios/Powerful Trap Beat.mp3'),
    new Audio('../../src/assets/audios/Run-Amok.mp3'),
    new Audio('../../src/assets/audios/Sneaky-Snitch.mp3')
  ];
  
  // Establecer el volumen inicial
  backgroundMusicAudioElements.forEach((audioElement) => {
    audioElement.volume = volume;
  });

  useEffect(() => {
    audioElement.current = new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3');
  }, []);

  const playAudio = (index) => {
    stopAudio();
    const playPromise = backgroundMusicAudioElements[index].play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          localStorage.setItem('audioIsPlaying', 'true');
        })
        .catch((error) => {
          console.error('Error al reproducir el audio:', error);
        });
    }
  };

  const pauseAudio = () => {
    backgroundMusicAudioElements.forEach((audioElement) => {
      audioElement.pause();
    });
    localStorage.setItem('audioIsPlaying', 'false');
  };

  const stopAudio = () => {
    backgroundMusicAudioElements.forEach((audioElement) => {
      audioElement.pause();
      audioElement.currentTime = 0;
    });
    localStorage.setItem('audioIsPlaying', 'false');
  };

  const setVolumeForAll = (newVolume) => {
    backgroundMusicAudioElements.forEach((audioElement) => {
      audioElement.volume = newVolume;
    });
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, stopAudio, setVolumeForAll }}>
      {children}
    </AudioContext.Provider>
  );
};
