/*!
 * User Controller
 * Copyright(c) 2020-2020 Edgard Junior
 * MIT Licensed
 */

'use strict';
const User      = require('../Model/User')
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

module.exports = {

  async createUser(req, res) {
    const { name, email, password, token } = req.body;
    let user = {}
    
    try {
      user = await User.create({ name, email, password, token });
    } catch (error) {
      console.log(error);
      user.erro = error
      return res.status(404).json({status:404,message:"Not Found"});
    }

    return res.json(user)
  },

  async findAllUsers(req, res) {
    let users = {}
    try {
      users = await User.findAll()
    } catch (err) {
      users.error = err
    }

    return res.json(users)
  },

  async findUser(req, res) {
    const { user_id } = req.params;
    let user = {}
    
    try {
      user    = await User.findByPk(user_id);
    } catch (error) {
      return res.status(400).json({ error: 'User not found' })
    }

    return res.json(user)
  },

  async updateUser(req, res) {
    const { user_id } = req.params;
    const result = await User.update(req.body, user_id);

    if(result == '1' || result.nModified == 1)
      return res.status(200).json({ status: 200, message: 'Update success' })
    
    return res.status(400).json({ error: 'User not found' })
  },

  async deleteUser(req, res) {
    const { user_id } = req.params;
    const result = await User.destroy(user_id);
   
    if(result == '1' || result.deletedCount == 1)
      return res.status(200).json({ status: 200, message: 'Update success' })
    
    return res.status(400).json({ error: 'User not found' })
  }

}
