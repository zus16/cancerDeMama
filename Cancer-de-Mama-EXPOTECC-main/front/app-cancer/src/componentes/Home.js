import React from 'react';
import { Link } from 'react-router-dom';
import './css/home.css'

function Home({ authenticated, setAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      {authenticated ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <p>Por favor, inicia sesión para acceder a esta página.</p>
      )}
      <Link to="/login">Iniciar sesion</Link>
    </div>
  );
}

export default Home;