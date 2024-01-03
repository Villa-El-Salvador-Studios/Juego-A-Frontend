import MundoService from '../../services/mundo-service';
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

    const crearBoss = (mundo) => {
        const nombres = ["Boss 1", "Boss 2", "Boss 3", "Boss 4", "Boss 5"];
        const imagenes = ["../../src/assets/images/boss1.png", "../../src/assets/images/boss2.png", "../../src/assets/images/boss3.png", "../../src/assets/images/boss4.png", "../../src/assets/images/boss5.png"];

        const vida = mundo * 1000;
        const nivel = mundo;
        const nombre = nombres[mundo];
        const ataque = mundo * 100;
        const experiencia = mundo * 50;
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

        MundoService.Create(data)
            .then((response) => {
                console.log("Boss creado exitosamente.", response.data);
            })
            .catch(error => {
                // Mostrar notificación de error genérica
                console.log("Hubo un error al crear el boss.", error);
            });
    }

    const crearMundo = (mundo) => {

    }

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