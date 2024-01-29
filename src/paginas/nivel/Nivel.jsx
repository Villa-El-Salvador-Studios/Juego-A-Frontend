import { useEffect, useState } from "react";
import Personaje from "../../componentes/personaje/Personaje";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import HabilidadService from "../../services/habilidad-service";
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

  const [vidaActualBoss, setVidaActualBoss] = useState(0);

  const [vidaActualPersonaje, setVidaActualPersonaje] = useState(0);

  const funciones = {
    habilidades: {
      funciones: [() => {console.log("Habilidad 1")}, () => {console.log("Habilidad 2")}, () => {console.log("Habilidad 3")}, () => {console.log("Habilidad 4")}]
    },
    objetos: {
      funciones: [() => {console.log("Objeto 1")}, () => {console.log("Objeto 2")}, () => {console.log("Objeto 3")}, () => {console.log("Objeto 4"), console.log("Objeto 5")}, () => {console.log("Objeto 6")}]
    },
    personajes: {
      funciones: [() => {console.log("Personaje 1")}, () => {console.log("Personaje 2")}, () => {console.log("Personaje 3")}, () => {console.log("Personaje 4")}]
    },
    hechizos: {
      funciones: [() => {console.log("Hechizo 1")}, () => {console.log("Hechizo 2")}]
    }
  }

  const cambiarNumerosPorNombres = (arrayDeNumeros, nombresDeHabilidades) => {
    return arrayDeNumeros.map((numero) => nombresDeHabilidades[numero]);
  };

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

      setNombreHabilidades(objetoAux);
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
      setInfoPersonajes(persojeResponse.data);
      setVidaActualPersonaje(persojeResponse.data[0].vida);

      let personajesId = persojeResponse.data.map(personaje => personaje.id);
      obtenerHabilidades(personajesId);
      

    } catch (error) {
      console.error("Hubo un error al obtener la información.", error);
    } finally {
      setLoading(false);
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
  }, []);

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
            <Personaje nombre={infoPersonajes[personajeActivo].nombre} imagen={infoPersonajes[personajeActivo].imagen} vidaMaxima={infoPersonajes[personajeActivo].vida} vidaActual={vidaActualPersonaje} categoria={"personaje"}/>
            <CajaAcciones textoList={textoList} personajeActivoId={personajeActivoId} infoPersonajes={infoPersonajes} funciones={funciones} nombreHabilidades={nombreHabilidades} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel;
