// var knex=require('../db/schema.js').knex
// var app = require('../server.js')

module.exports = function (app, express) {
  app.post('/', function (req, res) {
    console.log('hello')
  })
}
