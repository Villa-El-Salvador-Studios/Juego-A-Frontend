import React, { useRef, useEffect, useState } from 'react';
import './Personaje.css'

const Personaje = ({nombre, imagen, vidaMaxima, vidaActual, categoria}) => {
    // Establece la altura de la barra de vida según la categoría
    const alturaBarraVidaCSS = categoria === 'boss' ? '30vmin' : '15vmin';
    
    return (
        <div className="personaje">
            <h1 className='mundo-title'>{nombre}</h1>
            <progress className='mundo-vida-progress' value={vidaActual} max={vidaMaxima}></progress>
            <div className="contenedor-personaje">
                <img
                className={categoria === 'boss' ? 'mundo-boss' : 'mundo-personaje'}
                src={imagen}
                alt={`Imagen de ${nombre}`}
                />
            </div>
        </div>
    )
}

export default Personaje