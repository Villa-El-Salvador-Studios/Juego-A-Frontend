import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import './MenuPrincipal.css'

const MenuPrincipal = () => {
    const navegar = useNavigate(); // Variable para navegar entre rutas
    const [isFullScreen, setFullScreen] = useState(false);
    const handle = useFullScreenHandle();

    const volverHome = () => {
        navegar('/home');
    }

    

    const iconSources = ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==",
                         "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCA1djE0aDI0di0xNGgtMjR6bTE2IDNoMnYyaC0ydi0yem0tMyAwaDJ2MmgtMnYtMnptMyAzdjJoLTJ2LTJoMnptLTYtM2gydjJoLTJ2LTJ6bTMgM3YyaC0ydi0yaDJ6bS02LTNoMnYyaC0ydi0yem0zIDN2MmgtMnYtMmgyem0tNy0zaDN2MmgtM3YtMnptMCAzaDR2MmgtNHYtMnptMTQgNWgtMTB2LTJoMTB2MnptNC0zaC00di0yaDR2MnptMC0zaC0ydi0yaDJ2MnoiLz48L3N2Zz4=",
                         "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuNDE0IDE4LjU4NmwyLjU4Ni0yLjU4NnY4aC04bDIuNTg2LTIuNTg2LTUuMTcyLTUuMTcyIDIuODI4LTIuODI4IDUuMTcyIDUuMTcyem0tMTMuNjU2LThsMi44MjgtMi44MjgtNS4xNzItNS4xNzIgMi41ODYtMi41ODZoLTh2OGwyLjU4Ni0yLjU4NiA1LjE3MiA1LjE3MnptMTAuODI4LThsLTIuNTg2LTIuNTg2aDh2OGwtMi41ODYtMi41ODYtNS4xNzIgNS4xNzItMi44MjgtMi44MjggNS4xNzItNS4xNzJ6bS04IDEzLjY1NmwtMi44MjgtMi44MjgtNS4xNzIgNS4xNzItMi41ODYtMi41ODZ2OGg4bC0yLjU4Ni0yLjU4NiA1LjE3Mi01LjE3MnoiLz48L3N2Zz4=",
                         "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNTg2IDE5LjQxNGwtMi41ODYgMi41ODZ2LThoOGwtMi41ODYgMi41ODYgNC41ODYgNC41ODYtMi44MjggMi44MjgtNC41ODYtNC41ODZ6bS0xMy43NTgtMTkuNDE0bC0yLjgyOCAyLjgyOCA0LjU4NiA0LjU4Ni0yLjU4NiAyLjU4Nmg4di04bC0yLjU4NiAyLjU4Ni00LjU4Ni00LjU4NnptMTYuNTg2IDcuNDE0bDIuNTg2IDIuNTg2aC04di04bDIuNTg2IDIuNTg2IDQuNTg2LTQuNTg2IDIuODI4IDIuODI4LTQuNTg2IDQuNTg2em0tMTkuNDE0IDEzLjc1OGwyLjgyOCAyLjgyOCA0LjU4Ni00LjU4NiAyLjU4NiAyLjU4NnYtOGgtOGwyLjU4NiAyLjU4Ni00LjU4NiA0LjU4NnoiLz48L3N2Zz4="]
    return (
        <div className='menu-principal'>
            <h1 className='titulo'>Juego-A</h1>
            <div className="espacio-botones">
                <button className='boton-menu'>Jugar</button>
                <button className='boton-menu' onClick={volverHome}>Cerrar sesión</button>
            </div>
            <div className='iconos'>
                <img className='icono-individual' src={iconSources[0]} alt="Configuración" />
                <img className='icono-individual' src={iconSources[1]} alt="Controles" />
                <img
                    className='icono-individual'
                    src={iconSources[2]}
                    alt="Pantalla completa"
                    onClick={() => {
                        setFullScreen(true);
                        handle.enter();
                    }}
                />
            </div>

            <FullScreen handle={handle}>
                <p>Pantalla completa.</p>
            </FullScreen>
        </div>
    )
}

export default MenuPrincipal