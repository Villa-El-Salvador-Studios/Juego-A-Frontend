import React, { useState } from 'react';
import './Llenar-informacion.css'

const LlenarInformacion = ({textoH1, textoInput, onInputChange}) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    
        // Llama a la función de devolución de llamada para pasar la información al componente principal
        onInputChange(textoInput, value);
    };

    return (
        <div className='llenar-informacion'>
            <h1>{textoH1}</h1>
            <input className="custom-input" type="text" placeholder={textoInput} value={inputValue} onChange={handleChange} />
        </div>
    )
}

export default LlenarInformacion