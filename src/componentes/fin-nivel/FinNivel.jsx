import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './FinNivel.css'

const FinNivel = () => {
    const navigate = useNavigate();
    const { resultado } = useParams();

    const [endGame, setEndGame] = useState(false);

    const entrarSiguienteNivel = () => {
        let nivelActual = Number(localStorage.getItem('nivel'))
        localStorage.setItem('nivel', (nivelActual + 1));

        navigate('/nivel');
    }

    const seleccionarNuevoPersonaje = () => {
        navigate('/seleccionar-nuevo-personaje')
    }

    const volverSelectorNiveles = () => {
        navigate('/selector-niveles')
    }

    useEffect(() => {
        if (Number(localStorage.getItem('nivel')) === 5){
            setEndGame(true);
        }
    }, [])

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
                <button className='finNivel-botones-accion'>Reintentar</button>
                <button className='finNivel-botones-accion' onClick={volverSelectorNiveles}>Seleccionar nivel</button>
            </div>
        </div>
    )
}

export default FinNivel
