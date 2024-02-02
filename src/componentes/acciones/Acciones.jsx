import './Acciones.css';

const Acciones = ({isOpen, onClose, tipo, informacion, infoPersonajes, abrirYCerrarAcciones, mostrarNotificacion, personajeActivoId, multiplicadores}) => {
    const handleClick = (nombre, index) => {
        if (tipo === "Habilidades") {
            informacion.funciones(personajeActivoId, "personaje", nombre, multiplicadores, infoPersonajes);
        } else if (tipo === "Personajes") {
            informacion.funciones(informacion.ids[index]);
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
                        {tipo !== "Habilidades" && (
                        <img
                            src={informacion.imagenes[index]}
                            alt={`Imagen de ${nombre}`}
                            className="imagen-boton"
                        />
                        )}
                        <button
                            className="boton-con-ancho-fijo"
                            onClick={() => handleClick(nombre, index)}
                        >
                            {nombre}
                        </button>
                    </div>
                ))}
            </div>
            <button className="acciones-cerrar-button" onClick={onClose}>Cerrar</button>
        </div>
    ) : null;
}

export default Acciones