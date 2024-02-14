import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Personaje from "../../componentes/personaje/Personaje";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
import NotificacionAccion from "../../componentes/notificacionAccion/NotificacionAccion";
import JugadorService from "../../services/jugador-service";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import HabilidadService from "../../services/habilidad-service";
import HechizoService from "../../services/hechizo-service";
import ObjetoService from "../../services/objeto-service";
import HabilidadPersonajeService from "../../services/habilidad-personaje-service";
import JugadorObjetoService from "../../services/jugador-objeto-service";
import "./Nivel.css";

const Nivel = () => {
  let habilidadesDePersonajes = {}
  let mundoId = Number(localStorage.getItem("nivel"));
  let objetoAux = {} //guarda los nombres de las habilidades asociadas a los IDs de lospersonajes
  let arrayNombresHabilidades = []
  let objetoMultiplicadoresHabilidades = {}
  let objetoInfoBoss = {}
  let variablePersonajeActivoId = 0

  const iconoVolver = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuNDI3IDMuMDIxaC03LjQyN3YtMy4wMjFsLTYgNS4zOSA2IDUuNjF2LTNoNy40MjdjMy4wNzEgMCA1LjU2MSAyLjM1NiA1LjU2MSA1LjQyNyAwIDMuMDcxLTIuNDg5IDUuNTczLTUuNTYxIDUuNTczaC03LjQyN3Y1aDcuNDI3YzUuODQgMCAxMC41NzMtNC43MzQgMTAuNTczLTEwLjU3M3MtNC43MzMtMTAuNDA2LTEwLjU3My0xMC40MDZ6Ii8+PC9zdmc+"
  const navegar = useNavigate();

  const [infoBoss, setInfoBoss] = useState({
    id: 0,
    vida: 0,
    nivel: 0,
    nombre: "",
    ataque: 0,
    experiencia: 0,
    imagen: "",
    jugadorId: 0,
  });
  const [arrayTurnos, setArrayTurnos] = useState([])
  const [infoNivel, setInfoNivel] = useState({
    id: 0,
    xp: 0,
    estado: 0,
    imagenFondo: "",
    songId: 0,
    nombre: "",
    personaje_Id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [multiplicadoresHabilidades, setMultiplicadoresHabilidades] = useState({});
  const [personajeActivoId, setPersonajeActivoId] = useState(0);
  const [personajes, setPersonajes] = useState([]);
  const [cantidadObjetos, setCantidadObjetos] = useState({});
  const [isVeneno, setIsVeneno] = useState(false);
  const [turnosVeneno, setTurnosVeneno] = useState(3);
  const [vidaAnteriorPersonaje, setVidaAnteriorPersonaje] = useState(0);

  const cambiarVidaAnterior = (vida) => {
    setVidaAnteriorPersonaje(vida)
  }

  const cambiarPersonajeActivo = (id) => {
    setPersonajeActivoId(id);
    variablePersonajeActivoId = id
  }
  
  const cambiarVidaBoss = (vida) => {
    setVidaActualBoss(vida)
  }

  const cambiarVidaPersonajeActivo = (id, vida) => {
    setVidaActualPersonajeActivo((prevState) => {
      return {
        ...prevState,
        [id]: vida,
      }
    })
  }

  const cambiarTurno = (estado) => {
    setTurnoJugador(estado)
  }

  const cambiarTurnosVeneno = (turnos) => {
    setTurnosVeneno(turnos)
  }

  const toggleVeneno = (estado) => {
    if (estado === "activo") {
      setIsVeneno(true)
    } else {
      setIsVeneno(false)
    }
  }

  const [vidaActualBoss, setVidaActualBoss] = useState(1);
  const [vidaActualPersonajeActivo, setVidaActualPersonajeActivo] = useState({});

  const [infoCajaAcciones, setInfoCajaAcciones] = useState({
    idsPersonajes: [],
    idsHabilidades: {},
    infoPersonajes: [],
    descripcionHechizos: [],
    descripcionObjetos: [],
    funciones: {
      habilidades: () => {console.log("Habilidad 1")},
      objetos: [() => {console.log("Objeto 1")}, () => {console.log("Objeto 2")}, () => {console.log("Objeto 3")}, () => {console.log("Objeto 4")}, () => {console.log("Objeto 5")}, () => {console.log("Objeto 6")}],
      personajes: cambiarPersonajeActivo,
      hechizos: [() => {console.log("Hechizo 1")}, () => {console.log("Hechizo 2")}]
    },
    imagenesHechizos: [],
    imagenesObjetos: [],
    imagenesPersonajes: [],
    nombresHabilidades: {},
    nombreHechizos: [],
    nombreObjetos: [],
    personajeActivoId: 0,
    textoList: ["Habilidades", "Objetos", "Personajes", "Hechizos"]
  });
  const [notificacionEleccion, setNotificacionEleccion] = useState('');
  const [notificacionTipo, setNotificacionTipo] = useState('');
  const [notificacionVisible, setNotificacionVisible] = useState(false);
  const [turnoJugador, setTurnoJugador] = useState(false);

  const cambiarNumerosPorNombres = (arrayDeNumeros, nombresDeHabilidades) => {
    return arrayDeNumeros.map((numero) => nombresDeHabilidades[numero]);
  };

  const mostrarNotificacion = (tipoAccion, eleccion) => {
    setNotificacionTipo(tipoAccion);
    setNotificacionEleccion(eleccion);

    // Asegurarse de que la notificación solo se muestre si hay una acción específica
    if (tipoAccion) {
      setNotificacionVisible(true);

      // Ocultar la notificación después de un tiempo (por ejemplo, 3 segundos)
      setTimeout(() => {
        setNotificacionVisible(false);
      }, 1000);
    }

    // Restablecer la visibilidad después de 3 segundos (si la notificación está visible)
    if (notificacionVisible) {
      setTimeout(() => {
        setNotificacionVisible(false);
      }, 3000);
    }
  };

  const obtenerNombres = (data) => {
    return data.map(objeto => objeto.nombre);
  }

  const obtenerDescripciones = (data) => {
    return data.map(objeto => objeto.descripcion);
  }

  const obtenerImagen = (data) => {
    return data.map(objeto => objeto.imagen);
  }

  const obtenerNombresHabilidades = async (habilidadesDePersonajes) => {
    try {
      // Obtener todos los IDs en un array
      const todosLosIds = [].concat(...Object.values(habilidadesDePersonajes));

      // Crear un objeto que mapea los IDs de habilidades a sus nombres
      const nombresHabilidades = {};
  
      // Iterar sobre cada ID y obtener el nombre de la habilidad
      for (const habilidadId of todosLosIds) {
        const habilidadResponse = await HabilidadService.GetByHabilidadId(habilidadId);

        nombresHabilidades[habilidadId] = habilidadResponse.data.nombre;

        setInfoCajaAcciones(prevState => ({
          ...prevState,
          nombresHabilidades: ({
            ...prevState.nombresHabilidades,
            [habilidadResponse.data.nombre]: habilidadResponse.data.multiplicador
          })
        }))
      }

      for (const personajeId in habilidadesDePersonajes) {
        objetoAux[personajeId] = cambiarNumerosPorNombres(habilidadesDePersonajes[personajeId], nombresHabilidades);
      }

      setInfoCajaAcciones(prevState => ({
        ...prevState,
        idsHabilidades: objetoAux
      }))

    } catch (error) {
      console.error('Error al obtener nombres de habilidades: ', error);
    }
  }

  const obtenerHabilidades = async (personajesId) => {
    // Itera sobre los personajesId
    for (let i = 0; i < personajesId.length; i++) {
      try {
        // Obtiene las habilidades asociadas al personajeId
        const habilidadPersonajeResponse = await HabilidadPersonajeService.GetByPersonajeId(personajesId[i]);

        // Extrae el habilidadId del response y lo asigna al personajeId correspondiente
        const habilidadIds = habilidadPersonajeResponse.data.map((item) => item.habilidadId);

        habilidadesDePersonajes[personajesId[i]] = habilidadIds;
      } catch (error) {
        console.error(`Error al obtener habilidades para el personaje con id ${personajesId[i]}`, error);
      }
    }

    obtenerNombresHabilidades(habilidadesDePersonajes);
  };

  const obtenerPersonajesIds = (jsonArray) => {
    return jsonArray ? jsonArray.map(obj => obj.id) : [];
  }

  const fetchData = async () => {
    try {
      //JALA LA INFORMACION DEL MUNDO
      const mundoResponse = await MundoService.GetById(mundoId);
      const response = mundoResponse.data;

      setInfoNivel(response);

      localStorage.setItem("bossId", response.personaje_Id);

      let bossId = localStorage.getItem("bossId");
      const bossResponse = await PersonajeService.GetById(bossId);
      const bossData = bossResponse.data;

      setInfoBoss(bossData)
      objetoInfoBoss = bossData

      //SETEAR EL ARRAY DE TURNOS
      const nuevoArray = [...arrayTurnos];
      nuevoArray.push(bossData.nombre);
      setArrayTurnos(nuevoArray);

      //JALAR LA INFORMACIÓN DEL BOSS
      const habilidadPersonajeResponse = await HabilidadPersonajeService.GetByPersonajeId(bossId);
      const habilidadPersonajeData = habilidadPersonajeResponse.data;

      setBossHabilidadIds(habilidadPersonajeData.map(habilidadPersonaje => habilidadPersonaje.habilidadId));

      const arrayBossHIDs = habilidadPersonajeData.map(habilidadPersonaje => habilidadPersonaje.habilidadId);

      for (let i = 0; i < arrayBossHIDs.length; i++) {
        const habilidadResponse = await HabilidadService.GetByHabilidadId(arrayBossHIDs[i]);

        const nombreHabilidad = habilidadResponse.data.nombre;

        // Verificar si el nombre de la habilidad ya está en el arreglo
        if (!arrayNombresHabilidades.includes(nombreHabilidad)) {
            arrayNombresHabilidades.push(nombreHabilidad);
        }
      }

      setBossNombresHabilidades(arrayNombresHabilidades)

      //JALAR LA INFORMACION DEL JUGADOR
      const personajeResponse = await PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId"));
      setPersonajes(obtenerPersonajesIds(personajeResponse.data));
      variablePersonajeActivoId = personajeResponse.data[0].id

      setInfoCajaAcciones(prevState => ({
        ...prevState,
        infoPersonajes: personajeResponse.data,
        imagenesPersonajes: obtenerImagen(personajeResponse.data)
      }));

      // Creamos un objeto para almacenar las vidas actuales de los personajes activos
      const vidaActual = {};
      // Iteramos sobre cada objeto en personajeResponse y extraemos id y vida
      personajeResponse.data.forEach(personaje => {
        vidaActual[personaje.id] = personaje.vida;
      });
      // Actualizamos el estado con las vidas actuales
      setVidaActualPersonajeActivo(vidaActual);

      let personajesId = personajeResponse.data.map(personaje => personaje.id);
      obtenerHabilidades(personajesId);

      //JALAR LA INFORMACION DE LOS OBJETOS
      const objetosResponse = await ObjetoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreObjetos: obtenerNombres(objetosResponse.data),
        descripcionObjetos: obtenerDescripciones(objetosResponse.data),
        imagenesObjetos: obtenerImagen(objetosResponse.data)
      }));

      //JALAR LA INFORMACION DE LOS HECHIZOS
      const hechizosResponse = await HechizoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreHechizos: obtenerNombres(hechizosResponse.data),
        descripcionHechizos: obtenerDescripciones(hechizosResponse.data),
        imagenesHechizos: obtenerImagen(hechizosResponse.data)
      }));

      //JALAR LA INFORMACION DE LAS HABILIDADES
      const habilidadesResponse = await HabilidadService.GetAll();
      setMultiplicadoresHabilidades(habilidadesResponse.data.reduce((obj, item) => {
        obj[item.nombre] = item.multiplicador;
        return obj;
      }, {}));

      objetoMultiplicadoresHabilidades = habilidadesResponse.data.reduce((obj, item) => {
        obj[item.nombre] = item.multiplicador;
        return obj;
      }, {})

      let objetoCantidadObjetos = {}

      for (let i = 1; i < 6; i++) {
        const cantidadObjetosResponse = await JugadorObjetoService.GetByJugadorIdAndObjetoId(localStorage.getItem("jugadorId"), i);
        objetoCantidadObjetos[i] = cantidadObjetosResponse.data.cantidad
      }

      setCantidadObjetos(objetoCantidadObjetos)
    } catch (error) {
      console.error("Hubo un error al obtener la información.", error);
    } finally {
      setLoading(false);
    }
  }


  // Función para buscar la información de un personaje por su id
  const findCharacterByPlayerId = (jsonArray, id, objetivo) => {
    if (objetivo === "nombre") {
      const character = jsonArray.find(obj => obj.id === id);
      return character ? character.nombre : null; // Retorna null si no se encuentra el id
    } else if (objetivo === "imagen") {
      const character = jsonArray.find(obj => obj.id === id);
      return character ? character.imagen : null; // Retorna null si no se encuentra el id
    } else {
      const character = jsonArray.find(obj => obj.id === id);
      return character ? character.vida : null; // Retorna null si no se encuentra el id
    }
  };

  const regresarMenu = () => {
    navegar('/selector-niveles');
  }

  const actualizarMundoMaximo = () => {
    let infoJugador = {}

    try {
      JugadorService.GetById(localStorage.getItem("jugadorId")).then((response) => {
        infoJugador = {
          "usuario": response.data.usuario,
          "contrasenia": response.data.contrasenia,
          "fotoPerfil": response.data.fotoPerfil,
          "mundoMaximo": Number(response.data.mundoMaximo) + 1,
          "mundoId": response.data.mundoId
        }

        JugadorService.Update(localStorage.getItem("jugadorId"), infoJugador)
      })
    } catch (error) {
      console.error("Hubo un error al obtener la información.", error);
    }
  }
  
  const [bossHabilidadIds, setBossHabilidadIds] = useState([]);
  const [bossNombresHabilidades, setBossNombresHabilidades] = useState([]);

  const mundoBGStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${infoNivel.imagenFondo})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ajusta la altura según tus necesidades
    width: "100vw", // Ajusta el ancho según tus necesidades
  };

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    setPersonajeActivoId(personajes[0])
  }, [personajes])
  
  useEffect(() => {
      setVidaActualBoss(infoBoss.vida);
  }, [infoBoss])

  useEffect(() => {
    setInfoCajaAcciones(prevState => ({
      ...prevState,
      idsPersonajes: personajes,
      personajeActivoId: personajeActivoId
    }))
  }, [personajeActivoId, personajes]);

  useEffect(() => {
    const todasLasVidasMenorOIgualACero = Object.values(vidaActualPersonajeActivo).every(vida => vida <= 0);

    if (vidaActualBoss <= 0 && loading === false) {
      actualizarMundoMaximo()
      navegar('/finNivel/victoria');
    } else if (todasLasVidasMenorOIgualACero === true && loading === false) {
      navegar('/finNivel/derrota');
    }
  }, [vidaActualBoss, vidaActualPersonajeActivo, loading])

  return (
    <div>
      {loading ? (
        <div className="load-page">
          <div className="spinner"></div>
        </div>
      ) : (
            <div style={mundoBGStyle}>
              <img className='boton-nivel-volver' src={iconoVolver} alt="Botón volver" onClick={regresarMenu} />
              
              {/*BORRAR BOTON ELIMNAR BOSS*/}
              <button onClick={() => setVidaActualBoss(0)}>Eliminar boss</button>
              
              <div className="mundo-center">
                <Personaje
                  nombre={infoBoss.nombre}
                  imagen={infoBoss.imagen}
                  vidaMaxima={infoBoss.vida}
                  vidaActual={vidaActualBoss}
                  vidaAnterior={infoBoss.vida}
                  categoria={"boss"}
                  isVeneno={isVeneno}
                  turnosVeneno={turnosVeneno}
                />
                <Personaje
                  nombre={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "nombre")}
                  imagen={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "imagen")}
                  vidaMaxima={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "vida")}
                  vidaAnterior={vidaAnteriorPersonaje}
                  vidaActual={vidaActualPersonajeActivo[personajeActivoId]} categoria={"personaje"}
                />
                <CajaAcciones
                  infoCajaAcciones={infoCajaAcciones}
                  mostrarNotificacion={mostrarNotificacion}
                  personajeActivoId={personajeActivoId}
                  multiplicadores={multiplicadoresHabilidades}
                  isTurnoJugador={turnoJugador}
                  cambiarVidaBoss={cambiarVidaBoss}
                  cambiarVidaPersonaje={cambiarVidaPersonajeActivo}
                  cambiarTurno={cambiarTurno}
                  infoBoss={infoBoss}
                  bossNombresHabilidades={bossNombresHabilidades}
                  vidaActualBoss={vidaActualBoss}
                  vidaActualPersonajeActivo={vidaActualPersonajeActivo}
                  cambiarVidaAnterior={cambiarVidaAnterior}
                  nombrePersonajeActivo={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "nombre")}
                  cantidadObjetos={cantidadObjetos}
                  cambiarTurnosVeneno={cambiarTurnosVeneno}
                  toggleVeneno={toggleVeneno}
                />
                <NotificacionAccion
                  tipoAccion={notificacionTipo}
                  eleccion={notificacionEleccion}
                  visible={notificacionVisible}
                />
              </div>
            </div>
          )}
    </div>
  );
};

export default Nivel;
