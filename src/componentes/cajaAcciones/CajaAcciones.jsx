import { useState, useEffect } from "react";
import Acciones from "../acciones/Acciones";
import './CajaAcciones.css';

const CajaAcciones = ({infoCajaAcciones, mostrarNotificacion, personajeActivoId, multiplicadores, isTurnoJugador, cambiarVidaBoss, cambiarVidaPersonaje, cambiarTurno, infoBoss, bossNombresHabilidades, vidaActualBoss, vidaActualPersonajeActivo, nombrePersonajeActivo, nombreBoss}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMuerte, setIsOpenMuerte] = useState(true);
    const [tipoAccion, setTipoAccion] = useState(null);
    const [bonusAtaque, setBonusAtaque] = useState(false);
    const [isVeneno, setIsVeneno] = useState(false);

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

        if (tipo === "boss") {
            cantidad = Math.round(infoBoss.ataque * multiplicador)
            
            cambiarVida(personajeActivoId, tipo, cantidad)

            cambiarTurno(true)
        } else {
            cantidad = infoCajaAcciones.infoPersonajes
            .filter((personaje) => personaje.id === personajeActivoId)
            .map((personaje) => personaje.ataque * multiplicador)
            .find((valor) => valor !== null);

            console.log("CANTIDAD: ", cantidad)

            if (bonusAtaque) {
                cantidad += 200
                console.log("CANTIDAD + 200: ", cantidad)
            }

            cambiarVida(localStorage.getItem("bossId"), tipo, cantidad)

            setTimeout(() => {
                cambiarTurno(false)
            }, 1000)
        }
    }

    const cambiarVida = (id, tipo, cantidad) => { //FALTA TESTEAR    
        if (tipo === "boss") {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo - cantidad
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        } else {
            const nuevaVidaBoss = vidaActualBoss - cantidad
            cambiarVidaBoss(nuevaVidaBoss)
        }
    }

    const funcionesObjetos = [
        () => {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo + 200
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        },
        () => {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo + 400
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        },
        () => {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo + 600
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        },
        () => {
            console.log("Objeto 4")
            setBonusAtaque(true)
        },
        () => {
            console.log("Objeto 5")
            setIsVeneno(true)
        }
    ]

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

    const [contadorVeneno, setContadorVeneno] = useState(0)

    useEffect(() => {
        if (isTurnoJugador === false) {
            if (isVeneno && contadorVeneno < 3) {
                setTimeout(() => {
                    cambiarVidaBoss(vidaActualBoss - 100)
                }, 500)

                console.log("VENENO", contadorVeneno)

                setContadorVeneno(prevState => prevState + 1)
            } else {
                setIsVeneno(false)
                setContadorVeneno(0)
            }

            let habilidadElegida = ""

            const indice = Math.floor(Math.random() * bossNombresHabilidades.length);
    
            habilidadElegida = bossNombresHabilidades[indice];

            setTimeout(() => {
                ejecutarHabilidad("boss", habilidadElegida)
                setBonusAtaque(false)
            }, 1000); // 1000 milisegundos = 1 segundo
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
                        funcionesObjetos={funcionesObjetos}
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