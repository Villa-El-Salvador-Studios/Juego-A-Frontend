import './NotificacionAccion.css'

const NotificacionAccion = ({tipoAccion, eleccion, visible}) => {
    let mensaje = '';

    switch (tipoAccion) {
        case 'habilidades':
        case 'objetos':
        case 'hechizos':
        mensaje = `El jugador ha usado ${eleccion}`;
        break;
        case 'personajes':
        mensaje = `El jugador ha llamado a ${eleccion}`;
        break;
        default:
        mensaje = 'Acción realizada';
    }

    return visible ? (
        <div className={"notificacion-accion"}>
            <p className="notificacion-accion-texto">{mensaje}</p>
        </div>
    ) : null;
}

export default NotificacionAccion
