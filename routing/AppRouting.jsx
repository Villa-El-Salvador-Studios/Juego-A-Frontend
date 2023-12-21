import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../paginas/home/Home';
import Registro from '../paginas/registro/Registro';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/registro" element={<Registro />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter