import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import Login from './componentes/Login'
import SignUp from './componentes/SignUp'
import Home from './componentes/Home'
import NavbarComponent from './componentes/menuNavBar'
import Usuario from './componentes/user'
import AutoexamenAvisos from './componentes/autoexamenAvisos';
import Informacion from './componentes/informacion';
import Autoexamen_fechas from './componentes/autoexamen_fechas';
import Autoexamen from './componentes/autoexamen';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function menuToggle() {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }

   function cerrarSesion () {
    Cookies.remove('token');
    setAuthenticated(false);
    <Navigate to="/login" />
  };

  useEffect(() => {
    const authToken = Cookies.get('token');

    if (authToken) {
      // Si hay un token, comprobar si es válido antes de establecer la autenticación
      const tokenValid = isTokenValid(authToken);

      if (tokenValid) {
        // Si el token es válido, establecer la autenticación
        setAuthenticated(true);
      } else {
        Cookies.remove('token');
        setAuthenticated(false);
      }
    }
  }, []);


  function isTokenValid(authToken) {
    try {
      const tokenPayload = jwt_decode(authToken);
      const expirationTime = tokenPayload.exp;
      const currentTime = Date.now() / 1000; 

      return currentTime < expirationTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false; 
    }
  }


  return (
  <BrowserRouter>
      <NavbarComponent
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        isMenuOpen={isMenuOpen}
        menuToggle={menuToggle}
        cerrarSesion={cerrarSesion} 
      />
      <Routes>

      <Route path="/" element={<Navigate to="/Home" />} />        

        <Route path='/Home'  element={(
          <Home
          />
        )} />

        <Route path='/Informacion'  element={authenticated ? (
              <Informacion
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            ) }>

        </Route>

        <Route path='/usuario'  element={authenticated ? (
              <Usuario
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            ) }>

        </Route>

        <Route path='/autoexamen/avisos'  element={authenticated ? (
              <AutoexamenAvisos
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            ) }>

        </Route>

        <Route path='/autoexamen'  element={authenticated ? (
              <Autoexamen
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            ) }>

        </Route>

        <Route path='/autoexamen/fechas'  element={authenticated ? (
              <Autoexamen_fechas
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            ) }>

        </Route>

        <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />}></Route>
        
        <Route path='/registro' element={<SignUp setAuthenticated={setAuthenticated} />}></Route>

      </Routes>
  </BrowserRouter>
    
  )
}

export default App
