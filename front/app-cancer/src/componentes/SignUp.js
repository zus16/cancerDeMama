import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './css/signup.css'


const SignUp = () => {

    const travelToLogin = useNavigate();

        const [nombre, setNombre] = useState('');
        const [apellidos, setApellidos] = useState('');
        const [correo_electronico, setCorreo] = useState('');
        const [fecha_nacimiento, setFechaNacimiento] = useState('');
        const [contrasenna, setContrasenna] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          const usuario = {
            nombre,
            apellidos,
            correo_electronico,
            fecha_nacimiento,
            contrasenna
          };
      
          axios.post('http://localhost:9000/api/registro', usuario)
            .then((response) => {
              alert(response.data.message); // Alerta con el mensaje del backend
              travelToLogin('/Login')
              setNombre('');
              setApellidos('');
              setCorreo('');
              setFechaNacimiento('');
              setContrasenna('');
            })
            .catch((error) => {
              if (error.response) {
                // Error con código de estado de error
                alert(`${error.response.data.message}`);
              } else {
                // Error sin código de estado de error (por ejemplo, no se pudo conectar al backend)
                alert('Error al conectar con el servidor');
              }
            });
        };

  return (
  <div className='div-father-SIGNUP'>

        <div className='backgorund-img-logo'>
          <h1></h1>
        </div>
      
      <div className='info-Signup'>
        <h2>
          Regístrarse
        </h2>

        <form onSubmit={handleSubmit}>
            <div className='input-contenedor1'>
                <label htmlFor='name' className='form-label'></label>
                <input name='nombre' type='text' placeholder='Ingrese su nombre' value={nombre} id='name' onChange={(e) => setNombre(e.target.value)} required className='input-dato'></input>
            </div>
            <div className='input-contenedor1'>
                <label htmlFor='lastnames'></label>
                <input name='apellidos' type='text' placeholder='Ingrese sus apellidos' value={apellidos} onChange={(e) => setApellidos(e.target.value)} required className='input-dato'></input>
            </div>
            <div className='input-contenedor1'>
                <label htmlFor='email'></label>
                <input name='correo_electronico' type='text' placeholder='Ingrese su correo' value={correo_electronico} onChange={(e) => setCorreo(e.target.value)} required className='input-dato'></input>
            </div>
            <div className='input-contenedor1'>
                <label htmlFor='borndate'></label>
                <input name='fecha_nacimiento' type='date' placeholder='Ingrese su fecha de nacimiento' value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className='input-dato'></input>
            </div>
            <div className='input-contenedor1'>
                <label htmlFor='password'></label>
                <input name='contrasenna' type='password' placeholder='Cree una contraseña' value={contrasenna}  onChange={(e) => setContrasenna(e.target.value)} required className='input-dato'></input>
            </div>
            <div className='div-btn-registrar'>
            <button type='submit' className='btn-iniciar-sesion'>Regístrarse</button>
            </div>
            <div className='div-btn-link-login'>
            <Link to = '/login' className='btn-link-login'>Inicia sesión</Link>
            </div>
        </form>

      </div>   
  </div>
  )
}

export default SignUp
