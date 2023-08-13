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

app.get('/TeacherDashboard', (req, res) => {
    const sql = "SELECT * FROM teachers WHERE `email` = ?";
    const values = [req.query.email];

    db.query(sql, [values], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.get('/TeacherInfo', (req, res) => {
    const sql = "SELECT * FROM coursetable WHERE `t_id` = ?";
    const values = [req.query.id];

    db.query(sql, [values], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        console.log(req.query.id);
        return res.json(result);
    })
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

app.post('/Login', (req, res)=> {
    
    var type = JSON.stringify(req.body.loginType);
    var l = type.length;
    type = type.slice(2, l -2);
    if(type === "teacher")
    {
        const sql = "SELECT * FROM teachers WHERE `email` = ?";
        db.query(sql, [req.body.email,], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        if(data.length == 0)
        {
            return res.json("Incorrect email!!");
        }
        else
        {
            var str = JSON.stringify(req.body.password);
            var len = str.length;
            str = str.slice(2, len -2);
            if(data[0].password === str)
            {
                return res.json("Successful..");
            }
            else
            {
                return res.json("Incorrect password!!");
            }
        }
       })
    }
})

app.listen(7000, ()=> {
    console.log("Listening..");
})