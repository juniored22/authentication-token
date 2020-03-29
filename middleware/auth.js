const bcrypt = require('bcryptjs');

function encrypt(password) {
  var crypted = bcrypt.hash(password, 10)
  return crypted;
}
 
var encrypt_password = async (req, res, next) => {
  if(req.body.password != undefined){
    req.body.password = await encrypt(req.body.password)
    req.body.token    = await bcrypt.hash(req.body.password,10)
  }
  next();
}

module.exports = encrypt_password