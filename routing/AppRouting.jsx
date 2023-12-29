import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../paginas/home/Home';
import InicioSesion from '../paginas/inicio-sesion/InicioSesion';
import Registro from '../paginas/registro/Registro';
import MenuPrincipal from '../paginas/menu-principal/MenuPrincipal';
import Configuracion from '../paginas/configuracion/Configuracion';
import SelectorNiveles from '../paginas/selector-niveles/SelectorNiveles';

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

                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter