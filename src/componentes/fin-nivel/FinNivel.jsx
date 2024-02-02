import { useNavigate } from 'react-router-dom'
import './FinNivel.css'

const FinNivel = ({resultado}) => {
    const navigate = useNavigate();

    return resultado === "victoria" ? (
        <div className="finNivel">
            <h1 className='finNivel-titulo'>Victoria</h1>
            <div className='finNivel-botones'>
                <button className='finNivel-botones-accion'>Siguiente nivel</button>
                <button className='finNivel-botones-accion' onClick={() => navigate('/selector-niveles')}>Seleccionar nivel</button>
            </div>
        </div>
    ) : (
        <div className="finNivel">
            <h1 className='finNivel-titulo'>Derrota</h1>
            <div className='finNivel-botones'>
                <button>Reintentar</button>
                <button>Seleccionar nivel</button>
            </div>
        </div>
    )
}

export default FinNivel
