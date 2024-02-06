import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JugadorService from '../../services/jugador-service'
import './BotonSeleccionarNivel.css'

const BotonSeleccionarNivel = ({cantidad}) => {
    const navegar = useNavigate();
    const [mundoMaximo, setMundoMaximo] = useState(0);
    
    const entrarANivel = (nivel) => {
        localStorage.setItem('nivel', nivel);

        navegar('/nivel');
    }

    const botones = [...Array(cantidad)].map((_, index) => {
        const handleClick = () => {
            if (index <= mundoMaximo - 1) {
                entrarANivel(index + 1);
            }
        };
    
        return (
            <button
                className="boton-seleccionar-nivel-button"
                key={index}
                onClick={handleClick}
                disabled={index >= mundoMaximo}
            >
                {index + 1}
            </button>
            );
    });
    
    const filas = [];

    for (let i = 0; i < botones.length; i += 5) {
        filas.push(botones.slice(i, i + 5));
    }
    
    const fetchData = async () => {
        try {
            await JugadorService.GetById(localStorage.getItem("jugadorId"))
                .then((response) => {
                    setMundoMaximo(response.data.mundoMaximo)
                })
        } catch (error) {
            console.log("Hubo un error al obtener el mundo máximo del jugador.", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="boton-seleccionar-nivel">
            {filas.map((fila, index) => (
                <div key={index} className="fila-botones">
                    {fila}
                </div>
            ))}
        </div>
    )
}

export default BotonSeleccionarNivel