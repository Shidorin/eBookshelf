const express = require('express')
var router = express.Router()
const db = require('../config/database')
const Book = require('../models/Books')

//send book
router.get('/', (req, res) => {
    Book.findAll()
    .then(book => {
        //console.log(books)
        //res.sendStatus(200)
        res.send(book)
        return
    })
    .catch(err=>console.log(err))
    //db.query('SELECT * FROM books', (err,result)=> {
    //    if (err) throw err
//
    //})
})


module.exports = {
    router
}