const express = require('express')
const routes = express.Router()
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const blossom_emailpass = process.env.pass;



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
              const token = jwt.sign({ correo_electronico: user.correo_electronico, contrasenna: user.contrasenna }, SECRET_KEY,  { expiresIn: '7d' });
              console.log('inicio de sesion exitoso')   
              console.log(token)      
   
              // Enviar el token JWT al frontend como respuesta
              return res.status(200).json({ message: 'Inicio de sesion exitoso', token: token });
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
            return res.status(200).json({ message: 'Usuario registrado' });
          }
        });
      });
    });
  });



// RUTA OBTENER DATOS DE LA TABLA USUARIO
routes.get('/InfoUsuario/:correo_electronico', (req, res) => (
  req.getConnection((err, conn) => {
    if (err) return console.log(err);

    const correo_electronico = req.params.correo_electronico;

    conn.query('SELECT correo_electronico, nombre, apellidos, fecha_nacimiento FROM usuario WHERE correo_electronico = ?', [correo_electronico], (err, rows) => {
      if (err) return console.log(err);

      res.json(rows[0]);
    });
  })
));


routes.put('/ActualizarUsuario/:correo_electronico', (req, res) => {
  const { correo_electronico } = req.params;
  const { nombre, apellidos, fecha_nacimiento } = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error connecting to the database' });
    }

    const updateQuery = 'UPDATE usuario SET nombre = ?, apellidos = ?, fecha_nacimiento = ? WHERE correo_electronico = ?';
    const updateValues = [nombre, apellidos, fecha_nacimiento, correo_electronico];

    conn.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error('Error updating user data', err);
        return res.status(500).json({ error: 'Error updating user data' });
      }

      console.log('User data updated:', result);
      res.json({ message: 'User data updated successfully' });
    });
  });
});


routes.delete('/eliminarUser/:correo_electronico', (req, res) => (
  req.getConnection((err, conn) => {
    if (err) return console.log(err);

    const correo_electronico = req.params.correo_electronico;

    conn.query('DELETE FROM usuario WHERE correo_electronico = ?', [correo_electronico], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting user' });
      }

      console.log('User deleted:', result);
      res.json({ message: 'User deleted successfully' });
    });
  })
));


routes.get('/obtener-imagenes/:correo_electronico', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return console.log(err);

    const correo_electronico = req.params.correo_electronico;

    // Obtén el ID del usuario correspondiente al correo_electronico
    const selectQuery = 'SELECT correo_electronico FROM usuario WHERE correo_electronico = ?';
    conn.query(selectQuery, [correo_electronico], (err, rows) => {
      if (err) {
        console.error(err);
        console.log('Error al obtener el ID del usuario');
        return res.status(500).json({ error: 'Error al obtener el ID del usuario' });
      }

      if (rows.length === 0) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      console.log('usuario encontrado, todo bien!')

      const userId = rows[0].correo_electronico;
      console.log(userId)


      // Consulta las imágenes guardadas en la tabla autoexamen
      const selectImagesQuery = 'SELECT pregunta_uno, pregunta_dos, pregunta_tres FROM autoexamen WHERE autoexamen_usuario = ? ORDER BY id DESC';
      conn.query(selectImagesQuery, [userId], (err, rows) => {
        if (err) {
          console.error(err);
          console.log('Error al obtener las imágenes guardadas');
          return res.status(500).json({ error: 'Error al obtener las imágenes guardadas' });
        }

        if (rows.length === 0) {
          console.log('No se encontraron imágenes guardadas');
          return res.status(404).json({ message: 'No se encontraron imágenes guardadas' });
        }

        const savedImages = {
          grupoUno: JSON.parse(rows[0].pregunta_uno),
          grupoDos: JSON.parse(rows[0].pregunta_dos),
          grupoTres: JSON.parse(rows[0].pregunta_tres)
        };

        // Envía las imágenes guardadas al frontend
        console.log('imagenes encontradas, todo bien!')
        res.status(200).json({ savedImages });
      });
    });
  });
});


routes.post('/guardar-imagenes/:correo_electronico', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return console.log(err);


    const selectedImages = req.body.selectedImages;
    const correo_electronico = req.params.correo_electronico;
    const date = req.body.date; // Obtén la fecha del cuerpo de la solicitud


    // Obtén el ID del usuario correspondiente al correo_electronico
    const selectQuery = 'SELECT correo_electronico FROM usuario WHERE correo_electronico = ?';
    conn.query(selectQuery, [correo_electronico], (err, rows) => {
      if (err) {
        console.error(err);
        console.log('error retrieving user ID');
        return res.status(500).json({ error: 'Error retrieving user ID' });
      }

      if (rows.length === 0) {
        console.log('USUARIO NO ENCONTRADO');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const userId = rows[0].correo_electronico;

      // Ahora, realiza la inserción en la tabla autoexamen
      const insertQuery = 'INSERT INTO autoexamen (autoexamen_usuario, fecha, pregunta_uno, pregunta_dos, pregunta_tres) VALUES (?, ?, ?, ?, ?)';
      const insertValues = [
        userId,
        date,
        JSON.stringify(selectedImages.grupoUno),
        JSON.stringify(selectedImages.grupoDos),
        JSON.stringify(selectedImages.grupoTres)
      ];

      console.log(userId)

      conn.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al guardar las imágenes' });
        }

        // Envía una respuesta de éxito al frontend
        res.status(200).json({ message: 'Imágenes guardadas exitosamente', result });
      });
    });
  });
});







/*routes.post('/schedule-reminder-email', (req, res) => {
  const { reminderDate } = req.body;

  const currentTime = new Date().getTime();
  const reminderTime = new Date(reminderDate).getTime();
  const timeUntilReminder = reminderTime - currentTime;

  if (timeUntilReminder <= 0) {
    console.log(timeUntilReminder)
    return res.status(400).json({ message: 'La fecha de recordatorio ya ha pasado.' });
  }else{

  // Programar el envío del correo utilizando node-schedule
  schedule.scheduleJob(reminderTime, async () => {
    const correo_electronico = 'sebzun16@gmail.com'; // Cambia esto por la lógica para obtener el correo del usuario

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        user: 'blossomfreecancer@gmail.com',
        pass: blossom_emailpass 
      }
    });

    const mensaje = {
      from: 'blossomfreecancer@gmail.com',
      to: correo_electronico,
      subject: 'Recordatorio importante BLOSSOM',
      text: 'SI RECIBES ESTE CORREO ES PORQUE LA LOGICA Y EL CODIGO HA FUNCIONADO. FELICIDADES',
    };

    try {
      const info = await transporter.sendMail(mensaje);
      console.log(info)
      console.log("Correo enviado:", info.response);
    } catch (error) {
      console.log("Hubo un error:", error);
    }
  });

  // Retorna una respuesta inmediata para indicar que el envío está programado
  res.status(200).json({ message: 'Envío de correo de recordatorio programado.' });
}
});*/




module.exports = routes
=======

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

// RUTA PARA INSERTAR DATOS EN LA TABLA USUARIO
routes.post('/', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('INSERT INTO usuario set ?', [req.body], (err, rows)=>{
        if(err) return console.log(err)

        res.send('usuario registrado!')
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
>>>>>>> 2a8f2e79f4a2d7a6336ce851622a288ca026d592
