const Sequalize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequalize.STRING
    },
    password: {
        type: Sequalize.STRING
    },
    email: {
        type: Sequalize.STRING
    },
    birthday: {
        type: Sequalize.DATE
    },
})

module.exports = User;