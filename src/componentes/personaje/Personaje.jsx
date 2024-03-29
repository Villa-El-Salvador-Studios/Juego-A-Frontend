import React, { useRef, useEffect, useState } from 'react';
import './Personaje.css'

const Personaje = ({nombre, imagen, vidaMaxima, vidaActual, categoria, isVeneno, turnosVeneno, vidaAnterior}) => {
  const [isTakingDamage, setIsTakingDamage] = useState(false);
  const [isHealing, setIsHealing] = useState(false);

  useEffect(() => {
      if (vidaActual < vidaAnterior) {
          setIsTakingDamage(true);
          setTimeout(() => {
            setIsTakingDamage(false);
          }, 500);
      } else if (vidaActual > vidaAnterior) {
          setIsHealing(true);
          setTimeout(() => {
              setIsHealing(false);
          }, 500);
      }
  }, [vidaActual, vidaAnterior]);

  return (
    <div className="personaje">
      <h1 className="mundo-title">{nombre}</h1>
      {isVeneno && (
        <h1 className="mundo-subtitle">{`Veneno restante: ${turnosVeneno}`}</h1>
      )}
      <progress
        className="mundo-vida-progress"
        value={vidaActual}
        max={vidaMaxima}
      ></progress>
      <div className="contenedor-personaje">
        <img
          className={categoria === "boss" ? "mundo-boss" : "mundo-personaje"}
          src={imagen}
          alt={`Imagen de ${nombre}`}
          style={{
            filter:
              isTakingDamage ? "grayscale(100%) brightness(50%) sepia(50%) hue-rotate(290deg) saturate(500%)"
              :
              isHealing ? "grayscale(100%) brightness(70%) sepia(50%) hue-rotate(75deg) saturate(500%)"
              :
              "hue-rotate(0deg)",
            transform:
              isTakingDamage ? "rotate(-10deg)"
              : null,
            scale:
              isHealing ? "1.2"
              :
              "1"
          }}
        />
      </div>
    </div>
  );
}

export default Personaje