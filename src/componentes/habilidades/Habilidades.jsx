import './Habilidades.css';

const Habilidades = ({isOpen, onClose, informacion}) => {
    return isOpen ? (
        <div className="habilidades">
            <h1>Habilidades</h1>
            <button onClick={onClose}>Cerrar</button>
        </div>
    ) : null;
}

export default Habilidades