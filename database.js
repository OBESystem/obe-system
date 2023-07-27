const { createPool} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "obes",
    connectionLimit: 10
})

//pool.query(`select * from teachers where id = ?`, [arguments], (err, result, fields) =>{
pool.query(`select * from teachers`, (err, result, fields) =>{
    if(err)
    {
        return console.log(err);
    }
    console.log(result.length);
    return console.log(result);
})

//To export
//module.exports = pool;

