import React, { useState } from 'react';
import Slidebar from '../../componentes/slidebar/Slidebar';
import './Configuracion.css';

const Configuracion = ({ isOpen, onClose }) => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState('Fácil');

    const iconoCerrar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMjAuMTg4bC04LjMxNS04LjIwOSA4LjItOC4yODItMy42OTctMy42OTctOC4yMTIgOC4zMTgtOC4zMS04LjIwMy0zLjY2NiAzLjY2NiA4LjMyMSA4LjI0LTguMjA2IDguMzEzIDMuNjY2IDMuNjY2IDguMjM3LTguMzE4IDguMjg1IDguMjAzeiIvPjwvc3ZnPg=="

    const informacion = {
        iteraciones: 3,
        tiposDeElementos: ['checkbox', 'checkbox', 'range'],
        titulos: ['Sonido', 'Musica', 'Brillo'],
    }
    
    const handleDificultadChange = (event) => {
        const nuevoNivel = event.target.value;
        setNivelSeleccionado(nuevoNivel);
    };

    return isOpen ? (
        <div className='configuracion'>
            <h1 className='titulo-configuracion'>Configuración</h1>
            <img className='boton-cerrar' src={iconoCerrar} alt="Botón cerrar" onClick={onClose} />
            <Slidebar informacion={informacion}/>
            <h1 className='titulo-dificultad'>Dificultad</h1>
            <select className='dificultad' value={nivelSeleccionado} onChange={handleDificultadChange}>
                <option>Fácil</option>
                <option>Normal</option>
                <option>Dificil</option>
            </select>
        </div>
    ) : null;
}

export default Configuracion