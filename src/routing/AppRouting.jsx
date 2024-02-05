import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../paginas/home/Home';
import InicioSesion from '../paginas/inicio-sesion/InicioSesion';
import Registro from '../paginas/registro/Registro';
import MenuPrincipal from '../paginas/menu-principal/MenuPrincipal';
import Configuracion from '../paginas/configuracion/Configuracion';
import SelectorNiveles from '../paginas/selector-niveles/SelectorNiveles';
import CreacionPersonaje from '../paginas/creacionPersonaje/creacion-personaje';
import Nivel from '../paginas/nivel/Nivel';
import FinNivel from '../componentes/fin-nivel/FinNivel';
import SeleccionarNuevoPersonaje from '../paginas/seleccionar-nuevo-personaje/seleccionarNuevoPersonaje';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/inicio-sesion" element={<InicioSesion/>}></Route>
                <Route path="/registro" element={<Registro />}></Route>
                <Route path='/menu-principal' element={<MenuPrincipal />}></Route>
                <Route path="/configuracion" element={<Configuracion />}></Route>
                <Route path="/selector-niveles" element={<SelectorNiveles />}></Route>
                <Route path='/nivel' element={<Nivel />}></Route>
                <Route path='/creacion-personaje' element={<CreacionPersonaje />}></Route>
                <Route path='/finNivel/:resultado' element={<FinNivel />}></Route>
                <Route path='/seleccionar-nuevo-personaje' element={<SeleccionarNuevoPersonaje />}></Route>

                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter