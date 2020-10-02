
const express = require("express");
const app = express();
const dataService = require('./services/data.service');
const session = require("express-session");
const cors = require("cors");

app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}));

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

const logMiddleWare = (req, res, next)=> {
    // console.log(req.body);
    next();
}

app.use(logMiddleWare);

const authMiddleWare = (req, res, next) => {
    if(!req.session.currentUser) {
        return res.status(401).json({ 
            status: false,
            statusCode: 401,
            message: "please login"
        });
    }
    else {
        next();
    }
}


app.post("/employeeregister", (req, res)=>{
    dataService.employeeregister(req.body.username, req.body.password, req.body.empid, req.body.name, req.body.emailid, 
        req.body.phone, req.body.designation, req.body.address)
    .then(result => {
        res.status(result.statusCode).json(result);
    });
    // res.status.json(result);
    // const result = dataService.register(req.body.name, req.body.accno, req.body.pin, req.body.password);
    // res.status(result.statusCode).json(result);

});

app.post("/login", (req, res)=>{
     dataService.login(req, req.body.username, req.body.password)
    .then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.post('/logout',authMiddleWare, (req,res) => {
    dataService.logout(req.body.username)
    .then(result => {
        res.status(result.statusCode).json(result);
    })
    // req.user.deleteToken(req.empid,(err,user)=>{
    //     if(err) return res.status(400).send(err);
    //     res.sendStatus(200);
    // });

}); 


app.listen(3000, ()=> {

    console.log("server is running on port 3000");
});