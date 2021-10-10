const express = require('express')
var router = express.Router()
const connection = require('../modules/database').con

router.get('/', (req, res) => {

    connection.query('SELECT id, title FROM books', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})


module.exports = {
    router
}