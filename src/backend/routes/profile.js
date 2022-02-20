const express = require('express')
var router = express.Router()
const User = require('../models/Users')

//delete user
router.post('/delete', (req, res) => {
    User.destroy({
        where: [{
            username: req.body.username,
        }],
    }).then(() => {
        res.status(200).send()
    })
})

//edit user
router.post('/edit', (req, res) => {
    User.findAll({
        where: [{
            username: req.body.username,
        }],
    }).then(userData => {
        if (req.body.username != "") userData.username = req.body.username
        if (req.body.email != "") userData.email = req.body.email
        if (req.body.password != "") userData.password = req.body.password
        User.update({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            where: [{
                username: req.body.username,
            }],
        })
        res.status(200).send()
    })
})

module.exports = {
    router
}