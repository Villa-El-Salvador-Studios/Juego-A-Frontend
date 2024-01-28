import { useEffect, useState } from "react";
import Personaje from "../../componentes/personaje/Personaje";
import CajaAcciones from "../../componentes/cajaAcciones/CajaAcciones";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import "./Nivel.css";

const Nivel = () => {
  let mundoId = Number(localStorage.getItem("nivel"));
  
  const textoList = ["Habilidades", "Objetos", "Personajes", "Hechizos"];
  
  const funcionesList = [ () => {console.log("Habilidad 1")},
                          () => {console.log("Habilidad 2")},
                          () => {console.log("Habilidad 3")},
                          () => {console.log("Habilidad 4")} ];

  const [personajeActivo, setPersonajeActivo] = useState(0);

  const [loading, setLoading] = useState(true);

  const [infoNivel, setInfoNivel] = useState({
    id: 0,
    xp: 0,
    estado: 0,
    imagenFondo: "",
    songId: 0,
    nombre: "",
    personaje_Id: 0,
  });

  const [vidaActualBoss, setVidaActualBoss] = useState(0);

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

  const [vidaActualPersonaje, setVidaActualPersonaje] = useState(0);
  const [infoPersonajes, setInfoPersonajes] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    mostrarPersonajes();
  }, [infoPersonajes]);

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

    } catch (error) {
      console.error("Hubo un error al obtener la información.", error);
    } finally {
      setLoading(false);
    }
  };

  const mostrarPersonajes = () => {
    console.log("Personajes totales: ", infoPersonajes);
  }

  const mundoBGStyle = {
    backgroundImage: `url(${infoNivel.imagenFondo})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ajusta la altura según tus necesidades
    width: "100vw", // Ajusta el ancho según tus necesidades
  };

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
            <CajaAcciones textoList={textoList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel;
