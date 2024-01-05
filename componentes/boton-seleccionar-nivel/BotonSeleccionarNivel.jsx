import MundoService from '../../services/mundo-service';
import PersonajeService from '../../services/personaje-service';
import './BotonSeleccionarNivel.css'

const BotonSeleccionarNivel = ({cantidad}) => {
    const botones = [...Array(cantidad)].map((_, index) => (
        <button className='boton-seleccionar-nivel-button' key={index}>
            {index + 1}
        </button>
    ));
    
    const filas = [];

    for (let i = 0; i < botones.length; i += 5) {
        filas.push(botones.slice(i, i + 5));
    }

    let personajeId = 0;

    const crearBoss = (mundo) => {
        const nombres = ["Boss 1", "Boss 2", "Boss 3", "Boss 4", "Boss 5"];
        const imagenes = ["../../src/assets/images/boss1.png", "../../src/assets/images/boss2.png", "../../src/assets/images/boss3.png", "../../src/assets/images/boss4.png", "../../src/assets/images/boss5.png"];

        const vida = (mundo + 1) * 1000;
        const nivel = mundo + 1;
        const nombre = nombres[mundo];
        const ataque = (mundo + 1) * 100;
        const experiencia = 0;
        const imagen = imagenes[mundo];

        const data = {
            "vida": vida,
            "nivel": nivel,
            "nombre": nombre,
            "ataque": ataque,
            "experiencia": experiencia,
            "imagen": imagen,
            "jugadorId": null
        }

        PersonajeService.Create(data)
            .then((response) => {
                console.log("Boss creado exitosamente.", response.data);
                personajeId = response.data.id;
            })
            .catch(error => {
                // Mostrar notificación de error genérica
                console.log("Hubo un error al crear el boss.", error);
            });
    }

    const crearMundo = (mundo) => {
        const nombres = ["Mundo 1", "Mundo 2", "Mundo 3", "Mundo 4", "Mundo 5"];
        const imagenesFondo = ["../../src/assets/images/bg1.jpg", "../../src/assets/images/bg2.jpg", "../../src/assets/images/bg3.png", "../../src/assets/images/bg4.png", "../../src/assets/images/bg5.jpeg"];

        const xp = (mundo + 1) * 1;
        const estado = 0;
        const imagenFondo = imagenesFondo[mundo];
        const songId = mundo + 1;
        const nombre = nombres[mundo];
        const personaje_id = personajeId;

        const data = {
            "xp": xp,
            "estado": estado,
            "imagenFondo": imagenFondo,
            "songId": songId,
            "nombre": nombre,
            "personaje_Id": personaje_id
        }

        MundoService.Create(data)
            .then((response) => {
                console.log("Mundo creado exitosamente.", response.data);
            })
            .catch(error => {
                // Mostrar notificación de error genérica
                console.log("Hubo un error al crear el mundo.", error);
            });
    }

    const crearNivel = (iteracion) => {
        crearBoss(iteracion);
        crearMundo(iteracion);
    }

    for (let i = 0; i <= cantidad; i++) {
        crearNivel(i);
    }

    personajeId = 0;

    return (
        <div className="boton-seleccionar-nivel">
            {filas.map((fila, index) => (
                <div key={index} className="fila-botones">
                {fila}
                </div>
            ))}
        </div>
    )
}

export default BotonSeleccionarNivel