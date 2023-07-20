const express = require('express')
const routes = express.Router()

// RUTA PARA EL LOGIN
routes.post('/login', (req, res) => {
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        const { correo_electronico, contrasenna } = req.body;

        conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', [correo_electronico], (err, rows) => {
          if (err) return console.log(err);
    
          if (rows.length === 0) {
            // No se encontró ningún usuario con la dirección de correo electrónico proporcionada
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
    
          const user = rows[0];
    
          if (user.contrasenna !== contrasenna) {
            // La contraseña no coincide
            return res.status(401).json({ message: 'Contraseña incorrecta' });
          }
    
          // Inicio de sesión exitoso
          return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        })

    })

  });

    // RUTA PARA INSERTAR DATOS EN LA TABLA USUARIO SIGNUP
routes.post('/signup', (req, res)=>(
    req.getConnection((err,conn)=>{
    if(err) return console.log(err)

    conn.query('INSERT INTO usuario set ?', [req.body], (err, rows)=>{
        if(err) return console.log(err)

        res.send('usuario registrado!')
    })
    })
))

  /*const { correo_electronico, contrasenna } = req.body;
  (
      'SELECT * FROM usuario WHERE correo_electronico = ?',
      [correo_electronico],
      (error, results) => {
        if (error) {
          console.log('Error al realizar la consulta: ', error);
        } else {
          if (results.length === 0) {
          } else {
            // Compara la contraseña ingresada con la almacenada en la base de datos
            const usuario = results[0];
            bcrypt.compare(contrasenna, usuario.contrasenna, (err, match) => {
              if (err) {
                console.error('Error al comparar contraseñas: ', err);
              } else {
                if (match) {
                  // Las contraseñas coinciden, inicio de sesión exitoso
                  res.json({ message: 'Inicio de sesión exitoso' });
                } else {
                    console.log("error contrasenna")
                }
              }
            });
          }
        }
      }
    );*/




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