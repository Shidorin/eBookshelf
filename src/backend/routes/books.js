const express = require('express')
var router = express.Router()
const db = require('../config/database')
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')

//send book
router.get('/', (req, res) => {
    Book.findAll({
        raw: true,
        order: [
            ['rating', 'DESC'],
        ],
    })
        .then(book => {
            //console.log("books" + book)
            //res.sendStatus(200)
            res.send(book)
            return
        })
        .catch(err => console.log(err))
})

router.get('/:username', (req, res) => {
    console.log("username request for books")
    User.belongsToMany(Book, {
        through: {
            model: UserBooks
        },
        foreignKey: 'user_id'
    });

    Book.belongsToMany(User, {
        through: {
            model: UserBooks
        },
        foreignKey: 'book_id'
    });

    Book.findAll({
        raw: true,
        order: [
            ['rating', 'DESC'],
        ],
        attributes: ['id', 'title', 'description', 'release_date', 'genre', 'rating'],
        include: [{
            attributes: [],
            where: { username: req.params.username },
            required: false,
            model: User,
            raw: true,
            through: {
                attributes: ['date_completed', 'date_start', 'score', 'status',],
                book_id: {
                    unique: true
                },
            }
        }]
    }).then(data => {


        res.status(200).send(data)

    })
})


module.exports = {
    router
}