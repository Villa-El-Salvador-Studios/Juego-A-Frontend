import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../componentes/Carousel/Carousel';
import PersonajeService from '../../services/personaje-service';
import HabilidadPersonajeService from '../../services/habilidad-personaje-service';
import './creacion-personaje.css';

const CreacionPersonaje = () => {
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
    const navegar = useNavigate(); // Variable para navegar entre rutas

    const images = {
        names: ["Robotin", "URL", "Mage", "Dambeldor", "Pedrito"],
        imageList: ["/assets/images/characters/bombolbi.webp",
                    "/assets/images/characters/enlace.webp",
                    "/assets/images/characters/mago.webp",
                    "/assets/images/characters/magoAnemico.webp",
                    "/assets/images/characters/ven10.webp",],
    }

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
                }
                
                navegar('/menu-principal')

            })
            .catch(error => {
                // Mostrar notificación de error
                toast.error('Ocurrió un error al crear el personaje.');
            })
    }

    return (
        <div className="creacion-personaje">
            <h1 className="creacion-personaje-title">Selecciona tu personaje inicial</h1>
            <Carousel images={images} onIndexChange={handleIndexChange}/>
            <button className="creacion-personaje-button" onClick={crearPersonaje}>Seleccionar personaje {selectedCharacterIndex + 1}</button>
        </div>
    )
}

export default CreacionPersonaje