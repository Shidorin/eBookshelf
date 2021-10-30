const express = require('express')
var router = express.Router()
/* const db = require('../modules/database')
const Book = require('../models/Books') */

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  const user = { name: req.body.login, password: req.body.password }
  console.log(user)
  res.status(201).send(user)
})

module.exports = {
  router
}