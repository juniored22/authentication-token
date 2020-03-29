/*!
 * User Controller
 * Copyright(c) 2020-2020 Edgard Junior
 * MIT Licensed
 */

'use strict';
const User      = require('../Model/User');
const bcrypt    = require('bcryptjs');

module.exports  = async (obj) => {

    let users = {}
    
    try {
        users = await User.findAll({
            limit: 1,
            where: {
                email:obj.email
            },
            order: [['created_at', 'DESC']]
        })
    } catch (err) {
        users.error = err
        return {status:404, message:"Not Found"}
    }

    if(users == '')
        return { status: 401, message: "Unauthorized 258", token: false }
    
    
    
    return    await bcrypt.compare(obj.password,users[0].password) 
            ? { status: 202, message: "Accepted",     token: await bcrypt.hash(obj.password, 10) }
            : { status: 401, message: "Unauthorized" ,token: false }
};