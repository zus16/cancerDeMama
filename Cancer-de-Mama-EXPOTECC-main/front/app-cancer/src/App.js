import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'

import Login from './componentes/Login'
import SignUp from './componentes/SignUp'
import Home from './componentes/Home'
import NavbarComponent from './componentes/menuNavBar'


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
  <BrowserRouter>
    <NavbarComponent />
      <Routes>
        <Route exact path="/" element={authenticated ? <Navigate to="/Home" /> : <Navigate to="/login"></Navigate>} ></Route>
        

        <Route exact path='/Home'  element={<Home authenticated={authenticated} setAuthenticated={setAuthenticated} />}></Route>

        <Route exact path='/login' element={<Login setAuthenticated={setAuthenticated} />}></Route>
        
        <Route exact path='/registro' element={<SignUp setAuthenticated={setAuthenticated} />}></Route>

      </Routes>
  </BrowserRouter>
    
  )
}

export default App