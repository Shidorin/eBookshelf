const express = require('express')
var router = express.Router()
const Reviews = require('../models/Reviews')
const User = require('../models/Users')

//get reviews
router.get('/:id', (req, res) => {
    Reviews.findAll({
        where: {
            book_id: req.params.id
        }
    }).then(reviews => {
        res.status(201).send(reviews)  // Created
    })
})

//create new user's review
router.post('/:id', (req, res) => {
    User.findAll({
        where: [{
            username: req.body.username,
        }],
        attributes: ["id"],
        raw: true,
    }).then(dataUser => {
        for (userId of dataUser) {
            Reviews.create({
                user_id: userId.id,
                book_id: req.params.id,
                title: req.body.title,
                body: req.body.body,
                score: req.body.score,
            })
        }
    })
    res.status(200).send()
})

module.exports = {
    router
}