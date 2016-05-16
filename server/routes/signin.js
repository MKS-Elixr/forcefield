var helper = require('./helper.js')
var jwt = require('jsonwebtoken')
var router = require('express').Router()

router.post('/schools/signin', function (req, res) {
  var generateToken = jwt.sign({
    name: req.body.name,
    password: req.body.password
  }, process.env.TOKEN_SECRET)

  console.log(req.body.name)

  helper.getSchoolName(req.body.name).then(function (nameResp) {
    console.log('nameResp ', nameResp)
    console.log(nameResp.length)
    if (nameResp.length === 0) {
      res.json({success: false}).status(500)
    } else {
      helper.getSchoolPassword(req.body.name).then(function (resp) {
        if (req.body.password === resp[0]['password']) {
          console.log('resp at 0', resp[0])
          res.json({success: true, generateToken: generateToken}).status(201)
        } else {
          res.json({success: false}).status(500)
        }
      })
    }
  })
})

router.post('/signin', function (req, res) {
  var generateToken = jwt.sign({
    email: req.body.email,
    password: req.body.password,
    phonenum: req.body.phone,
    name: req.body.name,
    school: req.body.school
  }, process.env.TOKEN_SECRET)

  helper.getStudentsEmail(req.body.email).then(function (emailResp) {
    if (emailResp.length === 0) {
      res.json({success: false}).status(500)
    } else {
      helper.getStudentsPassword(req.body.email).then(function (resp) {
        if (req.body.password === resp[0]['password']) {
          res.json({success: true, generateToken: generateToken}).status(201)
        } else {
          res.json({success: false}).status(500)
        }
      })
    }
  })
})

module.exports = router
