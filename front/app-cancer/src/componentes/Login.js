import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import './css/login.css'

// Configurar el token en las cabeceras de autorización de Axios
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Login({ authenticated, setAuthenticated }) {
    const [correo_electronico, setCorreo] = useState('');
    const [contrasenna, setContra] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const travelToHome = useNavigate();

    useEffect(() => {
      // Si el usuario ya está autenticado, redirigir a la página de inicio
      if (authenticated) {
        travelToHome('/Home');
      }
    }, [authenticated, travelToHome]);

    useEffect(() => {
      if (errorMessage) {
        // Si hay un mensaje de error, mostrar un alert
        alert(errorMessage);
        // Luego, restablecer el mensaje de error en el estado para futuras peticiones
        setErrorMessage('');
      }
      if(errorMessage === 'Inicio de sesion exitoso'){
        travelToHome('/Home')
      }
    }, [errorMessage, travelToHome]);




    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Realizar la solicitud de inicio de sesión a la API
        const response = await axios.post('http://localhost:9000/api/login', {
          correo_electronico: correo_electronico,
          contrasenna: contrasenna,
        });
    
        const token = response.data.token;
        const expirationDate = jwt_decode(token).exp * 1000; // Convertir a milisegundos
        Cookies.set('token', token, { expires: new Date(expirationDate) });
  

        // Restablecer los campos del formulario
        setAuthenticated(true);
        setCorreo('');
        setContra('');
        setErrorMessage(response.data.message);
        
        } catch (error) {
          console.log(error);
        // Manejar el error de la API
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error de inicio de sesión');
        }
        setAuthenticated(false);
      }
    };

  return (
    <div className='div-father-LOGIN'>

      <div className='backgorund-img-logo'>
        <h1>Iniciar sesión</h1>
        </div>

        <div className='info-login'>
        <h2>
        </h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='input-contenedor1'>
                    <label htmlFor='correo_electronico'></label>
                    <input type='text' placeholder='Ingresa tu correo' name='correo_electronico' onChange={(e) => setCorreo(e.target.value)} className='input-dato'></input>
                </div>
                <div className='input-contenedor'>
                    <label htmlFor='contrasenna'></label>
                    <input type='password' placeholder='Ingresa tu contraseña' name='contrasenna' onChange={(e) => setContra(e.target.value)} className='input-dato'></input>
                </div>
                <div className='div-btn-iniciar-sesion'>
                <button type="submit" className='btn-iniciar-sesion'>Iniciar sesión</button>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <div className='div-btn-link-signup'>
                <Link to = '/registro' className='btn-link-signup'>¿No tienes una cuenta? Crea una</Link>
                </div>
            </form>
        </div>   
    </div>
  )

}

export default Login
