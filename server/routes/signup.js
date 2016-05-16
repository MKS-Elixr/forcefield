var helper = require('./helper.js')
var jwt = require('jsonwebtoken')
var knex = require('../db/schema.js').knex
var router = require('express').Router()

router.post('/signup', function (req, res) {
  var generateToken = jwt.sign({
    email: req.body.email,
    password: req.body.password,
    phonenum: req.body.phone,
    name: req.body.name,
    school: req.body.school
  }, process.env.TOKEN_SECRET)

  helper.getStudentsEmail(req.body.email).then(function (resp) {
    if (resp.length === 0) {
      knex('students').insert({email: req.body.email, password: req.body.password, phonenum: req.body.phone, name: req.body.name}).then(function (res) {
      })
      res.json({success: true, generateToken: generateToken})
    } else {
      res.json({success: false})
      console.log('Email Exists in ServerPost')
    }
  })
})

module.exports = router
