const MongoClient = require('mongodb').MongoClient;
const MDBurl = "mongodb://127.0.0.1:27017/";
const MongoDBName = "ElShadday";

import {Seeder} from "./MongoSeed";
const Options = {
      useNewUrlParser: true, 
      poolSize : 10      
}
import * as logger from "../logger";

export module Mongo {
      export function createCollection(collection: string | any[]){ // CRIAR COLEÇÕES DE DADOS (Não utilizado)
            for(let i = 0; i < collection.length; i++){
                  MongoClient.connect(MDBurl,Options, function(err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                        if (err){
                              logger.log(err)
                              throw err;
                        }
                        var dbo = db.db(MongoDBName);
                        dbo.createCollection(collection[i], function(err: any, res: any) {
                              if (err){
                                    logger.log(err)
                                    throw err;
                              }
                        });
                        db.close();
                  }); 
            }
      }
      
      export function deleteCollection (collection: string){ //DELETA COLEÇÃO DE DADOS 
            MongoClient.connect(MDBurl,Options, function(err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                  if (err){
                        logger.log(err)
                        throw err;
                  }
                  var dbo = db.db(MongoDBName);
                  dbo.collection(collection).drop(function(err: any, res: any) {
                        if (err){
                              logger.log(err)
                              throw err;
                        }
                        if (res) console.log("Collection "+collection+" deleted | "+new Date());
                        db.close();         
                  });
            }); 
      }
      /*Seeding Mongo DB */
      
      export function seedCollections(){
            let collectionsToSeed = Seeder.SeedCollections();

            collectionsToSeed.forEach((collection: any)=>{
                  collection.Single ?
                        Insert(collection.name,collection.value)
                  :
                        InsertMany(collection.name,collection.value)
            })
      }
      /*----------------------------*/

      export function InsertMany(collection: any, value: any)  { // CRIA COLEÇÃO IMPLICITAMENTE E INSERE VÁRIOS
            MongoClient.connect(MDBurl,Options, function(err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                  if (err){
                        logger.log(err)
                        throw err;
                  }
                  let dbo = db.db(MongoDBName);
                  dbo.collection(collection).insertMany(value, function(err: any, res: any) {
                        if (err){
                              logger.log(err)
                              throw err;
                        }
                        console.log("Inserido "+res.insertedCount+" "+collection+" :  | "+new Date());
                        db.close();
                  });
            });
      }

      export function Insert (collection: any,value: any)  { // CRIA COLEÇÃO IMPLICITAMENTE E INSERE UM
           
            MongoClient.connect(MDBurl,Options, function(err: any, db: { db: (arg0: string) => any; close: () => void; }) {
                  if (err){
                        logger.log(err)
                        throw err;
                  }
                  let dbo = db.db(MongoDBName);
                  dbo.collection(collection).insertOne(value, function(err: any, res: any) {
                        if (err){
                              logger.log(err)
                              throw err;
                        }
                        console.log("Inserido "+res.insertedCount+" "+collection+" : | "+new Date());
                        db.close();
                  });
            });
      }      

      export function Ler (collection: string, res : Express.Response){ // OBTÉM DADOS DO BANCO SEM COLOCAR EM CACHE
            MongoClient.connect(MDBurl,Options, function(err: any, db: { db: (arg0: string) => any; close: () => object; }) {
                  if (err){
                        logger.log(err)
                        throw err;
                  }
                  var dbo = db.db(MongoDBName);
                  dbo.collection(collection).find({}).toArray(function(err: any, result: any) {
                        if (err){
                              logger.log(err)
                              throw err;
                        }
                        db.close();
                        res.json(result);
                  });
            });
      }
      
}