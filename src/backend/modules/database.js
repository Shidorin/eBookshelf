//const { Client } = require('pg')
//const client = new Client()
//await client.connect()
//const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//console.log(res.rows[0].message) // Hello world!
//await client.end()


const mysql = require('mysql')

const options = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "dbbooklist",
    multipleStatements: true
}

const con = mysql.createPool(options)

module.exports = {
    con,
    options
}