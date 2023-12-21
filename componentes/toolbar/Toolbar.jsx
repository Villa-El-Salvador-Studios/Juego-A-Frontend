import './Toolbar.css' 
import { Link } from 'react-router-dom';

 const Toolbar = ({botones}) => {
   return (
    <div className="toolbar">
      <div className="button-container">

        {Object.keys(botones).map((nombreBoton) => {
          const boton = botones[nombreBoton];
          return (
            <Link to={boton.ruta} key={nombreBoton}>
              <button className='toolbar-button'>
                {boton.texto}
              </button>
            </Link>
          );
        })}

      </div>
    </div>
   )
 }

 export default Toolbar
