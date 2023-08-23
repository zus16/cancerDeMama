const express = require('express')
const mysql2 = require('mysql2')
const exconn = require('express-myconnection')
<<<<<<< HEAD
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()

app.set('port',process.env.PORT || 9000)

const database_pass = process.env.password;

=======
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.set('port',process.env.PORT || 9000)

>>>>>>> 2a8f2e79f4a2d7a6336ce851622a288ca026d592
const dboptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
<<<<<<< HEAD
    password: database_pass,
=======
    password: 'Contra_mySQL16!!',
>>>>>>> 2a8f2e79f4a2d7a6336ce851622a288ca026d592
    database: 'expotec2023cancerdemama',
}
    
//Obtener direcciones

app.use(exconn(mysql2, dboptions, 'single'))
app.use(express.json())
app.use(cors())
<<<<<<< HEAD
app.use(bodyParser.json())
=======
>>>>>>> 2a8f2e79f4a2d7a6336ce851622a288ca026d592

app.get('/', (req,res)=>{
    res.send('esta es mi API')
})

app.use('/api', routes)

app.listen(app.get('port'), ()=>{
    console.log('server en el puerto', app.get('port'))
<<<<<<< HEAD
})

=======
})
>>>>>>> 2a8f2e79f4a2d7a6336ce851622a288ca026d592
