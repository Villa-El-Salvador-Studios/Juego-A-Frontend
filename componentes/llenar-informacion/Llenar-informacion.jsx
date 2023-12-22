import './Llenar-informacion.css'

const LlenarInformacion = ({textoH1, textoInput}) => {
    return (
        <div className='llenar-informacion'>
            <h1>{textoH1}</h1>
            <input className="custom-input" type="text" placeholder={textoInput} />
        </div>
    )
}

export default LlenarInformacion