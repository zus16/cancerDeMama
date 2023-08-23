import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';

function NavbarComponent() {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://localhost:3000/Home">Cancer de mama</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">


            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="http://localhost:3000/Home">Inicio 
              </a>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/Informacion">información </a>
            </li>


              <li className="nav-item">
                <a className="nav-link" href="">Autoexamen</a>
              </li>


            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Usuario </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="http://localhost:3000/registro">Registrarse</a></li>
                <li><a className="dropdown-item" href="http://localhost:3000/Login">Loguearse</a></li>
              </ul>
            </li>




            
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default NavbarComponent;