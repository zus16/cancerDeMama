import React, {useState} from 'react'
import { Link} from 'react-router-dom'


const SignUp = () => {

    const [usuario, setUsuario] = useState({});

    const handleInput = e => {
        setUsuario ({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        //validacion inputs
        if(usuario.nombre === '' || usuario.apellidos === '' || usuario.correo_electronico === '' || usuario.fecha_nacimiento === '' || usuario.contrasenna === '' ){
            alert("Debe de rellenar todos los campos");
            return
        }

        //consulta
        const requestinit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuario)
        }
        fetch('http://localhost:9000/api/signup', requestinit)
        .then(res => res.json())
        .then(res => console.log(res))
    }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
        <h2>Regístrarse</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Nombre</label>
                <input name='nombre' type='text' placeholder='Ingrese su nombre' id='name' onChange={handleInput} className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='lastnames'>Apellidos</label>
                <input name='apellidos' type='text' placeholder='Ingrese sus apellidos'  onChange={handleInput} className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='email'>Correo electronico</label>
                <input name='correo_electronico' type='text' placeholder='Ingrese su correo'  onChange={handleInput} className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='borndate'>Fecha de nacimiento</label>
                <input name='fecha_nacimiento' type='date' placeholder='Ingrese su fecha de nacimiento'  onChange={handleInput} className='form-control rounded-0'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='password'>Contraseña</label>
                <input name='contrasenna' type='password' placeholder='Cree una contraseña'  onChange={handleInput} className='form-control rounded-0'></input>
            </div>
            <button type='submit' className='btn btn-success w-100'>Regístrarse</button>
            <p>Aceptar términos y condiciones</p>
            <Link to = '/login' className='btn btn-default border w-100 text-decoration-none'>¿No tienes una cuenta?</Link>
        </form>
    </div>   
</div>
  )
}

export default SignUp