import React, { useState } from 'react';
import './css/autoexamen_fechas.css'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Autoexamen_fechas = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(null);

  const travelAutoexamen = useNavigate();

  function traveltoAutoexamen(){
    travelAutoexamen('/autoexamen')
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);

    const reminderDate = new Date(date);
    reminderDate.setDate(reminderDate.getDate() + 1);

    setReminderDate(reminderDate);
  };

  const handleSendReminderEmail = async () => {
    if (reminderDate) {
      try {
        const response = await axios.post('http://localhost:9000/api/schedule-reminder-email', {
          reminderDate: reminderDate.toISOString(), 
        });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error al programar el envío del correo de recordatorio:', error);
      }
    } else {
      console.log('Selecciona una fecha para programar el recordatorio.');
    }
  };

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendar = [];

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          const date = new Date(year, month, dayCounter);
          week.push(date);
          dayCounter++;
        }
      }

      calendar.push(week);
      if (dayCounter > daysInMonth) {
        break;
      }
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handlePrevYear = () => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setSelectedDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setSelectedDate(newDate);
  };

  const calendarYear = selectedDate.getFullYear();
  const calendarMonth = selectedDate.getMonth();
  const calendar = generateCalendar(calendarYear, calendarMonth);

  return (
    <div className='div_father_autoexamenDate'>
      <h2>¿Cuándo comenzó tu último periodo?</h2>
      <div>
        <h3>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</h3>
        <button onClick={handlePrevMonth}>Mes anterior</button>
        <button onClick={handleNextMonth}>Mes siguiente</button>
        <button onClick={handlePrevYear}>Año anterior</button>
        <button onClick={handleNextYear}>Año siguiente</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Domingo</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, dayIndex) => (
                <td
                  key={dayIndex}
                  onClick={() => handleDateClick(date)}
                  className={date && selectedDate && date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}
                >
                  {date ? date.getDate() : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedDate ? (
          <p>Fecha seleccionada: {selectedDate.toDateString()}</p>
        ) : (
          <p>Selecciona una fecha</p>
        )}
      </div>
      <button onClick={handleSendReminderEmail}>Programar Recordatorio</button>
      <button onClick={traveltoAutoexamen}>Ir a autoexamen</button>
    </div>
  );
};

export default Autoexamen_fechas;

