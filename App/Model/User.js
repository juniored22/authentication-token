/*!
 * User Model
 * Copyright(c) 2020-2020 Edgard Junior
 * MIT Licensed
 */

"use strict"

const Sequelize = require('sequelize');
const Mongoose  = require('mongoose');

class User extends Sequelize.Model {

  /**
   * Create init sequelize model user
   */
  static sequelizeInit(connection) {
    super.init(
      {
        name: Sequelize.DataTypes.STRING,
        email: Sequelize.DataTypes.STRING,
        password: Sequelize.DataTypes.STRING,
        token: Sequelize.DataTypes.STRING
      }, {
      sequelize: connection, modelName: 'user'
    })
  }

  static mongoInit(connection) {
    const Schema = connection.Schema;

    const User = new Schema({
      name: String,
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      token: {
        type: String,
        unique: true
      },
      create_at: {
        type: Date,
        default: Date.now
      },
      update_at: {
        type: Date,
        default: Date.now
      }
    });

    connection.model('User', User)
  }

  /**
   * Handler OverwriteModelError  create sequelize 
   * Create method create mongoose model
   * Defalt sequelize
   * @param {*} obj 
   */
  static create(obj) {
    if (process.env.NOSQL== 'true') {
      const user = Mongoose.models.User
      return user.create(obj)
    }

    return super.create(obj)
  }

  static findAll(obj) {
    if (process.env.NOSQL == 'true') {
      const user = Mongoose.models.User

      if(typeof obj === 'object')
        return user.find(obj.where)
      
      return user.find(obj)
    }

    return super.findAll(obj)
  }

  static findByPk(obj) {
    if (process.env.NOSQL == 'true') {
      const user = Mongoose.models.User
      return user.findById(obj)
    }

    return super.findByPk(obj)
  }

  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}

module.exports = User;
