import { useState, useEffect } from "react";
import Acciones from "../acciones/Acciones";
import './CajaAcciones.css';

const CajaAcciones = ({infoCajaAcciones, mostrarNotificacion, personajeActivoId, multiplicadores, isTurnoJugador}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tipoAccion, setTipoAccion] = useState(null);

    const [informacionAcciones, setInformacionAcciones] = useState({
        Habilidades: {
            funciones: [],
            nombres: []
        },
        Hechizos: {
            descripciones: [],
            funciones: [],
            imagenes: [],
            nombres: []
        },
        Objetos: {
            descripciones: [],
            funciones: [],
            imagenes: [],
            nombres: []
        },
        Personajes: {
            funciones: () => {},
            ids: [],
            imagenes: [],
            nombres: []
        }
    });

    const obtenerNombresPersonajes = (jsonArray) => {
        return jsonArray ? jsonArray.map(obj => obj.nombre) : [];
    }

    const abrirYCerrarAcciones = () => {
        setIsOpen(!isOpen);
    }

    const toggleAcciones = (tipo) => {
        abrirYCerrarAcciones();
        setTipoAccion(tipo);
    }

    useEffect(() => {
        // Actualizar datos de caja de acciones
        setInformacionAcciones(prevState => ({
            ...prevState,
            Habilidades: {
                ...prevState.habilidades,
                nombres: infoCajaAcciones.idsHabilidades[infoCajaAcciones.personajeActivoId],
                funciones: infoCajaAcciones.funciones["habilidades"]
            },
            Objetos: {
                ...prevState.objetos,
                nombres: infoCajaAcciones.nombreObjetos,
                descripciones: infoCajaAcciones.descripcionObjetos,
                funciones: infoCajaAcciones.funciones["objetos"],
                imagenes: infoCajaAcciones.imagenesObjetos
            },
            Personajes: {
                ...prevState.personajes,
                ids: infoCajaAcciones.idsPersonajes,
                imagenes: infoCajaAcciones.imagenesPersonajes,
                nombres: obtenerNombresPersonajes(infoCajaAcciones.infoPersonajes),
                funciones: infoCajaAcciones.funciones["personajes"]
            },
            Hechizos: {
                ...prevState.hechizos,
                nombres: infoCajaAcciones.nombreHechizos,
                descripciones: infoCajaAcciones.descripcionHechizos,
                funciones: infoCajaAcciones.funciones["hechizos"],
                imagenes: infoCajaAcciones.imagenesHechizos
            }
        }));
    }, [infoCajaAcciones]);

    return isTurnoJugador ? (
        <div className="caja-acciones">
            <Acciones isOpen={isOpen} onClose={toggleAcciones} tipo={tipoAccion} informacion={informacionAcciones[tipoAccion]} infoPersonajes={infoCajaAcciones.infoPersonajes} abrirYCerrarAcciones={abrirYCerrarAcciones} mostrarNotificacion={mostrarNotificacion} personajeActivoId={personajeActivoId} multiplicadores={multiplicadores}/>
            <div className="caja-acciones-grid">
                <button onClick={() => toggleAcciones('Habilidades')}>{infoCajaAcciones.textoList[0]}</button>
                <button onClick={() => toggleAcciones('Objetos')}>{infoCajaAcciones.textoList[1]}</button>
                <button onClick={() => toggleAcciones('Personajes')}>{infoCajaAcciones.textoList[2]}</button>
                <button onClick={() => toggleAcciones('Hechizos')}>{infoCajaAcciones.textoList[3]}</button>
            </div>
        </div>
    ) : (
        <div className="caja-acciones">
            <h1>Es el turno del boss.</h1>
        </div>
    )
}

export default CajaAcciones