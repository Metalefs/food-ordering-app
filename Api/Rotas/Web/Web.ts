import {Rotas} from '../Routes';
import {Mongo} from '../../MongoDB/Mongo';
import {Collections} from '../../MongoDB/MongoCollections';
import express = require('express');

const app: express.Application = express();

// [GET]----------------------------------------------------------------------------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get(Rotas.Cardapios, (req:any,res) =>{
    if(req.queryObj !== undefined)
        res.send(Mongo.BuscarUm(Collections.Cardapio.NomeID, JSON.parse(req.queryObj) ))
    Mongo.Ler(Collections.Cardapio.NomeID,res);
});
app.get(Rotas.InfoContato, (req,res) => {
    Mongo.Ler(Collections.InformacoesContato.NomeID,res);
});
app.get(Rotas.Sobre, (req,res) => {
    Mongo.Ler(Collections.Sobre.NomeID,res);
});
app.get(Rotas.PrecoMarmitex, (req,res) => {
    Mongo.Ler(Collections.PrecoMarmitex.NomeID,res);
});
app.get(Rotas.Complemento, (req,res) => {
    Mongo.Ler(Collections.Complemento.NomeID,res);
});
app.get(Rotas.Seed, (req,res) => {
    Mongo.seedCollections();
    res.send('seeded');
});

module.exports = app;