import './Toolbar.css' 
 
 const Toolbar = ({botones}) => {
   return (
    <div className="toolbar">
      <div className="button-container">
        {Object.keys(botones).map((nombreBoton) => {
          const boton = botones[nombreBoton];
          return (
            <button
              key={nombreBoton}
              className='toolbar-button'
              onClick={boton.funcion}
            >
              {boton.texto}
            </button>
          );
        })}
      </div>
    </div>
   )
 }

 export default Toolbar
