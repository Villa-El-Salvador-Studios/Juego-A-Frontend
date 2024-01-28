import React, { useState } from 'react';
import './Llenar-informacion.css'

const LlenarInformacion = ({textoH1, textoInput, onInputChange, tipo, sources, onKeyDown}) => {
    const [inputValue, setInputValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    
        // Llama a la función de devolución de llamada para pasar la información al componente principal
        onInputChange(textoInput, value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Llama a la función de devolución de llamada para manejar la tecla Enter
            onKeyDown(event);
        }
    };

    return (
        <div className='llenar-informacion'>
            <h1>{textoH1}</h1>
            <div className="custom-input-container">
                <input
                className="custom-input"
                type={showPassword ? 'text' : tipo}
                placeholder={textoInput}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                />
                {tipo === 'password' && (
                <img
                    className="show-password-img"
                    src={showPassword ? sources[1] : sources[0]}
                    alt={showPassword ? 'Ocultar' : 'Mostrar'}
                    onClick={togglePasswordVisibility}
                />
                )}
            </div>
        </div>
    )
}

export default LlenarInformacion