import {Rotas} from '../Routes';
import {Mongo} from '../../MongoDB/Mongo';
import {Collections} from '../../MongoDB/MongoCollections';
import express = require('express');


import {redisConfig} from '../../Redis/redisConfig';
const app: express.Application = express();

// [GET]----------------------------------------------------------------------------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(Rotas.Cardapios, (req: Express.Request, res: any) =>{
    let key = Rotas.Cardapios;
    getFromCacheOrDb(key,Collections.Cardapio.NomeID).then(result => {
        res.send(result);
    });
});

app.get(Rotas.CardapiosPorDia, (req: any, res: any) =>{
    if(req.query.Dia !== undefined){
        Mongo.Filtrar(Collections.Cardapio.NomeID, {Dia:"1"}).then(x=>{
            res.send(x);
        });
    }
    console.log(req.query.Dia)
});

app.get(Rotas.InfoContato, (req: Express.Request, res: any) => {
    let key = Rotas.InfoContato;
    getFromCacheOrDb(key,Collections.InformacoesContato.NomeID).then(result => {
        res.send(result);
    });
});

app.get(Rotas.Sobre, (req: Express.Request, res: any) => {
    let key = Rotas.Sobre;
    getFromCacheOrDb(key,Collections.Sobre.NomeID).then(result => {
        res.send(result);
    });
});

app.get(Rotas.PrecoMarmitex, (req: Express.Request, res: any) => {
    let key = Rotas.PrecoMarmitex;
    getFromCacheOrDb(key,Collections.PrecoMarmitex.NomeID).then(result => {
        res.send(result);
    });
});

app.get(Rotas.Complemento, (req: Express.Request, res: any) => {
    let key = Rotas.Complemento;
    getFromCacheOrDb(key,Collections.Complemento.NomeID).then(result => {
        res.send(result);
    });
});

async function getFromCacheOrDb (key: string, collection: string){
    return await redisConfig.getCache(key).then((x : any) =>{
        if(x === false || x === undefined){
            return Mongo.LerECachear(collection, redisConfig, key); 
        }
        return x;
    });
}

app.get(Rotas.Seed, (req: Express.Request, res: any) => {
    Mongo.seedCollections();
    res.send('seeded');
});

app.get(Rotas.FlushAll, (req: any, res: any) => {
    if(req.query.force) {
        redisConfig.flushAll().then((x: boolean)=>{
            if(x == true)
            res.send("Flushed");
        });
    }
})

module.exports = app;