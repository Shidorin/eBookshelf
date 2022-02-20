const Sequalize = require('sequelize');
const db = require('../config/database');

const Reviews = db.define('reviews', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequalize.INTEGER
    },
    book_id: {
        type: Sequalize.INTEGER
    },
    title: {
        type: Sequalize.STRING
    },
    body: {
        type: Sequalize.STRING
    },
    score: {
        type: Sequalize.INTEGER
    },
    was_helpful: {
        type: Sequalize.STRING
    },
})


module.exports = Reviews;