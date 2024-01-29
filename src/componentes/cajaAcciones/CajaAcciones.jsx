import { useState, useEffect } from "react";
import Habilidades from "../habilidades/Habilidades";
import './CajaAcciones.css';

const CajaAcciones = ({textoList, personajeActivoId, infoPersonajes, funciones, nombreHabilidades}) => {
    const [isOpen, setIsOpen] = useState(false);

    const informacionAccionesInicial = {
        habilidades: {
            nombres: nombreHabilidades["6"],
            funciones: funciones["habilidades"].funciones
        },
        objetos: {
            nombres: [],
            funciones: funciones["objetos"].funciones
        },
        personajes: {
            nombres: [],
            funciones: funciones["personajes"].funciones
        },
        hechizos: {
            nombres: [],
            funciones: funciones["hechizos"].funciones
        }
    }

    const [informacionAcciones, setInformacionAcciones] = useState(informacionAccionesInicial);

    const toggleHabilidades = () => {
        setIsOpen(!isOpen);
        console.log("Nombres de habildiades: ", informacionAcciones.habilidades.nombres);
    }

    useEffect(() => {
        // Actualizar el array nombres dentro del objeto personajes cuando infoPersonajes cambie
        const nombresPersonajes = infoPersonajes.map(personaje => personaje.nombre);
        setInformacionAcciones(prevState => ({
            ...prevState,
            personajes: {
                ...prevState.personajes,
                nombres: nombresPersonajes
            }
        }));

    }, [infoPersonajes]);

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