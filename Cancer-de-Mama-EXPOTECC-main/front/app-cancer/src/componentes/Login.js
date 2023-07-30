import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/login.css'

// Configurar el token en las cabeceras de autorización de Axios
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
  
        // Manejar la respuesta de la API
        console.log(response.data); 
  
        localStorage.setItem('token', response.data.token);

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
      }
    };

  return (
    <div className='div-father'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Iniciar sesión</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='correo_electronico'>Correo</label>
                    <input type='text' placeholder='Escriba su correo' name='correo_electronico' onChange={(e) => setCorreo(e.target.value)} className='form-control rounded-0'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='contrasenna'>Contraseña</label>
                    <input type='password' placeholder='Escriba su contraseña' name='contrasenna' onChange={(e) => setContra(e.target.value)} className='form-control rounded-0'></input>
                </div>
                <button type="submit" className='btn btn-success w-100'>Iniciar sesión</button>
                {errorMessage && <p>{errorMessage}</p>}
                <p>Aceptar términos y condiciones</p>
                <Link to = '/signup' className='btn btn-default border w-100 text-decoration-none'>¿Olvidaste tu contraseña</Link>
                <Link to = '/registro' className='btn btn-default border w-100 text-decoration-none'>¿No tienes una cuenta? Cree una</Link>
            </form>
        </div>   
    </div>
  )

}

export default Login