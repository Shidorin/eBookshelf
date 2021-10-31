const express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../modules/database')
const Users = require('../models/Users')


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
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
            res.status(200).send() // OK
          } else {
            res.status(401).send() // Unauthorized
          }
        } catch {
          res.status(401).send() // Unauthorized
        }
        return
      }
    })
    .catch(err => console.log("err" + err))


})

module.exports = {
  router
}