const express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
const config = require('../config/auth')
const bcrypt = require('bcrypt')
const db = require('../config/database')
const Users = require('../models/Users')

router.get('/', function (req, res, next) {
  //res.send('respond with a resource');
});


const users = []

router.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hashedPassword)
    res.status(201).send() // Created
  } catch {
    res.status(500).send() // Internal Server Error
  }
})


router.post('/', async (req, res, next) => {
  Users.findOne({
    where: {
      username: req.body.username,
    }
  })
    .then(async user => {
      if (user === null) {
        console.log('Not found!');
        res.status(401).send() // Unauthorized
      } else {
        try {
          if (await bcrypt.compare(req.body.password, user.get('password'))) {
            console.log("OK")
            var token = jwt.sign({ id: user.get('id') }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            })
            var response = {
              'username': user.get('username'),
              'token': token,
            }
            res.status(200).send(response) // OK
          } else {
            console.log("passwords mismatch")
            res.status(401).send() // Unauthorized
            return
          }
        } catch {
          console.log("error in login procedure")
          res.status(401).send() // Unauthorized
        }
      }
    })
    .catch(err => console.log("couldnt find user" + err))
})

module.exports = {
  router
}