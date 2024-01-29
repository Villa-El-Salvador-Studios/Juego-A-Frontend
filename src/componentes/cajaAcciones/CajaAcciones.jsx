import { useState, useEffect } from "react";
import Acciones from "../habilidades/Acciones";
import './CajaAcciones.css';

const CajaAcciones = ({infoCajaAcciones}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [informacionAcciones, setInformacionAcciones] = useState({
        habilidades: {
            nombres: [],
            funciones: []
        },
        objetos: {
            nombres: [],
            funciones: []
        },
        personajes: {
            nombres: [],
            funciones: []
        },
        hechizos: {
            nombres: [],
            funciones: []
        }
    });

    const obtenerNombresPersonajes = (jsonArray) => {
        return jsonArray ? jsonArray.map(obj => obj.nombre) : [];
    }

    const toggleHabilidades = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        // Actualizar datos de caja de acciones
        setInformacionAcciones(prevState => ({
            ...prevState,
            habilidades: {
                ...prevState.habilidades,
                nombres: infoCajaAcciones.nombreHabilidades[infoCajaAcciones.personajeActivoId],
                funciones: infoCajaAcciones.funciones["habilidades"]
            },
            objetos: {
                ...prevState.objetos,
                funciones: infoCajaAcciones.funciones["objetos"]  
            },
            personajes: {
                ...prevState.personajes,
                nombres: obtenerNombresPersonajes(infoCajaAcciones.infoPersonajes),
                funciones: infoCajaAcciones.funciones["personajes"]
            },
            hechizos: {
                ...prevState.hechizos,
                funciones: infoCajaAcciones.funciones["hechizos"]
            }
        }));

        console.log("Informacion Acciones: ", informacionAcciones);
    }, [infoCajaAcciones]);

    return (
        <div className="caja-acciones">
            <Acciones isOpen={isOpen} onClose={toggleHabilidades} informacion={informacionAcciones} />
            <div className="caja-acciones-grid">
                <button onClick={toggleHabilidades}>{infoCajaAcciones.textoList[0]}</button>
                <button>{infoCajaAcciones.textoList[1]}</button>
                <button>{infoCajaAcciones.textoList[2]}</button>
                <button>{infoCajaAcciones.textoList[3]}</button>
            </div>
        </div>
    )
}

export default CajaAcciones