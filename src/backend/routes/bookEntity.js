const express = require('express')
var router = express.Router()
const db = require('../config/database')
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')


//const connection = require('../modules/database').con

//const book = connection.define()

router.get('/:id/:title', (req, res) => {
    Book.findAll({
        where: {
            id: req.params.id,
        }
    })
        .then(book => {
            //console.log(book)
            //res.sendStatus(200)
            res.send(book)
            return
        })
        .catch(err => console.log(err))
})


router.get('/:id/:title/:username', (req, res) => {
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
        where: {
            id: req.params.id,
        },
        attributes: ['description', 'genre', 'release_date', 'title',],
        include: [{
            where: {
                username: req.params.username,
            },
            attributes: [],
            model: User,
            raw: true,
            through: { attributes: ['date_completed', 'date_start', 'score', 'status',], }

        }]
    }).then(data => {
        console.log(data)
        if (data.length == 0) {
            Book.findAll({
                raw: true,
                where: {
                    id: req.params.id,
                },
                attributes: ['description', 'genre', 'release_date', 'title',],
            }).then(book => {
                res.status(200).send(book)
            })
        } else {
            res.status(200).send(data)
        }
    }).catch(err => console.log(err))
})


module.exports = {
    router
}