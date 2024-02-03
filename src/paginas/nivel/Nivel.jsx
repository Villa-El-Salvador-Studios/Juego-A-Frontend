import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Personaje from "../../componentes/personaje/Personaje";
import BarraTurnos from "../../componentes/barraTurnos/BarraTurnos";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
import NotificacionAccion from "../../componentes/notificacionAccion/NotificacionAccion";
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
  const [arrayTurnos, setArrayTurnos] = useState(["Robotin", "URL", "Boss", "Robotin", "URL", "Boss", "Robotin", "URL", "Boss", "Robotin", "URL", "Boss",])
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
  }
  
  const ejecutarHabilidad = (id, tipo, nombre, multiplicadores, infoPersonajes) => {
    let cantidad = 0
    let multiplicador = multiplicadores[nombre]

    if (tipo === "boss") {
      cantidad = infoBoss.ataque * multiplicador
      
      cambiarVidaPersonaje(id, tipo, cantidad);
    } else {  
      cantidad = infoPersonajes
        .filter((personaje) => personaje.id === id)
        .map((personaje) => personaje.ataque * multiplicador)
        .find((valor) => valor !== null);

      console.log("CANTIDAD", cantidad)
      console.log("BOSS ID: ", localStorage.getItem("bossId"))

      cambiarVidaPersonaje(localStorage.getItem("bossId"), tipo, cantidad)
    }
  }

  const cambiarVidaPersonaje = (id, tipo, cantidad) => { //FALTA TESTEAR
    console.log("PARAMETROS CAMBIAR VIDA: ", id, tipo, cantidad)

    if (tipo === "boss") {
      setInfoCajaAcciones({
        ...infoCajaAcciones,
        infoPersonajes: infoCajaAcciones.infoPersonajes.map(personaje => personaje.id === id ? {...personaje, vida: personaje.vida - cantidad} : personaje),
      })

      setVidaActualPersonaje(infoCajaAcciones.infoPersonajes.map(personaje => personaje.id === id ? personaje.vida - cantidad : personaje.vida));
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
  const [vidaActualBoss, setVidaActualBoss] = useState(1);
  const [vidaActualPersonaje, setVidaActualPersonaje] = useState(0);

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

  const fetchData = async () => {
    try {
      const nivelResponse = await MundoService.GetById(mundoId);
      setInfoNivel(nivelResponse.data);
      localStorage.setItem("bossId", nivelResponse.data.personaje_Id);

      let personajeId = localStorage.getItem("bossId");
      PersonajeService.GetById(personajeId).then((response) => {
        setInfoBoss(response.data);
      })

      const persojeResponse = await PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId"))

      PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId"))
        .then((response) => {
          setPersonajes(obtenerPersonajesIds(response.data))
        })

      setInfoCajaAcciones(prevState => ({
        ...prevState,
        infoPersonajes: persojeResponse.data,
        imagenesPersonajes: obtenerImagen(persojeResponse.data)
      }))

      let personajesId = persojeResponse.data.map(personaje => personaje.id);
      obtenerHabilidades(personajesId);
      

      const objetosResponse = await ObjetoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreObjetos: obtenerNombres(objetosResponse.data),
        descripcionObjetos: obtenerDescripciones(objetosResponse.data),
        imagenesObjetos: obtenerImagen(objetosResponse.data)
      }))

      const hechizosResponse = await HechizoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreHechizos: obtenerNombres(hechizosResponse.data),
        descripcionHechizos: obtenerDescripciones(hechizosResponse.data),
        imagenesHechizos: obtenerImagen(hechizosResponse.data)
      }))
      
      let nombresMultiplicadores = {};

      HabilidadService.GetAll().then((response) => {
        setMultiplicadoresHabilidades(nombresMultiplicadores = response.data.reduce((obj, item) => {
          obj[item.nombre] = item.multiplicador;
          return obj;
        }, {}))
      })

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

  const mundoBGStyle = {
    backgroundImage: `url(${infoNivel.imagenFondo})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ajusta la altura según tus necesidades
    width: "100vw", // Ajusta el ancho según tus necesidades
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setPersonajeActivoId(personajes[0])
  }, [personajes])
  
  useEffect(() => {
      setVidaActualBoss(infoBoss.vida);
  }, [infoBoss])

  useEffect(() => {
    setVidaActualPersonaje(infoCajaAcciones.infoPersonajes[0]?.vida);
  })

  useEffect(() => {
    setInfoCajaAcciones(prevState => ({
      ...prevState,
      idsPersonajes: personajes,
      personajeActivoId: personajeActivoId
    }))
  }, [personajeActivoId, personajes]);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que infoCajaAcciones.infoPersonajes cambie
    if (infoCajaAcciones.infoPersonajes.length > 0) {
      const vidaActual = obtenerPersonajePorId(infoCajaAcciones.infoPersonajes, personajeActivoId)?.vida;
      setVidaActualPersonaje(vidaActual);
    }
  
  }, [infoCajaAcciones.infoPersonajes, personajeActivoId]);

  useEffect(() => {
    console.log("VIDA ACTUAL BOSS 1: ", vidaActualBoss)
    if (vidaActualBoss <= 0 && loading === false) {
      console.log("VIDA ACTUAL BOSS 2: ", vidaActualBoss)
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
              <div className="mundo-center">
                <Personaje nombre={infoBoss.nombre} imagen={infoBoss.imagen} vidaMaxima={infoBoss.vida} vidaActual={vidaActualBoss} categoria={"boss"}/>
                <Personaje nombre={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "nombre")} imagen={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "imagen")} vidaMaxima={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "vida")} vidaActual={vidaActualPersonaje} categoria={"personaje"}/>
                <CajaAcciones infoCajaAcciones={infoCajaAcciones} mostrarNotificacion={mostrarNotificacion} personajeActivoId={personajeActivoId} multiplicadores={multiplicadoresHabilidades}/>
                <NotificacionAccion tipoAccion={notificacionTipo} eleccion={notificacionEleccion} visible={notificacionVisible} />
              </div>
            </div>
          )}
    </div>
  );
};

export default Nivel;
