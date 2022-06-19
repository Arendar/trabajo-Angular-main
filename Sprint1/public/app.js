const express = require('express');
const path = require('path ');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { application } = require('express');
const User = require('./user');
const user = require('./user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(_dirname, 'public')));
const mongo_uri = 'mongodb: (aqui falta la direccion de moongose'

mongoose.connect(mongo_uri, function(err){
    if(err){
        throw err;
    } else{
        console.log('Succesfully coonect to ${mongo_uri}');
    }
});

app.post('/register', (req,res)=>{
    const {username, password} = req.body;

    const user= new User({username,password});

    user.save(err=>{
        if(err){
           res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
        }else{
            res.status(200).send('USUARIO REGISTRADO');
        }
    })
});
app.post('/authenticate', (req,res)=>{
    const {username,password} = req.body;

    User.findOne({username}, (err,user) =>{
        if(err){
        res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(password, (err, result)=>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR');
                }else if(result){
                    res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
                }else{
                    res.status(500).send('USUARUIO Y/O CONTRASEÑA INCORRECTA');
                }
            });
        }
    
    })
});

app.listen(3000, () =>{
    console.log('Servidor 1 iniciado...');
});
module.exports= app;