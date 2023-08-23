import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './css/menunavbar.css'

function NavbarComponent({ authenticated, setAuthenticated, isMenuOpen, menuToggle, cerrarSesion  }) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light" >
      <div className="container-fluid">

        <Link className="navbar-brand" to="/Home">
          Cancer de mama
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                <p>Inicio</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Informacion">
                <p>Información</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/autoexamen/avisos">
                <p>Autoexamen</p>
              </Link>
            </li>

          </ul>
        </div>

        <div className="d-flex">
          <ul className="navbar-nav">

            <div className='svg-profile-img'>
                <svg cursor={'pointer'} onClick={menuToggle} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
            </div>

            {authenticated && isMenuOpen && (
              <div className={`submenu-profile ${isMenuOpen ? 'active' : ''}`}>
              <h3>Hola!</h3>
              <ul>
                <li>
                  <Link className="nav-link" to="/usuario">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg> 
                  <p>Administrar tu cuenta</p>                  
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" onClick={cerrarSesion}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                  </svg> 
                  <p>Cerrar sesion</p>                  
                  </Link>
                </li>
              </ul>
            </div>
          )}


          </ul>
        </div>

      </div>
    </nav>
  );
}


export default NavbarComponent;