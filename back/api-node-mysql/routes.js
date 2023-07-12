const express = require('express')
const routes = express.Router()

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