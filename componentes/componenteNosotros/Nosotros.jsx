 import './Nosotros.css';

 const Nosotros = ({titulo, parrafo}) => {
     return (
        <div className="home-text">
            <h1>{titulo}</h1>
            <p>{parrafo}</p>
        </div>
     )
 }

 export default Nosotros