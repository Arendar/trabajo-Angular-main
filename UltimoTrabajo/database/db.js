const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port:3306,
    database : 'trabajo angular',
})

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion