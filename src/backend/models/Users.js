const Sequalize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        get() {
            const rawValue = this.getDataValue('id')
            return rawValue ? rawValue : null
        }
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