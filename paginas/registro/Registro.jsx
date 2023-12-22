import React, { useState } from 'react';
import Toolbar from "../../componentes/toolbar/Toolbar"
import LlenarInformacion from "../../componentes/llenar-informacion/Llenar-informacion"
import JugadorService from "../../services/jugador-service"
import "./Registro.css"

const Registro = () => {
    const [informacion, setInformacion] = useState({});

    const onInputChange = (campo, valor) => {
        setInformacion({
          ...informacion,
          [campo]: valor
        });
    };

    const botones = {
        icono_home: {
            texto: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEgMTN2MTBoLTZ2LTZoLTZ2NmgtNnYtMTBoLTNsMTItMTIgMTIgMTJoLTN6bS0xLTUuOTA3di01LjA5M2gtM3YyLjA5M2wzIDN6Ii8+PC9zdmc+",
            ruta: "/home"
        },
        boton1: {
            texto: "Iniciar Sesión",
            ruta: "/inicio-sesion"
        },
        boton2: {
            texto: "Registrarse",
            ruta: "/registro"
        }
    }

    const enviarInformacion = () => {
        const data = {
            "usuario": informacion.Usuario,
            "contrasenia": informacion.Contraseña,
            "fotoPerfil": "string",
            "mundoMaximo": 0
        }

        JugadorService.Create(data)
        .then(response => {
        // Maneja la respuesta del servidor según tus necesidades
        console.log('Respuesta del servidor:', response.data);
        })
        .catch(error => {
        // Maneja los errores según tus necesidades
        console.error('Error al enviar datos al servidor:', error);
        });


        console.log("enviarInformacion", informacion)
    }

    return (
    <div className="espacio-registro">
        <Toolbar botones={botones}></Toolbar>
        <div className="centrado">
            <LlenarInformacion textoH1="Usuario" textoInput="Usuario" onInputChange={onInputChange}/>
            <LlenarInformacion textoH1="Contraseña" textoInput="Contraseña" onInputChange={onInputChange}/>
            <LlenarInformacion textoH1="Repetir contraseña" textoInput="Repetir contraseña" onInputChange={onInputChange}/>
            <br></br>
            <button className="boton-registro" onClick={enviarInformacion}>Crear cuenta</button>
            <p className="instrucciones">Ingrese solo carácteres en minúscula.</p>
        </div>
    </div>
    )
}

export default Registro
