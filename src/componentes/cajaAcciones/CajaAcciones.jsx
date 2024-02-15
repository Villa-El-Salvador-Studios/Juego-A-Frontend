import { useState, useEffect } from "react";
import { useAudio } from '../../shared/AudioContext/AudioContext';
import Acciones from "../acciones/Acciones";
import './CajaAcciones.css';

const CajaAcciones = ({infoCajaAcciones, mostrarNotificacion, personajeActivoId, multiplicadores, isTurnoJugador, cambiarVidaBoss, cambiarVidaPersonaje, cambiarTurno, infoBoss, bossNombresHabilidades, vidaActualBoss, vidaActualPersonajeActivo, nombrePersonajeActivo, cantidadObjetos, cambiarTurnosVeneno, toggleVeneno, cambiarVidaAnterior, cambiarHabilidadElegidaBoss}) => {
    const { playHabilitySFX, obtenerLongitudAudio, playSituationAudio } = useAudio();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMuerte, setIsOpenMuerte] = useState(true);
    const [tipoAccion, setTipoAccion] = useState(null);
    const [bonusAtaque, setBonusAtaque] = useState(false);
    const [isVeneno, setIsVeneno] = useState(false);
    const [cantidadObjetosPersonaje, setCantidadObjetosPersonaje] = useState({});
    const [contadorVeneno, setContadorVeneno] = useState(3)
    const [habilidadElegidaPersonaje, setHabilidadElegida] = useState(null)
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

    const cambiarHabilidadElegidaPersonaje = (habilidad) => {
        setHabilidadElegida(habilidad)
    }

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

    const ejecutarHabilidad = (tipo, nombreHabilidad, duracion) => {
        let cantidad = 0
        let multiplicador = multiplicadores[nombreHabilidad]

        if (tipo === "boss") {
            cantidad = Math.round(infoBoss.ataque * multiplicador)
            
            cambiarVida(personajeActivoId, tipo, cantidad)

            
        } else {
            cantidad = infoCajaAcciones.infoPersonajes
            .filter((personaje) => personaje.id === personajeActivoId)
            .map((personaje) => personaje.ataque * multiplicador)
            .find((valor) => valor !== null);

            if (bonusAtaque) {
                cantidad += 200
            }

            cambiarVida(localStorage.getItem("bossId"), tipo, cantidad)

            setTimeout(() => {
                cambiarTurno(false)
            }, duracion * 1000)
        }
    }

    const cambiarVida = (id, tipo, cantidad) => { //FALTA TESTEAR    
        if (tipo === "boss") {
            const nuevaVidaPersonaje = vidaActualPersonajeActivo[personajeActivoId] - cantidad
            cambiarVidaAnterior(vidaActualPersonajeActivo[personajeActivoId])
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
        } else {
            const nuevaVidaBoss = vidaActualBoss - cantidad
            cambiarVidaBoss(nuevaVidaBoss)
        }
    }

    const funcionesObjetos = [
        () => {
            cambiarVidaAnterior(vidaActualPersonajeActivo[personajeActivoId])
            const nuevaVidaPersonaje = vidaActualPersonajeActivo[personajeActivoId] + 200
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
            setCantidadObjetosPersonaje(prevState => ({
                ...prevState,
                1: prevState[1] - 1
            }))
        },
        () => {
            cambiarVidaAnterior(vidaActualPersonajeActivo[personajeActivoId]);
            const nuevaVidaPersonaje = vidaActualPersonajeActivo[personajeActivoId] + 400
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
            setCantidadObjetosPersonaje(prevState => ({
                ...prevState,
                2: prevState[2] - 1
            }))
        },
        () => {
            cambiarVidaAnterior(vidaActualPersonajeActivo[personajeActivoId]);
            const nuevaVidaPersonaje = vidaActualPersonajeActivo[personajeActivoId] + 600
            cambiarVidaPersonaje(personajeActivoId, nuevaVidaPersonaje)
            setCantidadObjetosPersonaje(prevState => ({
                ...prevState,
                3: prevState[3] - 1
            }))
        },
        () => {
            setBonusAtaque(true)
            setCantidadObjetosPersonaje(prevState => ({
                ...prevState,
                4: prevState[4] - 1
            }))
        },
        () => {
            setIsVeneno(true)
            cambiarTurnosVeneno(3)
            setContadorVeneno(3)
            toggleVeneno("activo")
            setCantidadObjetosPersonaje(prevState => ({
                ...prevState,
                5: prevState[5] - 1
            }))
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

    const [contadorTurnos, setContadorTurnos] = useState(1);
    const [contadorVidaBajaBoss, setContadorVidaBajaBoss] = useState(1);
    const [contadorVidaBajaPersonaje, setContadorVidaBajaPersonaje] = useState(1);
    const [habilidadElegidaBoss, setHabilidadElegidaBoss] = useState("");

    useEffect(() => {
        if (isTurnoJugador === false) {
            if (isVeneno && contadorVeneno > 0) {
                setTimeout(() => {
                    cambiarVidaBoss(vidaActualBoss - ((10/100)*vidaActualBoss))
                }, 500)
                const nuevoContador = contadorVeneno - 1
                setContadorVeneno(prevState => prevState - 1)
                cambiarTurnosVeneno(nuevoContador)

                if (contadorVeneno == 1) {
                    setIsVeneno(false)
                    toggleVeneno("inactivo")
                }
            } else {
                setContadorVeneno(3)
            }

            let habilidadElegida = ""

            const indice = Math.floor(Math.random() * bossNombresHabilidades.length);
    
            habilidadElegida = bossNombresHabilidades[indice];

            setHabilidadElegidaBoss(habilidadElegida)

            if (contadorTurnos > 1) {
                setTimeout(() => {
                    ejecutarHabilidad("boss", habilidadElegida, 0);
                    playHabilitySFX(habilidadElegida);
                    setBonusAtaque(false);
                }, 1000);

                obtenerLongitudAudio(habilidadElegida).then((duracion) => {
                    setTimeout(() => {
                        cambiarTurno(true)
                    }, duracion * 1000);
                })
            } else {
                ejecutarHabilidad("boss", habilidadElegida, 0);
                playHabilitySFX(habilidadElegida);
                setBonusAtaque(false);
                obtenerLongitudAudio(habilidadElegida).then((duracion) => {
                    setTimeout(() => {
                        cambiarTurno(true)
                    }, duracion * 1000);
                })
            }

            const nuevoContador = contadorTurnos + 1
            setContadorTurnos(nuevoContador)
            
        }
    }, [isTurnoJugador])

    useEffect(() => {
        cambiarHabilidadElegidaBoss(habilidadElegidaBoss)
    }, [habilidadElegidaBoss])

    useEffect(() => {
        if (vidaActualPersonajeActivo[personajeActivoId] <= 0) {
            mostrarNotificacion("muerte", nombrePersonajeActivo)
        }
    }, [vidaActualPersonajeActivo])

    useEffect(() => {
        setCantidadObjetosPersonaje(cantidadObjetos)
    }, [])

    useEffect(() => {
        if (vidaActualBoss <= (infoBoss.vida * 33/100) && isTurnoJugador === false && contadorVidaBajaBoss === 1) {
            playSituationAudio("vidaBajaBoss")

            const nuevoContador = contadorVidaBajaBoss + 1
            setContadorVidaBajaBoss(nuevoContador)
        }
    }, [vidaActualBoss, isTurnoJugador])

    useEffect(() => {
        if (vidaActualPersonajeActivo[personajeActivoId] <= (2000 * 33/100) && isTurnoJugador === true && contadorVidaBajaPersonaje === 1) {
            playSituationAudio("vidaBajaPersonaje")
        }
    }, [vidaActualPersonajeActivo[personajeActivoId], isTurnoJugador])

    return (
        <div className="caja-acciones">
            {vidaActualPersonajeActivo[personajeActivoId] <= 0 && (
                <Acciones
                    isOpen={isOpenMuerte}
                    onClose={cerrarAccionesMuerte}
                    tipo="Personajes"
                    informacion={informacionAcciones["Personajes"]}
                    abrirYCerrarAcciones={abrirYCerrarAcciones}
                    mostrarNotificacion={mostrarNotificacion}
                    ejecutarHabilidad={ejecutarHabilidad}
                    vidaActualPersonajeActivo={vidaActualPersonajeActivo}
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
                        cantidadObjetos={cantidadObjetosPersonaje}
                        vidaActualPersonajeActivo={vidaActualPersonajeActivo}
                        setHabilidadElegida={cambiarHabilidadElegidaPersonaje}
                    />

                    <div className="caja-acciones-grid">
                        <button onClick={() => toggleAcciones('Habilidades')}>{infoCajaAcciones.textoList[0]}</button>
                        <button onClick={() => toggleAcciones('Objetos')}>{infoCajaAcciones.textoList[1]}</button>
                        <button onClick={() => toggleAcciones('Personajes')}>{infoCajaAcciones.textoList[2]}</button>
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