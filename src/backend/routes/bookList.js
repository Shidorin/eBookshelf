const express = require('express')
var router = express.Router()
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')

// User.belongsToMany(UserBooks, {
//    through: 'book-user',
//    foreignKey: 'id',
// })
// UserBooks.belongsToMany(User, {through: 'book-user'})
// 
// Book.belongsToMany(UserBooks, {through: 'book-user'})
// UserBooks.belongsToMany(Book, {through: 'book-user'})



//send user related books
router.post('/', (req, res) => {
    //     User.findOne({
    //        where: {
    //            username: req.body.username
    //        }
    //     }).then(user => {
    //        console.log(user.id)
    //        UserBooks.findAll({
    //            where: {
    //                user_id: user.id,
    //            }
    //        }).then(userBooks => {
    //            Books.findAll({
    //                where: {
    //                    id: userBooks.book_id,
    //                }
    //            }).then(books => {
    //                console.log(books)
    //                res.status(200).send(books)
    //            })
    //        })
    //     }).catch(err => console.log(err))
    //     Book.findAll({
    //        where: {
    //            '$Book.id$': '$UserBooks.book_id',
    //        },
    //        include: [{
    //            model: UserBooks,
    //            required: false,
    //            where: {
    //                '$UserBooks.user_id': '$User.id',
    //            },
    //            include: [{
    //                model: User,
    //                required: false,
    //                where: {
    //                    '$User.id': req.body.username,
    //                },
    //            }]
    //        }],
    //     });

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
        raw:true,
        include: [{
            where: {
                username: req.body.username,
            },
            model: User,
        }]
    }).then(data => {
        //console.log(data)
        res.status(200).send(data)
    })

})


module.exports = {
    router
}