const express = require('express')
var router = express.Router()
const db = require('../modules/database')
const Book = require('../models/Books')



//const connection = require('../modules/database').con

//const book = connection.define()

router.get('/:id/:title', (req, res) => {

    Book.findAll({
        where: {
            id: req.params.id,
        }
    }
    )
        .then(book => {
            //console.log(book)
            //res.sendStatus(200)
            res.send(book)
            return
        })
        .catch(err => console.log(err))



    // connection.query('SELECT * FROM books', (err, result) => {
    //    if (err) throw err
    //    console.log(req.params)
    //    res.send(result)
    //    return
    //})
})


module.exports = {
    router
}