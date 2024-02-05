import './NotificacionCentrada.css';

const NotificacionCentrada = ({isOpen, mensaje, opciones}) => {

    return isOpen ? (
        <div className="notificacion-centrada">
            <h1 className="notificacion-centrada-titulo">{mensaje}</h1>
            <div className='notificacion-centrada-botones'>
                {Object.keys(opciones).map((llave, index) => (
                    <button key={index} className='notificacion-centrada-boton' onClick={opciones.funciones[index]}>
                        {opciones.textos[index]}
                    </button>
                ))}
            </div>
        </div>
    ) : null
}

export default NotificacionCentrada
