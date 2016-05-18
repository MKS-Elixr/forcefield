var helper = require('./helper.js')
var jwt = require('jsonwebtoken')
var router = require('express').Router()

router.post('/signup', function (req, res) {
  var generateToken = jwt.sign({
    email: req.body.email,
    password: req.body.password,
    phonenum: req.body.phone,
    name: req.body.name,
    school: req.body.school
  }, process.env.TOKEN_SECRET)

  if (req.body.name === '') {
    res.json({success: false})
  }
  helper.getStudentsEmail(req.body.email).then(function (resp) {
    if (resp.length === 0) {
      helper.getStudentSchoolID(req.body.school).then(function (resp1) {
        if (resp1.length > 0) {
          helper.insertStudentsInfo({email: req.body.email, password: req.body.password, phonenum: req.body.phone, name: req.body.name, sid: resp1[0]['id']}).then(function (resp2) {
          })
        } else {
          res.json({success: false})
        }
        res.json({success: true, generateToken: generateToken})
      })
    } else {
      res.json({success: false})
    }
  })
})

module.exports = router
