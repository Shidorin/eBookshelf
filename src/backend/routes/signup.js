const express = require('express')
var router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

//create new user
router.post('/', (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username,
        }
    }).then(async user => {
        if (user !== null) {
            console.log('Username found!');
            res.status(403).send() // Forbidden - Already exists
            return
        }
        else {
            try {
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                Users.create({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email,
                })
                res.status(201).send()  // Created
            } catch {
                res.status(500).send()  // Internal Server Error
            }
        }
    })
})

module.exports = {
    router
}