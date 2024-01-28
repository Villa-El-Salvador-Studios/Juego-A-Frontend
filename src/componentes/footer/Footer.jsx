 import './Footer.css';

 const Footer = ({texto1, texto2, texto3, icono1, icono2, icono3}) => {
     return (
        <div className="footer">
            <div className="top-left">
                <p>{texto1}</p>
            </div>
            <div className="bottom-left">
                <p>{texto2}</p>
            </div>
            <div className="top-right">
                <p><strong>{texto3}</strong></p>
            </div>
            <div className="bottom-right">
                <img src={icono1} alt="Icono1" />
                <img src={icono2} alt="Icono2" />
                <img src={icono3} alt="Icono3" />
            </div>
        </div>
     )
 }

 export default Footer