const bcrypt = require('bcryptjs');

function encrypt(password) {
  var crypted = bcrypt.hash(password, 10)
  return crypted;
}
 
var encrypt_password = async (req, res, next) => {
  if(req.body.password != undefined){
    req.body.password = await encrypt(req.body.password)
    req.body.token    = await encrypt(req.body.password + req.body.email)
  }
  next();
}

module.exports = encrypt_password