import './BotonSeleccionarNivel.css'
import { Link, useNavigate } from 'react-router-dom';

const BotonSeleccionarNivel = ({cantidad}) => {
    const navegar = useNavigate();

    const entrarANivel = (nivel) => {
        localStorage.setItem('nivel', nivel);

        navegar('/nivel');
    }

    const botones = [...Array(cantidad)].map((_, index) => (
        <button className='boton-seleccionar-nivel-button' key={index} onClick={() => entrarANivel(index+1)}>
            {index + 1}
        </button>
    ));
    
    const filas = [];

    for (let i = 0; i < botones.length; i += 5) {
        filas.push(botones.slice(i, i + 5));
    }
    
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