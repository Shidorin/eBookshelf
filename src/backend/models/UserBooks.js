const Sequalize = require('sequelize');
const db = require('../config/database');

const UserBooks = db.define('book-user', {
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
    score: {
        type: Sequalize.INTEGER
    },
    status: {
        type: Sequalize.STRING
    },
    date_start: {
        type: Sequalize.DATE
    },
    date_completed: {
        type: Sequalize.DATE
    },
}, {
    tableName: 'book-user'
})

module.exports = UserBooks;