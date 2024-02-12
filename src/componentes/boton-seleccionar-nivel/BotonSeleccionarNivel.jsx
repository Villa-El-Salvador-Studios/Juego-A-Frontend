import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JugadorService from '../../services/jugador-service'
import './BotonSeleccionarNivel.css'

const BotonSeleccionarNivel = ({cantidad}) => {
    const navegar = useNavigate();
    const [mundoMaximo, setMundoMaximo] = useState(1);
    
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
          <div
            key={index}
            className="botonGeneral"
          >
            <svg
              className="boton-seleccionar-nivel-svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                display: index >= mundoMaximo ? "block" : "none",
                cursor: index >= mundoMaximo ? "not-allowed" : "pointer",
              }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
              <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
              <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
            </svg>
            <button
              className="boton-seleccionar-nivel-button"
              onClick={handleClick}
              disabled={index >= mundoMaximo}
              style={{
                cursor: index >= mundoMaximo ? "not-allowed" : "pointer",
              }}
            >
              {index >= mundoMaximo ? "" : index + 1}
            </button>
          </div>
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