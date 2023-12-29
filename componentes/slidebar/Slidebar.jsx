import React, { useState, useEffect } from 'react';
import { useAudio } from '../../shared/AudioContext/AudioContext';
import './Slidebar.css'; 

const Slidebar = ({ informacion }) => {
   const { playAudio, pauseAudio } = useAudio();
   const [isAudioPlaying, setIsAudioPlaying] = useState(false);

   const handleToggleAudio = (event) => {
      event.stopPropagation();
      setIsAudioPlaying((prevIsAudioPlaying) => {
        const newIsAudioPlaying = !prevIsAudioPlaying;
  
        if (newIsAudioPlaying) {
          playAudio(0, 0.1);
        } else {
          pauseAudio();
        }
  
        return newIsAudioPlaying;
      });
  };

  useEffect(() => {
      const handleClick = (event) => {
         // Verificar si el clic fue en el ícono de activar/desactivar música
         if (event.target.alt === 'Musica') {
            handleToggleAudio(event);
         }
      };

      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('click', handleClick);
      };
   }, []);

   return (
      <div className='sliderbar'>
      {[...Array(informacion.iteraciones)].map((_, index) => (
        <div className='sliderbar-item' key={index}>
            <h1 className='titulo-sliderbar'>{informacion.titulos[index]}</h1>
            {index < informacion.iteraciones - 1 && (
               <>
               <h4 className='h4-sliderbar'>Activo</h4>
               </>
            )}
            <input
               className={informacion.tiposDeElementos[index] === 'checkbox' ? 'slider-checkbox' : 'slider-slider'}
               type={informacion.tiposDeElementos[index]}
               alt={informacion.titulos[index]}
               onClick={informacion.titulos[index] === 'Musica' ? handleToggleAudio : undefined}
            />
        </div>
      ))}
    </div>
   );
}

export default Slidebar;
