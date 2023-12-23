import React, { useState } from 'react';
import Toolbar from "../../componentes/toolbar/Toolbar" 
import LlenarInformacion from "../../componentes/llenar-informacion/Llenar-informacion"
import JugadorService from "../../services/jugador-service"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './InicioSesion.css';

 const InicioSesion = () => {
    const [informacion, setInformacion] = useState({});
    const navegar = useNavigate(); // Variable para navegar entre rutas

    const onInputChange = (campo, valor) => {
        setInformacion({
          ...informacion,
          [campo]: valor
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            enviarInformacion();
        }
    };

    const sources = ["data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTEuOTk4IDVjLTQuMDc4IDAtNy43NDIgMy4wOTMtOS44NTMgNi40ODMtLjA5Ni4xNTktLjE0NS4zMzgtLjE0NS41MTdzLjA0OC4zNTguMTQ0LjUxN2MyLjExMiAzLjM5IDUuNzc2IDYuNDgzIDkuODU0IDYuNDgzIDQuMTQzIDAgNy43OTYtMy4wOSA5Ljg2NC02LjQ5My4wOTItLjE1Ni4xMzgtLjMzMi4xMzgtLjUwN3MtLjA0Ni0uMzUxLS4xMzgtLjUwN2MtMi4wNjgtMy40MDMtNS43MjEtNi40OTMtOS44NjQtNi40OTN6bTguNDEzIDdjLTEuODM3IDIuODc4LTQuODk3IDUuNS04LjQxMyA1LjUtMy40NjUgMC02LjUzMi0yLjYzMi04LjQwNC01LjUgMS44NzEtMi44NjggNC45MzktNS41IDguNDA0LTUuNSAzLjUxOCAwIDYuNTc5IDIuNjI0IDguNDEzIDUuNXptLTguNDExLTRjMi4yMDggMCA0IDEuNzkyIDQgNHMtMS43OTIgNC00IDQtNC0xLjc5Mi00LTQgMS43OTItNCA0LTR6bTAgMS41Yy0xLjM4IDAtMi41IDEuMTItMi41IDIuNXMxLjEyIDIuNSAyLjUgMi41IDIuNS0xLjEyIDIuNS0yLjUtMS4xMi0yLjUtMi41LTIuNXoiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==",
                     "data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTcuMDY5IDYuNTQ2IDIuNjg0LTIuMzU5Yy4xNDMtLjEyNS4zMi0uMTg3LjQ5Ny0uMTg3LjQxOCAwIC43NS4zNC43NS43NSAwIC4yMDctLjA4Ni40MTQtLjI1NC41NjJsLTE2LjUgMTQuNTAxYy0uMTQyLjEyNi0uMzE5LjE4Ny0uNDk2LjE4Ny0uNDE1IDAtLjc1LS4zMzQtLjc1LS43NSAwLS4yMDcuMDg2LS40MTQuMjUzLS41NjJsMi40MzgtMi4xNDNjLTEuNDE0LTEuMTMyLTIuNjI3LTIuNTUyLTMuNTQ3LTQuMDI4LS4wOTYtLjE1OS0uMTQ0LS4zMzgtLjE0NC0uNTE3cy4wNDktLjM1OC4xNDUtLjUxN2MyLjExMS0zLjM5IDUuNzc1LTYuNDgzIDkuODUzLTYuNDgzIDEuODE1IDAgMy41MzYuNTkzIDUuMDcxIDEuNTQ2em0yLjMxOSAxLjgzYy45NjYuOTQzIDEuODAzIDIuMDE0IDIuNDc0IDMuMTE3LjA5Mi4xNTYuMTM4LjMzMi4xMzguNTA3cy0uMDQ2LjM1MS0uMTM4LjUwN2MtMi4wNjggMy40MDMtNS43MjEgNi40OTMtOS44NjQgNi40OTMtMS4yOTcgMC0yLjU1My0uMzEzLTMuNzI5LS44NDlsMS4yNDctMS4wOTZjLjc5NS4yODUgMS42MjYuNDQ1IDIuNDgyLjQ0NSAzLjUxNiAwIDYuNTc2LTIuNjIyIDguNDEzLTUuNS0uNTk1LS45MzItMS4zMTgtMS44MzgtMi4xNDUtMi42Mzd6bS0zLjQzNCAzLjAxOWMuMDMuMTk3LjA0Ni4zOTkuMDQ2LjYwNSAwIDIuMjA4LTEuNzkyIDQtNCA0LS4zODQgMC0uNzU2LS4wNTQtMS4xMDctLjE1NmwxLjU4LTEuMzg5Yy44OTUtLjE3MSAxLjYyMS0uODIxIDEuOTAxLTEuNjcxem0tLjA1OC0zLjgxOGMtMS4xOTctLjY3LTIuNTEyLTEuMDc3LTMuODk4LTEuMDc3LTMuNDY1IDAtNi41MzMgMi42MzItOC40MDQgNS41Ljg1MyAxLjMwOCAxLjk1NSAyLjU2NyAzLjIzMSAzLjU0OWwxLjcyOC0xLjUxOWMtLjM1MS0uNTk1LS41NTMtMS4yODktLjU1My0yLjAzIDAtMi4yMDggMS43OTItNCA0LTQgLjkyNSAwIDEuNzc3LjMxNSAyLjQ1NS44NDN6bS0yLjYgMi4yODVjLS4zNzgtLjIzLS44MjItLjM2Mi0xLjI5Ni0uMzYyLTEuMzggMC0yLjUgMS4xMi0yLjUgMi41IDAgLjM2LjA3Ni43MDEuMjEzIDEuMDExeiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"]
    
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
        // Verificar si alguno de los campos está vacío
        if (!informacion.Usuario || !informacion.Contraseña) {
            // Mostrar notificación de error
            toast.error('Ninguno de los campos puede estar vacío');
            return;
        }

        const data = {
            "usuario": informacion.Usuario.toLowerCase(),
            "contraseña": informacion.Contraseña.toLowerCase()
        }

        JugadorService.Login(data)
            .then(response => {
                // Redireccionar a la ruta /menu-principal
                navegar('/menu-principal');
            })
            .catch(error => {
                // Mostrar notificación de error
                toast.error('Error al iniciar sesión. La contrasenia o el usuario puede no ser el correcto.');
            });


        console.log("enviarInformacion", informacion)
    }

    return (
        <div className="espacio-inicio">
            <ToastContainer />
            <Toolbar botones={botones} />
            <div className="centrado">
                <LlenarInformacion
                    textoH1="Usuario"
                    textoInput="Usuario"
                    tipo="text"
                    onInputChange={onInputChange}
                    onKeyDown={handleKeyPress}/>
                <LlenarInformacion
                    textoH1="Contraseña"
                    textoInput="Contraseña"
                    tipo="password"
                    onInputChange={onInputChange}
                    sources={sources}
                    onKeyDown={handleKeyPress}/>
                <br></br>
                <button className="boton-inicio-sesion" onClick={enviarInformacion}>Iniciar sesión</button>
            </div>
        </div>
    )
 }

 export default InicioSesion