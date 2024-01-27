import './Personaje.css'

const Personaje = ({nombre, imagen, vida, categoria}) => {

    return (
        <div className="personaje">
            <h1 className='mundo-title'>{nombre}</h1>
            <div className="contenedor-personaje">
                <img
                className={categoria === 'boss' ? 'mundo-boss' : 'mundo-personaje'}
                src={imagen}
                alt={`Imagen de ${nombre}`}
                />
                <div className="barra-vida" style={{ height: `${vida}%` }}></div>
            </div>
        </div>
    )
}

export default Personaje