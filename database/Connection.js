'use strict';
const Sequelize = require('sequelize');
const Mongoose  = require('mongoose');
const debug     = require('debug')('log');
const path      = require('path');

class Connection {

    static sequelize(config) {

        /* Sqlite Sequelize */
        this.sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect,
            storage: path.join(__dirname, '..', config.storage),
            dialectOptions: { // mariadb connector option
                collate: 'utf8mb4_general_ci',
                useUTC: false,
                timezone: process.env.db_timezone,
                connectTimeout: 1000
            },
            define: config.define,
            logging: config.logging
        });

        this.sequelize
            .authenticate()
            .then(() => {
                debug('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        return this.sequelize
    }

    static mongo(config) {
        Mongoose.connect(`mongodb://${config.host}:27017/${config.database}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).catch(error => debug(error));

        Mongoose.connection.on('error', err => {
            debug(err)
        });

        return Mongoose
    }
}

module.exports = Connection