import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import './css/autoexamenAvisos.css'

function AutoexamenAvisos({ authenticated, setAuthenticated }){
    const [showAlternateText, setShowAlternateText] = useState(false);

    const irAsiguiente = useNavigate();

    function continuarSig(){
      irAsiguiente('/autoexamen')
    }
  
    const handleNextClick = () => {
      setShowAlternateText(!showAlternateText);
    };
  
    return (
      <div className='div_father-autoexamenAvisos'>
        {authenticated ? (
          <div className='div_son1-autoexamenAvisos'>
  
            <h1>
              {!showAlternateText
                ? '  Qué es el autoexamen de mamas?'
                :'Advertencia!'
              }
              
            </h1>
  
            <p>
              {!showAlternateText
                ? 'Imagen'
                :'Imagen 2'}
            </p>
  
            <p>
              {!showAlternateText
                ? 'Este examen se realiza el mismo día cada mes, con el fin de familiarizarse con sus senos y encontrar alguna anormalidad en su pecho a tiempo.'
                :'Es de suma importancia entender plenamente el concepto más detallado. Acá encontrarás mucha más información!'}
            </p>
  
  
            {showAlternateText ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="15" viewBox="0 0 50 15" fill="none">
                { <svg xmlns="http://www.w3.org/2000/svg" width="50" height="15" viewBox="0 0 50 15" fill="none">
                      <circle cx="42.25" cy="7.25" r="7.25" fill="#9F9F9F" fillOpacity="0.7" />
                      <circle cx="7.25" cy="7.25" r="7.25" fill="#9F9F9F" fillOpacity="0.44" />
                  </svg>}
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="15" viewBox="0 0 50 15" fill="none">
                <circle cx="7.25" cy="7.25" r="7.25" fill="#9F9F9F" fillOpacity="0.7" />
                <circle cx="42.25" cy="7.25" r="7.25" fill="#9F9F9F" fillOpacity="0.44" />
              </svg>
            )}
  
            <br></br>
  
            {showAlternateText ? (
              <button className='btn_siguiente-autoexamenAvisos' onClick={continuarSig}>Ir a Siguiente</button>
            ) : (
              <button className='btn_siguiente-autoexamenAvisos' onClick={handleNextClick}>Siguiente</button>
            )}
  
  
          </div>
  
        ) : (
          <p>Por favor, inicia sesión para acceder a esta página.</p>
        )}
      </div>
    );
}

export default AutoexamenAvisos;
