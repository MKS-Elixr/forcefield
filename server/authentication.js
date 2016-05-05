var jwt = require('jsonwebtoken')
// var dotenv = require('env').config()

var Authentication = {}

Authentication.generateToken = function (username) {
  return jwt.sign({username: username}, process.env.NTS_SECRET, "12h")
}

Authentication.verifyToken = function (token, successCb, errCb){
  return jwt.verify(token, process.env.NTS_SECRET, function (err, decoded){
    if (err) {
      errorCb()
    } else {
      successCb()
    }
  })
}

module.exports = Authentication
