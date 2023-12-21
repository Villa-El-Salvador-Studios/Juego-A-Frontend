import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../paginas/home/Home';
import InicioSesion from '../paginas/inicio-sesion/InicioSesion';
import Registro from '../paginas/registro/Registro';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/inicio-sesion" element={<InicioSesion/>}></Route>
                <Route path="/registro" element={<Registro />}></Route>

                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter