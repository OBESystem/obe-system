import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "obes"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Message: "We need token.. Login again.."});
    }
    else
    {
        jwt.verify(token, "jsonwebtoken-secret-key", (err, decoded) => {
            if(err)
            {
                return res.json({Message: "Authentication error"});
            }
            else
            {
                req.name= decoded.name;
                req.id = decoded.id;
                req.dept = decoded.dept;
                next();
            }
        })
    }
}

app.get('/TeacherDashboard', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name, id: req.id, dept: req.dept});
})

app.get('/TeacherInfo', (req, res) => {
    const sql = "SELECT * FROM coursetable WHERE `t_id` = ?";
    const values = [req.query.id];

    db.query(sql, [values], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
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
                const name = data[0].name;
                const id = data[0].t_id;
                const dept = data[0].department;
                const token = jwt.sign({ name, id, dept },"jsonwebtoken-secret-key", {expiresIn: '1d'});
                res.cookie('token', token);
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


app.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.listen(7000, ()=> {
    console.log("Listening..");
})