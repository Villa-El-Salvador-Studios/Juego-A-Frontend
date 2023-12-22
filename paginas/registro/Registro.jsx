import Toolbar from "../../componentes/toolbar/Toolbar"
import LlenarInformacion from "../../componentes/llenar-informacion/Llenar-informacion"
import "./Registro.css"

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

const Registro = () => {
     return (
        <div className="espacio-registro">
            <Toolbar botones={botones}></Toolbar>
            <div className="centrado">
                <LlenarInformacion textoH1="Usuario" textoInput="Usuario"/>
                <LlenarInformacion textoH1="Contraseña" textoInput="Contraseña"/>
                <LlenarInformacion textoH1="Repetir contraseña" textoInput="Repetir contraseña"/>
                <br></br>
                <p>Ingrese solo carácteres en minúscula.</p>
            </div>
        </div>
     )
}

export default Registro
