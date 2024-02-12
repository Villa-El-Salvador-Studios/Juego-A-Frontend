import { useState, useEffect } from "react";
import Acciones from "../acciones/Acciones";
import './CajaAcciones.css';

const CajaAcciones = ({infoCajaAcciones, mostrarNotificacion, personajeActivoId, multiplicadores, isTurnoJugador, cambiarVidaBoss, cambiarVidaPersonaje, cambiarTurno, infoBoss, bossNombresHabilidades, vidaActualBoss, vidaActualPersonajeActivo, nombrePersonajeActivo, nombreBoss}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMuerte, setIsOpenMuerte] = useState(true);
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

    const cerrarAccionesMuerte = () => {
        setIsOpenMuerte(!isOpenMuerte);
    }

    const ejecutarHabilidad = (tipo, nombreHabilidad) => {
        let cantidad = 0
        let multiplicador = multiplicadores[nombreHabilidad]

        console.log("PERSONAJE ACTIVO ID: ", personajeActivoId)
        console.log("MULTIPLICADORES: ", multiplicadores)
        console.log("NOMBRE HABILIDAD: ", nombreHabilidad)
        console.log("MULTIPLICADOR: ", multiplicador)

        if (tipo === "boss") {
            console.log("ATAQUE BOSS: ", infoBoss.ataque)
            cantidad = Math.round(infoBoss.ataque * multiplicador)
            console.log("CANTIDAD: ", cantidad)
            
            cambiarVida(personajeActivoId, tipo, cantidad)

            cambiarTurno(true)
        } else {
            cantidad = infoCajaAcciones.infoPersonajes
            .filter((personaje) => personaje.id === personajeActivoId)
            .map((personaje) => personaje.ataque * multiplicador)
            .find((valor) => valor !== null);

            cambiarVida(localStorage.getItem("bossId"), tipo, cantidad)

            cambiarTurno(false)
        }
    }

    const cambiarVida = (id, tipo, cantidad) => { //FALTA TESTEAR
        console.log("PARAMETROS CAMBIAR VIDA: ", id, tipo, cantidad)
    
        if (tipo === "boss") {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo - cantidad
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        } else {
            const nuevaVidaBoss = vidaActualBoss - cantidad
            cambiarVidaBoss(nuevaVidaBoss)
        }
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

    useEffect(() => {
        console.log("EJECUTANDO TURNO: ", isTurnoJugador)

        if (isTurnoJugador === false) {
            let habilidadElegida = ""

            const indice = Math.floor(Math.random() * bossNombresHabilidades.length);
    
            habilidadElegida = bossNombresHabilidades[indice];

            setTimeout(() => {
                ejecutarHabilidad("boss", habilidadElegida)
            }, 1500); // 1500 milisegundos = 1.5 segundos
        }
    }, [isTurnoJugador])

    useEffect(() => {
        if (vidaActualPersonajeActivo <= 0) {
            mostrarNotificacion("muerte", nombrePersonajeActivo)
        }
    }, [vidaActualPersonajeActivo])

    return (
        <div className="caja-acciones">
            {vidaActualPersonajeActivo <= 0 && (
                <Acciones
                    isOpen={isOpenMuerte}
                    onClose={cerrarAccionesMuerte}
                    tipo="Personajes"
                    informacion={informacionAcciones["Personajes"]}
                    abrirYCerrarAcciones={abrirYCerrarAcciones}
                    mostrarNotificacion={mostrarNotificacion}
                    ejecutarHabilidad={ejecutarHabilidad}
                />
            )}

            {isTurnoJugador ? (
                <>
                    <Acciones
                        isOpen={isOpen}
                        onClose={toggleAcciones}
                        tipo={tipoAccion}
                        informacion={informacionAcciones[tipoAccion]}
                        abrirYCerrarAcciones={abrirYCerrarAcciones}
                        mostrarNotificacion={mostrarNotificacion}
                        ejecutarHabilidad={ejecutarHabilidad}
                    />

                    <div className="caja-acciones-grid">
                        <button onClick={() => toggleAcciones('Habilidades')}>{infoCajaAcciones.textoList[0]}</button>
                        <button onClick={() => toggleAcciones('Objetos')}>{infoCajaAcciones.textoList[1]}</button>
                        <button onClick={() => toggleAcciones('Personajes')}>{infoCajaAcciones.textoList[2]}</button>
                        <button onClick={() => toggleAcciones('Hechizos')}>{infoCajaAcciones.textoList[3]}</button>
                    </div>
                </>
            ) : (
                <div className="caja-acciones">
                    <h1>Es el turno del boss.</h1>
                </div>
            )}
        </div>
    );
}

export default CajaAcciones