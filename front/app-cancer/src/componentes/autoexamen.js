import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Calendar from 'react-calendar';
import './css/autoexamen.css';
import { grupo1, grupo2, grupo3 } from '../imagenes';

function Autoexamen({ authenticated, setauthenticated }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [savedImages, setSavedImages] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = async (date) => {

    const userToken = Cookies.get('token');
    const decodedToken = jwt_decode(userToken);
    const userCorreo = decodedToken.correo_electronico;
    setSelectedDate(date);

    const formattedDate = date.toISOString().slice(0, 10);
    try {
      const response = await axios.get(`http://localhost:9000/api/obtener-imagenes/${userCorreo}`);
      const savedImagesData = response.data.savedImages;
    
      // Actualiza el estado savedImages con las imágenes obtenidas del servidor
      setSavedImages(savedImagesData);
    } catch (error) {
      console.error('Error al obtener las imágenes guardadas:', error);
    }
  };



  const handleImageClick = (src) => {
    if (selectedImages.includes(src)) {
      setSelectedImages(selectedImages.filter(img => img !== src));
    } else {
      setSelectedImages([...selectedImages, src]);
    }
  };

  const handleShowImages = async () => {
    if (authenticated) {
      const userToken = Cookies.get('token');
      const decodedToken = jwt_decode(userToken);
      const userCorreo = decodedToken.correo_electronico;

      try {
        const response = await axios.get(`http://localhost:9000/api/obtener-imagenes/${userCorreo}`);
        const savedImagesData = response.data.savedImages;
      
        // Actualiza el estado savedImages con las imágenes obtenidas del servidor
        setSavedImages(savedImagesData);

      } catch (error) {
        console.error('Error al obtener las imágenes guardadas:', error);
      }
    }
  };

  const handleSaveImages = async () => {
    if (authenticated) {
      const userToken = Cookies.get('token');
      const decodedToken = jwt_decode(userToken);
      const userCorreo = decodedToken.correo_electronico;

      const currentDate = new Date(); // Obtén la fecha actual
      const formattedDate = currentDate.toISOString().slice(0, 10); // Formatea la fecha como 'YYYY-MM-DD'
    
  
      try {
        const selectedImagesData = {
          grupoUno: selectedImages.filter(img => Object.values(grupo1).includes(img)),
          grupoDos: selectedImages.filter(img => Object.values(grupo2).includes(img)),
          grupoTres: selectedImages.filter(img => Object.values(grupo3).includes(img))
        };
    
        // Realizar la solicitud POST al backend para guardar las imágenes
        const response = await axios.post(`http://localhost:9000/api/guardar-imagenes/${userCorreo}`, {
          selectedImages: selectedImagesData,
          date: formattedDate
        });
  
        // Mostrar un mensaje al usuario de que las imágenes se han guardado
        alert('Imágenes guardadas exitosamente');
      } catch (error) {
        console.error('Error al guardar las imágenes:', error);
        alert('Hubo un error al guardar las imágenes');
      }
    }
  };




  const events = {}; // Objeto para almacenar eventos por fecha

  // Obtén el año, mes y día actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  
  // Rellena el objeto 'events' con las fechas y las imágenes correspondientes
  Object.keys(savedImages).forEach((grupo, index) => {
    savedImages[grupo].forEach((src) => {
      // Crea una nueva fecha utilizando los valores actuales
      const date = new Date(currentYear, currentMonth, currentDay); // Ajusta esto si es necesario
      const formattedDate = date.toISOString().slice(0, 10);
      
      if (!events[formattedDate]) {
        events[formattedDate] = [];
      }
      
      events[formattedDate].push({ image: src });
    });
  });
  


  return (
    <div className='autoexamenP-div px-5'>



      
      <section className='calendario-section'>
      <div className='calendario-autoexamen'>
        <div className='calendar'>
        <div>
      <h1>Agenda / Calendario</h1>
      <Calendar
  onChange={handleDateChange}
  value={selectedDate}
  tileContent={({ date }) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const eventImages = events[formattedDate] || [];

    return (
      <div className="event-container">
        {eventImages.map((event, index) => (
          <img
            key={index}
            src={event.image}
            alt={`Imagen guardada ${index}`}
            className="event-image"
          />
        ))}
      </div>
    );
  }}
/>
      <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
      {/* Aquí puedes mostrar eventos o tareas para la fecha seleccionada */}
    </div>
        </div>
      </div>
      </section>



      <section className='form-autoexamen'>
        <div className='container-forms-autoexamen'>
        <div className='div-video-autoexamen'>
            <h1>VIDEO</h1>
          </div>

          <div className='div-questions-autoexamen'>
            <h3>Pregunta</h3>'

          <div className='grupo-uno' key='grupo-uno'>
            <h2  className='titulos-divs'>Anomalías en el busto</h2>
            <div className='imagenes'>
              {Object.keys(grupo1).map((key) => (
                <img
                  key={`grupo-uno-${key}`}
                  src={grupo1[key]}
                  alt={key}
                  onClick={() => handleImageClick(grupo1[key])}
                  style={{
                    cursor: 'pointer',
                    margin: '10px',
                    width: '100px',
                    border: selectedImages.includes(grupo1[key]) ? '2px solid red' : 'none',
                    borderRadius: selectedImages.includes(grupo1[key]) ? '35px' : '0'
                  }}
                />
              ))}
            </div>
          </div>

          <div className='grupo-dos' key='grupo-dos'>
            <h2  className='titulos-divs'>Secreciones en el pezón</h2>
            <div className='imagenes'>
              {Object.keys(grupo2).map((key) => (
                <img
                  key={`grupo-dos-${key}`}
                  src={grupo2[key]}
                  alt={key}
                  onClick={() => handleImageClick(grupo2[key])}
                  style={{
                    cursor: 'pointer',
                    margin: '10px',
                    width: '100px',
                    border: selectedImages.includes(grupo2[key]) ? '2px solid red' : 'none',
                    borderRadius: selectedImages.includes(grupo2[key]) ? '35px' : '0'
                  }}
                />
              ))}
            </div>
          </div>


          <div className='grupo-tres' key='grupo-tres'>
            <h2 className='titulos-divs'>Bultos o masas</h2>
            <div className='imagenes'>
              {Object.keys(grupo3).map((key) => (
                <img
                  key={`grupo-tres-${key}`}
                  src={grupo3[key]}
                  alt={key}
                  onClick={() => handleImageClick(grupo3[key])}
                  style={{
                    cursor: 'pointer',
                    margin: '5px',
                    width: '100px',
                    border: selectedImages.includes(grupo3[key]) ? '2px solid red' : 'none',
                    borderRadius: selectedImages.includes(grupo3[key]) ? '35px' : '0'
                  }}
                />
              ))}
            </div>
          </div>

          

          {selectedImages.length > 0 && (
            <div>
              <h2>Imágenes seleccionadas:</h2>
              {selectedImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Imagen seleccionada ${index}`}
                  style={{ width: '100px', height: '100px', marginRight: '10px' }}
                />
              ))}
            </div>
          )}

<br></br>
<br></br>
<button onClick={handleSaveImages}>Guardar</button>
<button onClick={handleShowImages}>Ver mis respuestas</button>


        </div>

        </div>

      </section>

      <section className='respuesta-imagenes'>
  <div className='respuesta-imagenes-div'>
    <h2>Imágenes guardadas:</h2>
    {Object.keys(savedImages).map((grupo, index) => (
      <div key={`grupo-${index}`}>
        <h3>{grupo}</h3>
        <div className='imagenes'>
          {savedImages[grupo].map((src, imgIndex) => (
            <img
              key={`grupo-${index}-img-${imgIndex}`}
              src={src}
              alt={`Imagen guardada ${imgIndex}`}
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
</section>


    </div>
  );
}

export default Autoexamen;
