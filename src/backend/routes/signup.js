const express = require('express')
var router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

router.get('/', function (req, res, next) {
    //res.send('respond with a resource');
});


router.post('/', (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username,
        }
    }).then(async user => {
        if (user !== null) {
            console.log('Username found!');
            res.status(403) // Forbidden - Already exists
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
                res.status(201) // Created
            } catch {
                res.status(500) // Internal Server Error
            }
        }
    })
})

module.exports = {
    router
}