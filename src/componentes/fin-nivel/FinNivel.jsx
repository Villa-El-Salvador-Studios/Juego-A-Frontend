import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useAudio } from '../../shared/AudioContext/AudioContext';
import './FinNivel.css'

const FinNivel = () => {
    const { playEndgameSFX } = useAudio();

    const navigate = useNavigate();
    const { resultado } = useParams();

    const [isExit, setIsExit] = useState(false);
    const [endGame, setEndGame] = useState(false);

    const entrarSiguienteNivel = () => {
        let nivelActual = Number(localStorage.getItem('nivel'))
        localStorage.setItem('nivel', (nivelActual + 1));

        let bossActual = Number(localStorage.getItem('boss'))
        localStorage.setItem('boss', (bossActual + 1));

        console.log("BOSS ID: ", localStorage.getItem('boss'))

        navigate('/nivel');
    }

    const seleccionarNuevoPersonaje = () => {
        navigate('/seleccionar-nuevo-personaje')
    }

    const volverSelectorNiveles = () => {
        navigate('/selector-niveles')
    }

    const reintentarNivel = () => {
        navigate('/nivel')
    }

    useEffect(() => {
        if (Number(localStorage.getItem('nivel')) === 5){
            setEndGame(true);
        }
    }, [])

    useEffect(() => {
        if (endGame && resultado === "victoria") {
            playEndgameSFX("victoriaFinal", isExit)
        } else if (resultado === "derrota") {
            playEndgameSFX(resultado, isExit)
        } else if (resultado === "victoria") {
            playEndgameSFX(resultado, isExit)
        }
    }, [endGame])

    // CORREGIR ESTO
    useEffect(() => {
        const cleanup = () => {
            console.log("ANTES DEL CAMBIO", isExit)
            setIsExit(true);
            console.log("ANTES DEL CAMBIO", isExit)
        };
    
        // El cleanup effect se ejecuta solo al salir del componente FinNivel
        return cleanup;
    }, []);

    return resultado === "victoria" ? (
        <div className="finNivel" style={{background: "linear-gradient(180deg, #fdf2c5, #82bfa0)"}}>
            <h1 className='finNivel-titulo'>{endGame ? '¡Felicidades, completaste el juego!' : 'Victoria'}</h1>
            {endGame ? null : <h2 className='finNivel-subtitulo'>¡Puedes seleccionar un nuevo personaje!</h2>}
            <div className='finNivel-botones'>
                {endGame ? null : <button className='finNivel-botones-accion' onClick={entrarSiguienteNivel}>Siguiente nivel</button>}
                {endGame ? null : <button className='finNivel-botones-accion' onClick={seleccionarNuevoPersonaje}>Seleccionar nuevo personaje</button>}
                <button className='finNivel-botones-accion' onClick={volverSelectorNiveles}>Seleccionar nivel</button>
            </div>
        </div>
    ) : (
        <div className="finNivel" style={{background: "linear-gradient(180deg, #e15244, #7a6f5d)"}}>
            <h1 className='finNivel-titulo'>Derrota</h1>
            <div className='finNivel-botones'>
                <button className='finNivel-botones-accion' onClick={reintentarNivel}>Reintentar</button>
                <button className='finNivel-botones-accion' onClick={volverSelectorNiveles}>Seleccionar nivel</button>
            </div>
        </div>
    )
}

export default FinNivel
