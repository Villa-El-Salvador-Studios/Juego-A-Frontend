// Slidebar.js
import './Slidebar.css'; 

const Slidebar = ({ titulo, onSlide, isMusic }) => {
   const handleSlide = (event) => {
      if (isMusic) {
         // Obtener el valor del control deslizante en el rango [0, 100]
         const sliderValue = parseFloat(event.target.value);
         
         // Convertir el valor al rango [0.1, 1] para evitar apagar completamente el volumen
         const normalizedValue = Math.max(sliderValue / 100, 0.1);

         // Llamar a la función proporcionada con el valor normalizado
         onSlide(normalizedValue);
      }
   };

   return (
      <div className='sliderbar'>
         <h1 className='titulo-sliderbar'>{titulo}</h1>
         <input className='slider' type="range" min="0" max="100" onChange={handleSlide} />
      </div>
   );
}

export default Slidebar;
