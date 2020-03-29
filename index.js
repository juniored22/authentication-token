'use strict';
const env           = process.env.NODE_ENV || 'development'
const config        = require('./config/config')[env];
const express       = require('express');
const app           = express();
const compression   = require('compression');
const debug         = require('debug')('log') //DEBUG=log PORT=8080 node index.js
const Connection    = require('./database/Connection');
const User          = require('./App/Model/User');
const bodyParser    = require("body-parser");

require('./server')(app, express, config, debug, compression, bodyParser);
require('./routes')(app, debug)

if(process.env.NOSQL == 'true'){
    debug('DATABASE NOSQL');
    const mongo     =  Connection.mongo(config)
    User.mongoInit(mongo)
}else{
    debug('DATABASE SQL')
    const sequelize =  Connection.sequelize(config)
    User.sequelizeInit(sequelize)
}







