const express = require('express')
const { user } = require('pg/lib/defaults')
var router = express.Router()
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')

// add book to user list
router.post('/', (req, res) => {
    User.findAll({
        where: [{
            username: req.body.username,
        }],
        attributes: ["id"],
        raw: true,
    }).then(dataUser => {
        for (userId of dataUser) {
            UserBooks.create({
                score: req.body.score,
                status: req.body.status,
                date_start: req.body.date_start,
                date_completed: req.body.date_completed,
                user_id: userId.id,
                book_id: req.body.book_id,
            })
        }
    })
    res.status(200).send()
})

module.exports = {
    router
}