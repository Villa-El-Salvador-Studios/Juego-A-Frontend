import './Toolbar.css' 
import { Link } from 'react-router-dom';

 const Toolbar = ({ botones }) => {
   return (
    <div className="toolbar">
      
        {Object.keys(botones).map((nombreBoton, index) => {
          const boton = botones[nombreBoton];

          if (index === 0 && boton.texto) {
            return (
              <div className="button-container-left" key={nombreBoton}>
                <Link to={boton.ruta} >
                  <img
                    src={boton.texto}
                    alt={nombreBoton}
                    className="toolbar-home-icon"
                  />
                </Link>
              </div>
            );
          }

          return (
              <div className="button-container-right" key={nombreBoton}>
              <Link to={boton.ruta}>
                <button className="toolbar-button">{boton.texto}</button>
              </Link>
            </div>
          );
        })}
    </div>
   )
 }

 export default Toolbar
