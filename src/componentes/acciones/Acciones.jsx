import { useAudio } from '../../shared/AudioContext/AudioContext';
import './Acciones.css';

const Acciones = ({isOpen, onClose, tipo, informacion, abrirYCerrarAcciones, mostrarNotificacion, ejecutarHabilidad, funcionesObjetos, cantidadObjetos, vidaActualPersonajeActivo, setHabilidadElegida}) => {
    const { playHabilitySFX, obtenerLongitudAudio, playAccionesAudio } = useAudio();

    const handleClick = (nombre, index) => {
        if (tipo === "Habilidades") {
            obtenerLongitudAudio(nombre).then((duracion) => {
                ejecutarHabilidad("personaje", nombre, duracion);
                playHabilitySFX(nombre);
                setHabilidadElegida(nombre)
            })
        } else if (tipo === "Personajes") {
            informacion.funciones(informacion.ids[index]);
            playAccionesAudio("personajes");
        } else if (tipo === "Objetos") {
            funcionesObjetos[index]();
            playAccionesAudio("objetos");
        }

        mostrarNotificacion(tipo.toLowerCase(), nombre);
        abrirYCerrarAcciones();
    };

    return isOpen ? (
        <div className="acciones">
            <h1 className='acciones-titulo'>{tipo}</h1>
            <div className="acciones-botones">
                {informacion.nombres.map((nombre, index) => (
                    <div key={index} className="boton-con-imagen">
                        {tipo === "Personajes" && (
                            <h1 className='acciones-vida-actual'>{`${vidaActualPersonajeActivo[informacion.ids[index]]}/2000`}</h1>
                        )}
                        {tipo !== "Habilidades" && (
                        <img
                            src={informacion.imagenes[index]}
                            alt={`Imagen de ${nombre}`}
                            className="imagen-boton"
                        />
                        )}
                        {tipo !== "Objetos" && (
                            <button
                                className="boton-con-ancho-fijo"
                                onClick={() => handleClick(nombre, index)}
                            >
                                {nombre}
                            </button>
                        )}
                        {tipo === "Objetos" && (
                            <h1 className='acciones-contador-objetos'>{cantidadObjetos[index + 1]}</h1>
                        )}
                        {tipo === "Objetos" && (
                            <button
                                className="boton-con-ancho-fijo"
                                onClick={() => handleClick(nombre, index)}
                                disabled={cantidadObjetos[index + 1] < 1}
                            >
                                {nombre}
                            </button>  
                        )}               
                    </div>
                ))}
            </div>
            <button className="acciones-cerrar-button" onClick={onClose}>Cerrar</button>
        </div>
    ) : null;
}

export default Acciones