import { useState, useEffect } from 'react';
import { useAudio } from '../../shared/AudioContext/AudioContext';
import './CuentaRegresiva.css';

const CuentaRegresiva = ({cambiarCuentaRegresiva}) => {
    const { playStartSFX } = useAudio();

    const [contador, setContador] = useState(3);

    useEffect(() => {
        playStartSFX()
    }, [])

    useEffect(() => {
        if (contador === -1) {
            cambiarCuentaRegresiva();
        }

        const timer = setTimeout(() => {
            const nuevoContador = contador - 1;
            setContador(nuevoContador);
        }, 1000); // Incrementa el contador cada segundo
    
        // Limpiar el temporizador cuando el componente se desmonta
        return () => clearTimeout(timer);
    }, [contador])

    return (
        <div className="CuentaRegresiva">
            <h1 className='CuentaRegresiva-titulo'>{contador !== 0 ? contador : 'Start!'}</h1>
        </div>
    );
}

export default CuentaRegresiva