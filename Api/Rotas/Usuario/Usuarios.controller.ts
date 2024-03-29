import {Rotas} from '../Routes';
import { UsuarioService } from './usuarios.service';
import express = require('express');
import { Collections } from '../../MongoDB/MongoCollections';

const app: express.Application = express();

app.post(Rotas.Login, (req : any, res, next) => {
    console.log(req.body);
    UsuarioService.authenticate(req.body)
        .then((user: Collections.Cliente) => res.json(user))
        .catch(next);
})

app.post(Rotas.Registro, (req,res, next) =>{
    console.log(req.body.cliente);
    UsuarioService.create(req.body.cliente)
        .then((user: Collections.Cliente | any) => res.json(user))
        .catch(next);
})

module.exports = app;