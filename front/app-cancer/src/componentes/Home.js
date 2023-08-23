import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

function Home() {
  const travel = useNavigate();



  return (
    <div className='div-homeP'>
    <div className='div-father-home'>
      <div className='div-home-title'>
      <h1>Una lucha constante contra el cáncer de mama!</h1>
      </div>
      <div className='son1-home'>HIJO 1</div>
    </div>
    </div>
  );
}

export default Home;
