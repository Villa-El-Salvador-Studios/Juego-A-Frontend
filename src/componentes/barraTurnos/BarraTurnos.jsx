import  './BarraTurnos.css';

const BarraTurnos = ({arrayTurnos}) => {
    return (
        <div className="barra-turnos">
            {arrayTurnos.map((nombre, index) => (
                <h1 key={index} className='barra-turnos-nombre'>{nombre}</h1>
            ))}
        </div>
    )
}

export default BarraTurnos