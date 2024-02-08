import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Personaje from "../../componentes/personaje/Personaje";
import BarraTurnos from "../../componentes/barraTurnos/BarraTurnos";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
import NotificacionAccion from "../../componentes/notificacionAccion/NotificacionAccion";
import JugadorService from "../../services/jugador-service";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import HabilidadService from "../../services/habilidad-service";
import HechizoService from "../../services/hechizo-service";
import ObjetoService from "../../services/objeto-service";
import HabilidadPersonajeService from "../../services/habilidad-personaje-service";
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

  const cambiarPersonajeActivo = (id) => {
    setPersonajeActivoId(id);
    variablePersonajeActivoId = id
  }
  
  const ejecutarHabilidad = (id, tipo, nombreHabilidad, multiplicadores, infoPersonajes, infoBoss) => {
    let cantidad = 0
    let multiplicador = multiplicadores[nombreHabilidad]

    console.log("PERSONAJE ACTIVO ID: ", id)
    console.log("MULTIPLICADORES: ", multiplicadores)
    console.log("NOMBRE HABILIDAD: ", nombreHabilidad)
    console.log("MULTIPLICADOR: ", multiplicador)

    if (tipo === "boss") {
      console.log("ATAQUE BOSS: ", infoBoss.ataque)
      cantidad = Math.round(infoBoss.ataque * multiplicador)
      console.log("CANTIDAD: ", cantidad)
      
      cambiarVidaPersonaje(id, tipo, cantidad)
    } else {
      cantidad = infoPersonajes
        .filter((personaje) => personaje.id === id)
        .map((personaje) => personaje.ataque * multiplicador)
        .find((valor) => valor !== null);

      cambiarVidaPersonaje(localStorage.getItem("bossId"), tipo, cantidad)

      setTurnoJugador(false)
    }
  }

  const cambiarVidaPersonaje = (id, tipo, cantidad) => { //FALTA TESTEAR
    console.log("PARAMETROS CAMBIAR VIDA: ", id, tipo, cantidad)

    if (tipo === "boss") {
      // Actualizar el estado de vidaActualPersonajeActivo para restar cantidad al valor asociado a id
      setVidaActualPersonajeActivo(prevState => {
        return {
          ...prevState, // Copiar el estado anterior
          [id]: prevState[id] - cantidad // Restar cantidad al valor asociado a id
        };
      });
    } else {
      setVidaActualBoss((prevState) => prevState - cantidad);
    }
  }

  const [infoCajaAcciones, setInfoCajaAcciones] = useState({
    idsPersonajes: [],
    idsHabilidades: {},
    infoPersonajes: [],
    descripcionHechizos: [],
    descripcionObjetos: [],
    funciones: {
      habilidades: ejecutarHabilidad,
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
  const [vidaActualBoss, setVidaActualBoss] = useState(1);
  const [vidaActualPersonajeActivo, setVidaActualPersonajeActivo] = useState({});

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
      }, 3000);
    }

    // Restablecer la visibilidad después de 3 segundos (si la notificación está visible)
    if (notificacionVisible) {
      setTimeout(() => {
        setNotificacionVisible(false);
      }, 3000);
    }
  };

  const obtenerPersonajePorId = (jsonArray, id) => {
    return jsonArray.find(obj => obj.id === id);
  }

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

  let iteracionFetchData = 1

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

      // Al final de fetchData, retorna una promesa resuelta
      return Promise.resolve();
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

  let iteracion = 1
  
  const ejecutarTurno = (tiempo) => {
    if (iteracion % 2 !== 0) {
      if (turnoJugador === true) {

      } else {
        const indice = Math.floor(Math.random() * arrayNombresHabilidades.length);
  
        const habilidadElegida = arrayNombresHabilidades[indice];
  
        // Llamar a ejecutarHabilidad después de 2 segundos
        setTimeout(() => {
          ejecutarHabilidad(variablePersonajeActivoId, "boss", habilidadElegida, objetoMultiplicadoresHabilidades, {}, objetoInfoBoss);
          setTurnoJugador(true);
        }, tiempo); // El tiempo se especifica en milisegundos, por lo que 2000 ms equivalen a 2 segundos
      }
    }
    
    iteracion++
  }

  const mundoBGStyle = {
    backgroundImage: `url(${infoNivel.imagenFondo})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ajusta la altura según tus necesidades
    width: "100vw", // Ajusta el ancho según tus necesidades
  };

  useEffect(() => {
    const startTime = performance.now();

    fetchData()
      .then(() => {
        const endTime = performance.now(); // Registro del tiempo de finalización de fetchData
        const tiempoTranscurrido = endTime - startTime; // Calculo del tiempo transcurrido
        console.log(`fetchData terminado en ${tiempoTranscurrido} milisegundos.`);

        ejecutarTurno(tiempoTranscurrido + 1000);
      });
  }, [turnoJugador]);

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
    if (vidaActualBoss <= 0 && loading === false) {
      actualizarMundoMaximo()
      navegar('/finNivel/victoria');
    }
  }, [vidaActualBoss])

  return (
    <div>
      {loading ? (
        <div className="load-page">
          <div className="spinner"></div>
        </div>
      ) : (
            <div style={mundoBGStyle}>
              <img className='boton-nivel-volver' src={iconoVolver} alt="Botón volver" onClick={regresarMenu} />
              <BarraTurnos arrayTurnos={arrayTurnos} />

              {/*BORRAR BOTON ELIMNAR BOSS*/}
              <button onClick={() => setVidaActualBoss(0)}>Eliminar boss</button>
              
              <div className="mundo-center">
                <Personaje nombre={infoBoss.nombre} imagen={infoBoss.imagen} vidaMaxima={infoBoss.vida} vidaActual={vidaActualBoss} categoria={"boss"}/>
                <Personaje nombre={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "nombre")} imagen={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "imagen")} vidaMaxima={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "vida")} vidaActual={vidaActualPersonajeActivo[personajeActivoId]} categoria={"personaje"}/>
                <CajaAcciones infoCajaAcciones={infoCajaAcciones} mostrarNotificacion={mostrarNotificacion} personajeActivoId={personajeActivoId} multiplicadores={multiplicadoresHabilidades} isTurnoJugador={turnoJugador} />
                <NotificacionAccion tipoAccion={notificacionTipo} eleccion={notificacionEleccion} visible={notificacionVisible} />
              </div>
            </div>
          )}
    </div>
  );
};

export default Nivel;
