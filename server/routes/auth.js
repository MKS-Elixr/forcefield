require('dotenv').config()
var jwt = require('jsonwebtoken')

var secret = process.env.TOKEN_SECRET

var auth = {}

auth.verifyToken = function (token, success, error) {
  return jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      error()
    } else {
      success()
    }
  })
}

module.exports = auth
