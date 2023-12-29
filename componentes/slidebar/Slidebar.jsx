import React, { useState, useEffect } from 'react';
import { useAudio } from '../../shared/AudioContext/AudioContext';
import './Slidebar.css'; 

const Slidebar = ({ titulo, tipo, cantidadCheckboxes, cantidadElementos }) => {
   const tipoInput = tipo;
   const arrayAuxiliar = Array.from({ length: cantidadCheckboxes }, (_, index) => index + 1);
   const { playAudio, pauseAudio } = useAudio();
   const [isAudioPlaying, setIsAudioPlaying] = useState(false);

   const inputsAlt = ['sonido', 'musica']

   const handleToggleAudio = (event, alt) => {
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
         if (event.target.alt === 'musica') {
            handleToggleAudio(event);
         }
      };

      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('click', handleClick);
      };
   }, []);

   return tipoInput === 'checkbox' ? (
      <div className='sliderbar'>
         <h1 className='titulo-sliderbar'>{titulo}</h1>
         <div className='div-sliderbar' >
            {arrayAuxiliar.map((index) => (
               <div key={index}>
                  <h4 className='h4-sliderbar'>Activo</h4>
                  <p>{index}</p>
                  <input
                     className='slider-checkbox'
                     type={tipoInput}
                     alt={inputsAlt[index]}
                     onClick={handleToggleAudio}
                  />
               </div>
            ))}
         </div>
      </div>
   ) : (
      <div className='sliderbar'>
         <h1 className='titulo-sliderbar'>{titulo}</h1>
         <input className='slider' type={tipoInput} min="0" max="100"/>
      </div>
   );
}

export default Slidebar;
