import Toolbar from "../toolbar/Toolbar";
import "./Home.css";
import Nosotros from "../componenteNosotros/Nosotros";

const Home = () => {
    const informacion = ["Misión",
                        "En Villa El Salvador Studios, nos comprometemos a crear videojuegos\
                        envolventes y entretenidos que reflejen nuestra pasión por la innovación\
                        y la narrativa única. Buscamos ofrecer experiencias de juego excepcionales\
                        que despierten la emoción y la conexión entre los jugadores. Nuestra misión\
                        es contribuir al crecimiento y desarrollo de la industria de\
                        videojuegos en Perú, brindando oportunidades de aprendizaje y\
                        experiencia valiosa a los talentosos estudiantes universitarios\
                        que forman parte de nuestro equipo.",
                        "Visión",
                        "Ser reconocidos como líderes innovadores en la industria peruana de videojuegos,\
                        destacando por la calidad y creatividad de nuestras creaciones. Aspiramos a\
                        inspirar a la comunidad gamer local e internacional, proporcionando experiencias\
                        únicas y emocionantes a través de nuestros juegos."]
    return (
        <div>
            <Toolbar></Toolbar>
            <div className="home-container">
                <img
                    src="https://i.imgur.com/LY1NkeF.png"
                    title="source: imgur.com"
                    className="centered-image"
                />
                <Nosotros titulo={informacion[0]} parrafo={informacion[1]}></Nosotros>
                <Nosotros titulo={informacion[2]} parrafo={informacion[3]}></Nosotros>
            </div>
        </div>
    )
}

export default Home