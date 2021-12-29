const Sequalize = require('sequelize');
const db = require('../config/database');

const Book = db.define('books', {   
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequalize.STRING
    },
    description: {
        type: Sequalize.STRING
    },
    release_date: {
        type: Sequalize.DATE
    },
    relation_id: {
        type: Sequalize.INTEGER
    },
    author_id: {
        type: Sequalize.INTEGER
    },
    genre: {
        type: Sequalize.STRING
    },
    rating: {
        type: Sequalize.FLOAT
    },
})


module.exports = Book;