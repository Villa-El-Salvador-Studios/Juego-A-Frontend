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
  const [volume, setVolume] = useState(1);
  let audioElement = new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3');

  // Lista de pistas de música de fondo
  const backgroundMusicAudioElements = [
    new Audio('../../src/assets/audios/Beach-Sakura Girl.mp3'),
    new Audio('../../src/assets/audios/DRIVE.mp3'),
    new Audio('../../src/assets/audios/Fluffing-a-Duck.mp3'),
    new Audio('../../src/assets/audios/Powerful Trap Beat.mp3'),
    new Audio('../../src/assets/audios/Run-Amok.mp3'),
    new Audio('../../src/assets/audios/Sneaky-Snitch.mp3')
  ];

  const playAudio = (index, volumen) => {
  
    audioElement = backgroundMusicAudioElements[index];
    
    audioElement.volume = volumen;

    const playPromise = audioElement.play();
  
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          localStorage.setItem('audioIsPlaying', 'true');
        })
        .catch((error) => {
          console.error('Error al reproducir el audio:', error);
        });
    }

    // Manejador de eventos onended
    audioElement.onended = () => {
      // Aquí puedes realizar acciones después de que la pista haya terminado
      console.log('La pista ha terminado de reproducirse.');
    };
  };  

  const pauseAudio = () => {
    backgroundMusicAudioElements.forEach((audioElement) => {
      audioElement.pause();
    });
    localStorage.setItem('audioIsPlaying', 'false');
  };

  const stopAudio = () => {
    backgroundMusicAudioElements.forEach((audioElement) => {
      if (!audioElement.paused) {
        audioElement.pause();
        audioElement.onended = null; // Eliminamos el listener onended
      }
      audioElement.currentTime = 0;
    });
    localStorage.setItem('audioIsPlaying', 'false');
  };  

  // Utiliza el callback de setVolume para asegurarte de obtener el valor más reciente del estado
  const setVolumeForAll = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, stopAudio, setVolumeForAll, volume }}>
      {children}
    </AudioContext.Provider>
  );
};
