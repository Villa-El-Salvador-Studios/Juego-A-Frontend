import { useEffect, useState } from "react";
import Personaje from "../../componentes/personaje/Personaje";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import "./Nivel.css";

const Nivel = () => {
  let mundoId = Number(localStorage.getItem("nivel"));

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

      const persojeResponse = await PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId"));
      setInfoPersonajes(persojeResponse.data);

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
            <Personaje nombre={infoBoss.nombre} imagen={infoBoss.imagen} vida={infoBoss.vida} categoria={"boss"}/>
            <Personaje nombre={infoPersonajes[personajeActivo].nombre} imagen={infoPersonajes[personajeActivo].imagen} vida={infoPersonajes[personajeActivo].vida} categoria={"personaje"}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel;
