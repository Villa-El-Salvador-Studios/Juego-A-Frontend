import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFullScreen } from '../../shared/full-screen/FullScreen';
import Configuracion from '../configuracion/Configuracion';
import { useAudio } from '../../shared/AudioContext/AudioContext';
import './MenuPrincipal.css'

const MenuPrincipal = () => {
    const navegar = useNavigate(); // Variable para navegar entre rutas
    const { isFullScreen, enterFullScreen, exitFullScreen } = useFullScreen();
    const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
    const { stopAudio } = useAudio();

    const iconSources = [   "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==",
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNy4zNTh2MTUuNjQybC04LTV2LS43ODVsOC05Ljg1N3ptMy02LjA5NGwtMS41NDgtMS4yNjQtMy40NDYgNC4yNDctNi4wMDYgMy43NTN2My42NDZsLTIgMi40NjR2LTYuMTFoLTR2MTBoLjg0M2wtMy44NDMgNC43MzYgMS41NDggMS4yNjQgMTguNDUyLTIyLjczNnoiLz48L3N2Zz4=",
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiA3bDgtNXYyMGwtOC01di0xMHptLTYgMTBoNHYtMTBoLTR2MTB6bTIwLjI2NC0xMy4yNjRsLTEuNDk3IDEuNDk3YzEuODQ3IDEuNzgzIDIuOTgzIDQuMTU3IDIuOTgzIDYuNzY3IDAgMi42MS0xLjEzNSA0Ljk4NC0yLjk4MyA2Ljc2NmwxLjQ5OCAxLjQ5OGMyLjMwNS0yLjE1MyAzLjczNS01LjA1NSAzLjczNS04LjI2NHMtMS40My02LjExLTMuNzM2LTguMjY0em0tLjQ4OSA4LjI2NGMwLTIuMDg0LS45MTUtMy45NjctMi4zODQtNS4zOTFsLTEuNTAzIDEuNTAzYzEuMDExIDEuMDQ5IDEuNjM3IDIuNDAxIDEuNjM3IDMuODg4IDAgMS40ODgtLjYyMyAyLjg0MS0xLjYzNCAzLjg5MWwxLjUwMyAxLjUwM2MxLjQ2OC0xLjQyNCAyLjM4MS0zLjMwOSAyLjM4MS01LjM5NHoiLz48L3N2Zz4=",
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCA1djE0aDI0di0xNGgtMjR6bTE2IDNoMnYyaC0ydi0yem0tMyAwaDJ2MmgtMnYtMnptMyAzdjJoLTJ2LTJoMnptLTYtM2gydjJoLTJ2LTJ6bTMgM3YyaC0ydi0yaDJ6bS02LTNoMnYyaC0ydi0yem0zIDN2MmgtMnYtMmgyem0tNy0zaDN2MmgtM3YtMnptMCAzaDR2MmgtNHYtMnptMTQgNWgtMTB2LTJoMTB2MnptNC0zaC00di0yaDR2MnptMC0zaC0ydi0yaDJ2MnoiLz48L3N2Zz4=",
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuNDE0IDE4LjU4NmwyLjU4Ni0yLjU4NnY4aC04bDIuNTg2LTIuNTg2LTUuMTcyLTUuMTcyIDIuODI4LTIuODI4IDUuMTcyIDUuMTcyem0tMTMuNjU2LThsMi44MjgtMi44MjgtNS4xNzItNS4xNzIgMi41ODYtMi41ODZoLTh2OGwyLjU4Ni0yLjU4NiA1LjE3MiA1LjE3MnptMTAuODI4LThsLTIuNTg2LTIuNTg2aDh2OGwtMi41ODYtMi41ODYtNS4xNzIgNS4xNzItMi44MjgtMi44MjggNS4xNzItNS4xNzJ6bS04IDEzLjY1NmwtMi44MjgtMi44MjgtNS4xNzIgNS4xNzItMi41ODYtMi41ODZ2OGg4bC0yLjU4Ni0yLjU4NiA1LjE3Mi01LjE3MnoiLz48L3N2Zz4=",
                            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNTg2IDE5LjQxNGwtMi41ODYgMi41ODZ2LThoOGwtMi41ODYgMi41ODYgNC41ODYgNC41ODYtMi44MjggMi44MjgtNC41ODYtNC41ODZ6bS0xMy43NTgtMTkuNDE0bC0yLjgyOCAyLjgyOCA0LjU4NiA0LjU4Ni0yLjU4NiAyLjU4Nmg4di04bC0yLjU4NiAyLjU4Ni00LjU4Ni00LjU4NnptMTYuNTg2IDcuNDE0bDIuNTg2IDIuNTg2aC04di04bDIuNTg2IDIuNTg2IDQuNTg2LTQuNTg2IDIuODI4IDIuODI4LTQuNTg2IDQuNTg2em0tMTkuNDE0IDEzLjc1OGwyLjgyOCAyLjgyOCA0LjU4Ni00LjU4NiAyLjU4NiAyLjU4NnYtOGgtOGwyLjU4NiAyLjU4Ni00LjU4NiA0LjU4NnoiLz48L3N2Zz4="]

    const fullScreenIconSrc = isFullScreen ? iconSources[5] : iconSources[4];

    const volverHome = () => {
        navegar('/home');
    }

    const irASelectorDeNiveles = () => {
        navegar('/selector-niveles');
    }

    const cerrarConfiguracion = () => {
        setMostrarConfiguracion(!mostrarConfiguracion);
    };

    // Detener la música cuando el componente se desmonta
    useEffect(() => {
        return () => {
            stopAudio();
        };
    }, [stopAudio]);
    
    return (
        <div className='menu-principal'>
            <h1 className='titulo'>Juego-A</h1>
            <div className="espacio-botones">
                <button className='boton-menu' onClick={irASelectorDeNiveles}>Jugar</button>
                <button className='boton-menu' onClick={volverHome}>
                    Cerrar sesión
                </button>
            </div>
            <div className='iconos'>
                <Configuracion isOpen={mostrarConfiguracion} onClose={cerrarConfiguracion}/>
                <img className='icono-individual' src={iconSources[0]} alt="Configuración" onClick={cerrarConfiguracion}/>
                
                <img className='icono-individual' src={iconSources[3]} alt="Controles" />
                <img
                    className='icono-individual'
                    src={fullScreenIconSrc}
                    alt={isFullScreen ? "Salir pantalla completa" : "Pantalla completa"}
                    onClick={() => {
                        isFullScreen ? exitFullScreen() : enterFullScreen();
                    }}
                />
            </div>
        </div>
    )
}

export default MenuPrincipal