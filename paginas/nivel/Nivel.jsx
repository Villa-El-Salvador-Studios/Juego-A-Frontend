import { useEffect, useState } from "react";
import MundoService from "../../services/mundo-service";
import PersonajeService from "../../services/personaje-service";
import "./Nivel.css";

const Nivel = () => {
  let mundoId = Number(localStorage.getItem("nivel"));

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

  const [infoPersonaje, setInfoPersonaje] = useState({
    id: 0,
    vida: 0,
    nivel: 0,
    nombre: "",
    ataque: 0,
    experiencia: 0,
    imagen: "",
    jugadorId: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const nivelResponse = await MundoService.GetById(mundoId);
      setInfoNivel(nivelResponse.data);
      localStorage.setItem("personajeId", nivelResponse.data.personaje_Id);

      let personajeId = Number(localStorage.getItem("personajeId"));
      const personajeResponse = await PersonajeService.GetById(personajeId);
      setInfoPersonaje(personajeResponse.data);
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
            <h1 className="mundo-title">{infoPersonaje.nombre}</h1>
            <img
              className="mundo-boss"
              src={infoPersonaje.imagen}
              alt="Imagen del boss del nivel"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nivel;