import { useState } from "react";
import Habilidades from "../habilidades/Habilidades";
import './CajaAcciones.css';

const CajaAcciones = ({textoList}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHabilidades = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="caja-acciones">
            <Habilidades isOpen={isOpen} onClose={toggleHabilidades}/>
            <div className="caja-acciones-grid">
                <button onClick={toggleHabilidades}>{textoList[0]}</button>
                <button>{textoList[1]}</button>
                <button>{textoList[2]}</button>
                <button>{textoList[3]}</button>
            </div>
        </div>
    )
}

export default CajaAcciones