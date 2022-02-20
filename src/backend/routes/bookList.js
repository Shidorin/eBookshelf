const express = require('express')
var router = express.Router()
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')

//send user related books
router.post('/', (req, res) => {

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

    if (req.body.username) {
        Book.findAll({
            raw: true,
            attributes: ['id', 'title',],
            include: [{
                where: {
                    username: req.body.username,
                },
                model: User,
                attributes: [],
                through: { attributes: ['score', 'status',], }
            }]
        }).then(data => {
            //console.log(data)
            res.status(200).send(data)
        })
    }
    else { res.status(400).send() }
})


module.exports = {
    router
}