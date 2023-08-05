const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "obes"
})

app.post('/SignUpAsTeacher', (req, res)=> {
    const sql = "INSERT INTO teachers (`name`, `department`, `t_id`, `email`, `password`) values (?)";
    const values = [
        req.body.name,
        req.body.dept,
        req.body.id,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(7000, ()=> {
    console.log("Listening..");
})