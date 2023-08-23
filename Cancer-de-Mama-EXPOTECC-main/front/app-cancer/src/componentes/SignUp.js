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
    <div className='div-father'>
    <div className='bg-white p-3 rounded w-25'>
        <h2>Regístrarse</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Nombre</label>
                <input name='nombre' type='text' placeholder='Ingrese su nombre' value={nombre} id='name' onChange={(e) => setNombre(e.target.value)} required className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='lastnames'>Apellidos</label>
                <input name='apellidos' type='text' placeholder='Ingrese sus apellidos' value={apellidos} onChange={(e) => setApellidos(e.target.value)} required className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='email'>Correo electronico</label>
                <input name='correo_electronico' type='text' placeholder='Ingrese su correo' value={correo_electronico} onChange={(e) => setCorreo(e.target.value)} required className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='borndate'>Fecha de nacimiento</label>
                <input name='fecha_nacimiento' type='date' placeholder='Ingrese su fecha de nacimiento' value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password'>Contraseña</label>
                <input name='contrasenna' type='password' placeholder='Cree una contraseña' value={contrasenna}  onChange={(e) => setContrasenna(e.target.value)} required className='form-control rounded-0'></input>
            </div>
            <button type='submit' className='btn btn-success w-100'>Regístrarse</button>
            <p>Aceptar términos y condiciones</p>
            <Link to = '/login' className='btn btn-default border w-100 text-decoration-none'>Inicia sesión</Link>
        </form>
    </div>   
</div>
  )
}

export default SignUp