"use strict";

//BASE MODULES
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');

let app = express();

//PORT CONFIG
app.set('port', (process.env.PORT || 5000));

//MIDDLEWARE
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static('./'));

//SERVE BACK STATIC FILES
app.use(express.static('./'));

//EXP USER ARRAY
let users = [
    {
        name:"xxxx",
        password:"xxxx"
    },
    {
        name:"yyyy",
        password:"yyyy"
    }
];

//USER AUTH APIs
app.post('/login',(req,res)=>{
    let message = "";
    let token = "";
    for(let user of users){
        if(user.name !== req.body.name){
            message = "Wrong Name";
        }else{
            if(user.password !== req.body.password){
                message = "Wrong Password";
                break;
            }
            else{
                token = jwt.sign( user, "samplesecret" );
                message = "Login Successful";
                break;
            }
        }
    }

    if(token){
        res.status(200).json({
            message,
            token
        });
    }
    else{
        res.status(403).json({
            message
        });
    }
});

app.use((req, res, next)=>{
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        //Decode the token
        console.log('hit decode if statement')
        jwt.verify(token,"samplesecret",(err,decod)=>{
            if(err){
                res.status(403).json({
                    message:"Wrong Token"
                });
            }
            else{
                //If decoded then call next() so that respective route is called.
                req.decoded=decod;
                next();
            }
        });
    }
    else{
        res.status(403).json({
            message:"No Token"
        });
    }
});

app.post('/getusers', (req,res)=>{
    let user_list = [];
    users.forEach((user)=>{
        user_list.push({"name":user.name});
    });
    res.send(JSON.stringify({users:user_list}));
});

//ROUTE MODULES: make sure all routes that need auth are below USER AUTH MIDDLEWARE FUNCTIONS
const index = require('./routes/index');

//LISTEN
app.listen(app.get('port'), ()=> {
    console.log('The magic is happening on port ', app.get('port'));
});

