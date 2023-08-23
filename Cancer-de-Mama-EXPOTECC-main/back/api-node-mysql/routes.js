const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;


// RUTA PARA EL LOGIN
routes.post('/login', (req, res) => {
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        const { correo_electronico, contrasenna } = req.body;

        conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', [correo_electronico], (err, rows) => {
          if (err) return console.log(err);
    
          if (rows.length === 0) {
            // No se encontró ningún usuario con la dirección de correo electrónico insertada
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
    
          const user = rows[0];
    
          if (user.contrasenna !== contrasenna) {
            // La contraseña no coincide
            return res.status(401).json({ message: 'Contraseña incorrecta' });

            } else {
              // Inicio de sesión exitoso
              const token = jwt.sign({ correo_electronico: user.correo_electronico, contrasenna: user.contrasenna }, SECRET_KEY);
              console.log('inicio de sesion exitoso')   
              console.log(token)      
   
              // Enviar el token JWT al frontend como respuesta
              return res.status(200).json({ message: 'Inicio de sesion exitoso' });
            }
        
        });
    })
});

    // RUTA PARA INSERTAR DATOS EN LA TABLA USUARIO SIGNUP
    routes.post('/registro', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return console.log(err);
  
      const { nombre, apellidos, correo_electronico, fecha_nacimiento, contrasenna } = req.body;
  
      conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', [correo_electronico], (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error del servidor' });
        }
  
        if (rows.length > 0) {
          // Ya existe un usuario con el mismo correo electrónico
          return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
        }
  
        const query = 'INSERT INTO usuario (nombre, apellidos, correo_electronico, fecha_nacimiento, contrasenna) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [nombre, apellidos, correo_electronico, fecha_nacimiento, contrasenna], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error al registrar el usuario' });
          } else {
            console.log('Usuario registrado:', result);
            return res.status(200).json({ message: 'Usuario registrado' });
          }
        });
      });
    });
  });







































































  




// RUTA OBTENER DATOS DE LA TABLA USUARIO
routes.get('/', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('SELECT * FROM usuario', (err, rows)=>{
        if(err) return console.log(err)

        res.json(rows)
    })
    })
))

// RUTA OBTENER DATOS DE LA TABLA CALENDARIO
routes.get('/getcalendar', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('SELECT * FROM calendario', (err, rows)=>{
        if(err) return console.log(err)

        res.json(rows)
    })
    })
))

// RUTA PARA INSERTAR DATOS EN LA TABLA CALENDARIO
routes.post('/addcalendar', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('INSERT INTO calendario set ?', [req.body], (err, rows)=>{
        if(err) return console.log(err)

        res.send('nota registrada!')
    })
    })
))

routes.delete('/:correo_electronico', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('DELETE FROM usuario WHERE correo_electronico = ?', [req.params.correo_electronico], (err, rows)=>{
        if(err) return console.log(err)

        res.send('usuario eliminado!')
    })
    })
))

routes.put('/:correo_electronico', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('UPDATE usuario set ? WHERE correo_electronico = ?', [req.body, req.params.correo_electronico], (err, rows)=>{
        if(err) return console.log(err)

        res.send('usuario actualizado!')
    })
    })
))

module.exports = routes