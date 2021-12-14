const express = require('express')
const { user } = require('pg/lib/defaults')
var router = express.Router()
const Book = require('../models/Books')
const UserBooks = require('../models/UserBooks')
const User = require('../models/Users')


router.post('/', (req, res) => {
    console.log("username " + req.body.username)
    console.log("book_id " + req.body.book_id)
    console.log("score " + req.body.score)
    console.log("status " + req.body.status)
    console.log("date_start " + req.body.date_start)
    console.log("date_completed " + req.body.date_completed)



    /*dodawanie rekordu do book-user
    musze miec id ksiazki i id usera
    dodac do book-user
    score status date oraz ID
    */

    // User.belongsToMany(Book, {
    // through: {
    // model: UserBooks
    // },
    // foreignKey: 'user_id'
    // });
    // 
    // Book.belongsToMany(User, {
    // through: {
    // model: UserBooks
    // },
    // foreignKey: 'book_id'
    // });










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

    // User.belongsToMany(Book, {
    // through: {
    // model: UserBooks
    // },
    // foreignKey: 'user_id'
    // });
    // 
    // Book.belongsToMany(User, {
    // through: {
    // model: UserBooks
    // },
    // foreignKey: 'book_id'
    // });
    // 
    // 
    // Book.findAll({
    // where: {
    // id: req.body.book_id,
    // },
    // include: [{
    // where: {
    // username: req.body.username,
    // },
    // model: User,
    // through: {}
    // 
    // }]
    // }).then(data => {
    //console.log(data)
    // res.status(200).send(data)
    // }).catch(err => console.log(err))


})

module.exports = {
    router
}