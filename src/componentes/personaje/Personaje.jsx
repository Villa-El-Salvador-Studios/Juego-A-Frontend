import React, { useRef, useEffect, useState } from 'react';
import './Personaje.css'

const Personaje = ({nombre, imagen, vidaMaxima, vidaActual, categoria}) => {
    // Establece la altura de la barra de vida según la categoría
    const alturaBarraVidaCSS = categoria === 'boss' ? '30vmin' : '15vmin';
    
    return (
        <div className="personaje">
            <h1 className='mundo-title'>{nombre}</h1>
            <div className="contenedor-personaje">
                <img
                className={categoria === 'boss' ? 'mundo-boss' : 'mundo-personaje'}
                src={imagen}
                alt={`Imagen de ${nombre}`}
                />
                <div style={{
                                height: alturaBarraVidaCSS, // Establece la altura de la barra de vida proporcional al valor de vida
                                backgroundColor: 'green', // Color verde para la barra de vida
                                width: '10px', // Ancho de la barra de vida
                                marginLeft: '10px', // Espacio entre la imagen y la barra de vida
                            }}></div>
            </div>
        </div>
    )
}

export default Personaje