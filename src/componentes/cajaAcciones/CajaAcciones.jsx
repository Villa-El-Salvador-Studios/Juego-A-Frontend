import './CajaAcciones.css';

const CajaAcciones = ({textoList}) => {
    return (
        <div className="caja-acciones">
            <button>{textoList[0]}</button>
            <button>{textoList[1]}</button>
            <button>{textoList[2]}</button>
            <button>{textoList[3]}</button>
        </div>
    )
}

export default CajaAcciones