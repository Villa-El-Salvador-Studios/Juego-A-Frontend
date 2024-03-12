import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from '../../componentes/Carousel/Carousel';
import NotificacionCentrada from '../../componentes/notificacionCentrada/NotificacionCentrada';
import PersonajeService from '../../services/personaje-service';
import HabilidadPersonajeService from '../../services/habilidad-personaje-service';
import './seleccionarNuevoPersonaje.css';

const SeleccionarNuevoPersonaje = () => {
    const navegar = useNavigate();

    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isPersonajeSeleccionado, setIsPersonajeSeleccionado] = useState(false);
    const [images, setImages] = useState({
        names: ["Robotin", "URL", "Mage", "Dambeldor", "Pedrito"],
        imageList: ["/assets/images/characters/bombolbi.webp",
                    "/assets/images/characters/enlace.webp",
                    "/assets/images/characters/mago.webp",
                    "/assets/images/characters/magoAnemico.webp",
                    "/assets/images/characters/ven10.webp",]
    });

    const mensaje = '¿Estás seguro de tu elección? Esta acción no se puede revertir.'

    const handleIndexChange = (index) => {
        setSelectedCharacterIndex((prevIndex) => index);
    };

    const crearPersonaje = () => {
        const personajeData = {
            vida: 2000,
            nivel: 1,
            nombre: images.names[selectedCharacterIndex],
            ataque: 100,
            experiencia: 0,
            imagen: images.imageList[selectedCharacterIndex],
            jugadorId: localStorage.getItem("jugadorId"),
        }

        const habilidadPersonajeData = {
            habilidadId: 0,
            personajeId: 0
        }

        PersonajeService.Create(personajeData)
            .then(response => {
                for (let i = 0; i < 4; i++) {
                    habilidadPersonajeData.habilidadId = i + 21
                    habilidadPersonajeData.personajeId = response.data.id

                    HabilidadPersonajeService.Create(habilidadPersonajeData)
                        .then(() => {
                            setIsOpen(false)
                        })
                        .catch(error => {
                            // Mostrar notificación de error
                            toast.error('Ocurrió un error al crear las habilidades del personaje.', error);
                        })
                }
                toast.success('Personaje creado exitosamente.');

                setIsPersonajeSeleccionado(true)
            })
            .catch(error => {
                // Mostrar notificación de error
                toast.error('Ocurrió un error al crear el personaje.', error);
            })
    }

    const entrarSiguienteNivel = () => {
        let nivelActual = Number(localStorage.getItem('nivel'))
        localStorage.setItem('nivel', (nivelActual + 1));

        navegar('/nivel');
    }

    const seleccionarNivel = () => {
        navegar('/selector-niveles');
    }

    const fetchData = async () => {
        try {
            PersonajeService.GetByJugadorId(localStorage.getItem("jugadorId")).then((response) => {
                const nombresAEliminar = response.data.map(item => item.nombre)
                const imagenesAEliminar = response.data.map(item => item.imagen)

                const nombresFiltrados = images.names.filter(nombre => !nombresAEliminar.includes(nombre));
                const imagenesFiltradas = images.imageList.filter(imagen => !imagenesAEliminar.includes(imagen));

                setImages({
                    names: nombresFiltrados,
                    imageList: imagenesFiltradas,
                });
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    const abrirConfirmacionEleccion = () => {
        if (images.names.length === 0) {
            toast.error('No hay personajes para seleccionar.');
            return;
        }
        
        setIsOpen(true);
    }

    const opciones = {
        textos: ['Sí', 'No'],
        funciones: [crearPersonaje, () => setIsOpen(false)]
    }

    useEffect(() => {
        fetchData();
    }, [images])

    return (
        <div className='SNP'>
            <ToastContainer />
            <h1 className='SNP-titulo'>Seleccionar nuevo personaje</h1>
            <Carousel images={images} onIndexChange={handleIndexChange}/>
            <NotificacionCentrada isOpen={isOpen} mensaje={mensaje} opciones={opciones}/>
            <div className='SNP-botones'>
                <button className='SNP-boton' onClick={abrirConfirmacionEleccion} disabled={isPersonajeSeleccionado}>Seleccionar personaje</button>
                <button className='SNP-boton' onClick={entrarSiguienteNivel}>Siguiente nivel</button>
                <button className='SNP-boton' onClick={seleccionarNivel}>Seleccionar nivel</button>
            </div>
        </div>
    )
}

export default SeleccionarNuevoPersonaje