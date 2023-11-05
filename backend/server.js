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

//User part
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
                req.user_id = decoded.user_id;
                req.dept = decoded.dept;
                req.designation=decoded.designation;
                next();
            }
        })
    }
}

app.post('/SignUp', (req, res)=> {
    const sql = "INSERT INTO user (`name`, `department`, `designation`, `email`, `phoneNumber`, `password`, `userType`) values (?)";
    const values = [
        req.body.name,
        req.body.dept,
        req.body.designation,
        req.body.email,
        req.body.phoneNumber,
        req.body.password,
        0
    ];

    db.query(sql, [values], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/Login', (req, res)=> {
    const sql = "SELECT * FROM user WHERE `email` = ?";
    db.query(sql, [req.body.email], (err, data)=> {
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
            const user_id = data[0].user_id;
            const name = data[0].name;
            const designation = data[0].designation;
            const userType = data[0].userType;
            const dept = data[0].department;
            const token = jwt.sign({ user_id, name, userType, dept, designation },"jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json(userType);
        }
        else
        {
            return res.json("Incorrect password!!");
        }
    }
    }) 
})

app.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

//Teacher Part
app.get('/TeacherDashboard', verifyUser, (req, res) => {
    return res.json({Status: "Success", user_id: req.user_id, name: req.name, dept: req.dept, designation: req.designation});
})

app.get('/CourseInfo', (req, res) => {
    const sql = "SELECT * FROM coursetable WHERE `t_id` = (SELECT t_id FROM teacher WHERE user_id = ?)";
    const values = [req.query.id];

    db.query(sql, [values], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.get('/CTInfo', (req, res) => {
    const sql = "SELECT * FROM classtests WHERE `courseCode` = ? AND `examYear`= ?";

    db.query(sql, [req.query.courseCode, req.query.examYear], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.post('/AddCT', (req, res)=> {
    const sql = "INSERT INTO classtests (`courseCode`, `examYear`, `ctID`) values (?)";
    const values = [
        req.body.courseCode,
        req.body.examYear,
        req.body.ctID
    ];

    db.query(sql, [values], (err, data)=> {
        if(err){
            console.log(req.body.courseCode+" - "+req.body.examYear+" "+req.body.ctID);
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.get('/AGNInfo', (req, res) => {
    const sql = "SELECT * FROM assignment WHERE `courseCode` = ? AND `examYear`= ?";

    db.query(sql, [req.query.courseCode, req.query.examYear], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.post('/AddAGN', (req, res)=> {
    const sql = "INSERT INTO assignment (`courseCode`, `examYear`, `agnID`) values (?)";
    const values = [
        req.body.courseCode,
        req.body.examYear,
        req.body.agnID
    ];

    db.query(sql, [values], (err, data)=> {
        if(err){
            //console.log(req.body.courseCode+" - "+req.body.examYear+" "+req.body.ctID);
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.post('/SubmitCourseFile', (req, res)=> {
    const sql = "UPDATE coursetable SET `isCourseFileSubmitted`= ? WHERE `courseCode` = ? AND `examYear` = ?";

    db.query(sql, ['1',req.body.courseCode,req.body.examYear], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

//Exam Control Office Part
app.get('/ECODashboard', verifyUser, (req, res) => {
    return res.json({Status: "Success", user_id: req.user_id, name: req.name, id: req.user_id, dept: req.dept, designation: req.designation});
})

app.get('/ApplySearchForECO', (req, res) => {
    const sql = "SELECT * FROM `coursetable` WHERE `department` LIKE ? AND `examYear` LIKE ? AND `year` LIKE ? AND `semester` LIKE ?";
    db.query(sql,[req.query.department+'%', req.query.examYear+'%', req.query.year+'%', req.query.semester+'%'],(err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

//Department Admin Part
app.get('/AdminDashboard', verifyUser, (req, res) => {
    return res.json({Status: "Success", user_id: req.user_id, name: req.name, dept: req.dept, designation: req.designation});
})

app.get('/TeacherInfo', (req, res) => {
    const sql = "SELECT * FROM user WHERE `department` = ? AND `userType` = ?";

    db.query(sql, [req.query.dept,'0'], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.post('/ApproveUser', (req, res)=> {
    const sql = "UPDATE user SET `userType`= ? WHERE `user_id` = ?";

    db.query(sql, ['1', req.body.user_id], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.post('/AddTeacher', (req, res)=> {
    const sql = "INSERT INTO teacher (`user_id`, `name`, `department`, `designation`, `email`, `phoneNumber`, `password`, `noOfAssignedCourses`) SELECT `user_id`, `name`, `department`, `designation`, `email`, `phoneNumber`, `password`, 0 FROM user WHERE `user_id` = ?";
    db.query(sql, [req.body.user_id], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.post('/RemoveTeacher', (req, res)=> {
    const sql = "DELETE FROM user WHERE `user_id` = ?";

    db.query(sql, [req.body.user_id], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.get('/CourseInfoForAssigningCourse', (req, res) => {
    const sql = "SELECT * FROM coursetable WHERE `department` = ?";

    db.query(sql, [req.query.department], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.get('/GetApprovedTeacherList', (req, res) => {
    const sql = "SELECT * FROM teacher WHERE `department` = ?";

    db.query(sql, [req.query.department], (err, result)=> {
        if(err)
        {
            return res.json("Error..");
        }
        return res.json(result);
    })
})

app.post('/AssignTeacherToCourse', (req, res)=> {
    const sql = "UPDATE courseTable SET `t_id`= ? WHERE `examYear`= ? AND `courseCode` = ?";

    db.query(sql, [req.body.t_id, req.body.examYear, req.body.courseCode], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        console.log(req.body.examYear+"  "+req.body.courseCode);
        return res.json("Success");
    })
})

app.post('/UpdateTeacherInfoForCourse', (req, res)=> {
    const sql = "UPDATE teacher SET `noOfAssignedCourses`= `noOfAssignedCourses`+1 WHERE `t_id` = ?";

    db.query(sql, [req.body.t_id], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.post('/AddCourseDA', (req, res)=> {
    const sql = "INSERT INTO coursetable (`department`, `t_id`, `courseName`, `courseCode`, `courseType`, `year`, `semester`, `examYear`, `credit`, `isCourseFileSubmitted`) values (?)";
    const values = [
        req.body.department,
        req.body.t_id,
        req.body.courseName,
        req.body.courseCode,
        req.body.courseType,
        req.body.year,
        req.body.semester,
        req.body.examYear,
        req.body.credit,
        '0'
    ];
    db.query(sql, [values], (err, data)=> {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.listen(7000, ()=> {
    console.log("Listening..");
})
