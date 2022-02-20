const { Sequelize } = require('sequelize')


module.exports = new Sequelize("dbbooklist", "root", "", {
  host: '127.0.0.1',
  dialect: "mariadb",
  define: {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
})



//const mysql = require('mysql')
//
//const options = {
//    host: "127.0.0.1",
//    port: 3306,
//    user: "root",
//    password: "",
//    database: "dbbooklist",
//    multipleStatements: true
//}
//
//const con = mysql.createPool(options)
//
//module.exports = {
//    con,
//    options
//}

