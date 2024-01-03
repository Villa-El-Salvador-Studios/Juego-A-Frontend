import { useNavigate } from 'react-router-dom'
import BotonSeleccionarNivel from '../../componentes/boton-seleccionar-nivel/BotonSeleccionarNivel'
import './SelectorNiveles.css'

const SelectorNiveles = () => {
    const navegar = useNavigate();
    const source = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuNDI3IDMuMDIxaC03LjQyN3YtMy4wMjFsLTYgNS4zOSA2IDUuNjF2LTNoNy40MjdjMy4wNzEgMCA1LjU2MSAyLjM1NiA1LjU2MSA1LjQyNyAwIDMuMDcxLTIuNDg5IDUuNTczLTUuNTYxIDUuNTczaC03LjQyN3Y1aDcuNDI3YzUuODQgMCAxMC41NzMtNC43MzQgMTAuNTczLTEwLjU3M3MtNC43MzMtMTAuNDA2LTEwLjU3My0xMC40MDZ6Ii8+PC9zdmc+"

    const volverMenuPrincipal = () => {
        navegar('/menu-principal');
    }

    return (
    <div className="selector-niveles">
        <img className="selector-niveles-return" src={source} alt="volver al menú principal" onClick={volverMenuPrincipal} />
        <h1 className='selector-niveles-title'>Selector de niveles</h1>
        <BotonSeleccionarNivel cantidad={5}/>
        <p className='selector-niveles-text'>Creado por Erick Urbizagastegui y Salvador Torres.</p>
    </div>
    )
}

export default SelectorNiveles