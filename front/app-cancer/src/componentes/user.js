import React, {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import './css/user.css'

import axios from 'axios';

function Usuario({ authenticated, setAuthenticated }) {

  const [userInfo, setUserInfo] = useState({});

  function formatDateString(dateString) {
    const dateObject = new Date(dateString);
    
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  const handleUpdate = () => {
    if (authenticated) {
      const userToken = Cookies.get('token');
      const decodedToken = jwt_decode(userToken);
      const userCorreo = decodedToken.correo_electronico;

      axios.put(`http://localhost:9000/api/ActualizarUsuario/${userCorreo}`)
        .then(response => {
          console.log('Datos del usuario actualizados:', response.data);
          // Aquí podrías actualizar el estado si es necesario
        })
        .catch(error => {
          console.error('Error al actualizar la información del usuario', error);
        });
    }
  };

  useEffect(() => {
    if (authenticated) {
      const userToken = Cookies.get('token');
      const decodedToken = jwt_decode(userToken);
      const userCorreo = decodedToken.correo_electronico;
  
      axios.get(`http://localhost:9000/api/InfoUsuario/${userCorreo}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la información del usuario', error);
        });

    }
  }, [authenticated]);
  

    return (
        <div className='div-father-user'>
          <h1  className='title-user'>Mi cuenta</h1>

          <div className='div-1'>
            <p className='trying'>Correo electrónico
            <br></br> {userInfo.correo_electronico}</p>
            <p className='trying'>Nombre
            <br></br> {userInfo.nombre}</p>
            <p className='trying'>Apellidos
            <br></br> {userInfo.apellidos}</p>
            <p className='trying'>Fecha de nacimiento
            <br></br> {formatDateString(userInfo.fecha_nacimiento)}</p>
            
          </div>

        <button onClick={handleUpdate}>Actualizar Datos</button>

        </div>
      );
}

export default Usuario;