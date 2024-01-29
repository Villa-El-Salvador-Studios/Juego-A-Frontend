import { useEffect, useState } from "react";
import Personaje from "../../componentes/personaje/Personaje";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
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

  const textoList = ["Habilidades", "Objetos", "Personajes", "Hechizos"];

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

  const [infoPersonajes, setInfoPersonajes] = useState([])

  const [loading, setLoading] = useState(true);

  const [nombreHabilidades, setNombreHabilidades] = useState({});

  const [personajeActivo, setPersonajeActivo] = useState(0);

  const [personajeActivoId, setPersonajeActivoId] = useState(6);

  const [infoCajaAcciones, setInfoCajaAcciones] = useState({
    infoPersonajes: [],
    descripcionHechizos: [],
    descripcionObjetos: [],
    funciones: {
      habilidades: [() => {console.log("Habilidad 1")}, () => {console.log("Habilidad 2")}, () => {console.log("Habilidad 3")}, () => {console.log("Habilidad 4")}],
      objetos: [() => {console.log("Objeto 1")}, () => {console.log("Objeto 2")}, () => {console.log("Objeto 3")}, () => {console.log("Objeto 4"), console.log("Objeto 5")}, () => {console.log("Objeto 6")}],
      personajes: [() => {console.log("Personaje 1")}, () => {console.log("Personaje 2")}, () => {console.log("Personaje 3")}, () => {console.log("Personaje 4")}],
      hechizos: [() => {console.log("Hechizo 1")}, () => {console.log("Hechizo 2")}]
    },
    nombreHabilidades: {},
    nombreHechizos: [],
    nombreObjetos: [],
    personajeActivoId: 0,
    textoList: ["Habilidades", "Objetos", "Personajes", "Hechizos"]
  });

  const [vidaActualBoss, setVidaActualBoss] = useState(0);

  const [vidaActualPersonaje, setVidaActualPersonaje] = useState(0);

  const cambiarNumerosPorNombres = (arrayDeNumeros, nombresDeHabilidades) => {
    return arrayDeNumeros.map((numero) => nombresDeHabilidades[numero]);
  };

  const obtenerNombres = (data) => {
    return data.map(objeto => objeto.nombre);
  }

  const obtenerDescripciones = (data) => {
    return data.map(objeto => objeto.descripcion);
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
      }

      for (const personajeId in habilidadesDePersonajes) {
        objetoAux[personajeId] = cambiarNumerosPorNombres(habilidadesDePersonajes[personajeId], nombresHabilidades);
      }

      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreHabilidades: objetoAux
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

  const fetchData = async () => {
    try {
      const nivelResponse = await MundoService.GetById(mundoId);
      setInfoNivel(nivelResponse.data);
      localStorage.setItem("bossId", nivelResponse.data.personaje_Id);

      let personajeId = localStorage.getItem("bossId");
      const bossResponse = await PersonajeService.GetById(personajeId);
      setInfoBoss(bossResponse.data);
      setVidaActualBoss(bossResponse.data.vida);

      const persojeResponse = await PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId"));
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        infoPersonajes: persojeResponse.data
      }))
      setVidaActualPersonaje(persojeResponse.data[0].vida);

      let personajesId = persojeResponse.data.map(personaje => personaje.id);
      obtenerHabilidades(personajesId);
      

      const objetosResponse = await ObjetoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreObjetos: obtenerNombres(objetosResponse.data),
        descripcionObjetos: obtenerDescripciones(objetosResponse.data)
      }))

      const hechizosResponse = await HechizoService.GetAll();
      setInfoCajaAcciones(prevState => ({
        ...prevState,
        nombreHechizos: obtenerNombres(hechizosResponse.data),
        descripcionHechizos: obtenerDescripciones(hechizosResponse.data)
      }))

    } catch (error) {
      console.error("Hubo un error al obtener la información.", error);
    } finally {
      setLoading(false);
    }
  };

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

  const mundoBGStyle = {
    backgroundImage: `url(${infoNivel.imagenFondo})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ajusta la altura según tus necesidades
    width: "100vw", // Ajusta el ancho según tus necesidades
  };

  useEffect(() => {
    fetchData();
    setInfoCajaAcciones(prevState => ({
      ...prevState,
      personajeActivoId: 6
    }))
  }, [personajeActivoId]);

  return (
    <div>
      {loading ? (
        // Muestra la pantalla de carga
        <div className="load-page">
          <div className="spinner"></div>
        </div>
      ) : (
        // Muestra el contenido cuando las llamadas a los servicios han terminado
        <div style={mundoBGStyle}>
          <div className="mundo-center">
            <Personaje nombre={infoBoss.nombre} imagen={infoBoss.imagen} vidaMaxima={infoBoss.vida} vidaActual={vidaActualBoss} categoria={"boss"}/>
            <Personaje nombre={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "nombre")} imagen={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "imagen")} vidaMaxima={findCharacterByPlayerId(infoCajaAcciones.infoPersonajes, personajeActivoId, "vida")} vidaActual={vidaActualPersonaje} categoria={"personaje"}/>
            <CajaAcciones infoCajaAcciones={infoCajaAcciones} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel;
