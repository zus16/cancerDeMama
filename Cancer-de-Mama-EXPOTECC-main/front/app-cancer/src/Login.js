import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios'


function Login() {
    const [correo_electronico, setCorreo] = useState({});
    const [contrasenna, setContra] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Realizar la solicitud de inicio de sesión a la API
        const response = await axios.post('http://localhost:9000/api/login', {
          correo_electronico: correo_electronico,
          contrasenna: contrasenna,
        });
  
        // Manejar la respuesta de la API
        console.log(response.data); // Aquí puedes hacer algo con la respuesta, como almacenar el token de sesión en el estado de tu aplicación
  
        // Restablecer los campos del formulario
        setCorreo('');
        setContra('');
        setErrorMessage('');
      } catch (error) {
        // Manejar el error de la API
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error de inicio de sesión');
        }
      }
    };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
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
                <Link to = '/signup' className='btn btn-default border w-100 text-decoration-none'>Crear cuenta</Link>
            </form>
        </div>   
    </div>
  )

}

export default Login