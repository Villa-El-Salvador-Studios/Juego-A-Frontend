import Slidebar from '../../componentes/slidebar/Slidebar';
import './Configuracion.css';

const Configuracion = () => {

    return (
        <div className='configuracion'>
            <h1>Configuración</h1>
            <Slidebar titulo="Sonido"/>
            <Slidebar titulo="Música"/>
            <Slidebar titulo="Brillo"/>
            <h1>Dificultad</h1>
            <select>
                <option value="Facil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Dificil">Dificil</option>
            </select>
        </div>
    )
}

export default Configuracion