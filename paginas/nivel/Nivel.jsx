 import { useEffect } from 'react'
 import MundoService from '../../services/mundo-service'
 import PersonajeService from '../../services/personaje-service'
 import './Nivel.css'

 const Nivel = () => {
    let infoNivel = {
        id: 0,
        xp: 0,
        estado: 0,
        imagenFondo: '',
        songId: 0,
        nombre: '',
        personaje_Id: 0
    }

    let inforPersonaje = {
        id: 0,
        vida: 0,
        nivel: 0,
        nombre: '',
        ataque: 0,
        experiencia: 0,
        imagen: '',
        jugadorId: 0
    }

    let mundoId = Number(localStorage.getItem('nivel'))

    useEffect(() => {
        MundoService.GetById(mundoId)
            .then(response => {
                infoNivel = response.data
                localStorage.setItem('personajeId', response.data.personaje_Id)
                console.log(infoNivel)

                //Guardado de la información del personaje
                let personajeId = Number(localStorage.getItem('personajeId'))

                PersonajeService.GetById(personajeId)
                    .then(response => {
                        inforPersonaje = response.data
                        console.log(inforPersonaje)
                    })
                    .catch(error => {
                        console.log('Hubo un error al obtener la información del personaje.', error);
                    })
            })
            .catch(error => {
                console.log('Hubo un error al obtener la información del nivel.', error);
            })

        return () => {
            localStorage.setItem('nivel', '0');
            localStorage.setItem('personajeId', '0');
        }
    });

    return (
        <div>
            <p>{localStorage.getItem('nivel')}</p>
        </div>
    )
 }

 export default Nivel