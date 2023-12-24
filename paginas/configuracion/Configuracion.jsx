import React, { useState } from 'react';
import Slidebar from '../../componentes/slidebar/Slidebar';
import './Configuracion.css';

const Configuracion = () => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState('Fácil');

    const handleChange = (event) => {
        const nuevoNivel = event.target.value;
        setNivelSeleccionado(nuevoNivel);
    };

    return (
        <div className='configuracion'>
            <h1 className='titulo-configuracion'>Configuración</h1>
            <Slidebar titulo="Sonido"/>
            <Slidebar titulo="Música"/>
            <Slidebar titulo="Brillo"/>
            <h1 className='titulo-dificultad'>Dificultad</h1>
            <select className='dificultad' value={nivelSeleccionado} onChange={handleChange}>
                <option>Fácil</option>
                <option>Normal</option>
                <option>Dificil</option>
            </select>
        </div>
    )
}

export default Configuracion