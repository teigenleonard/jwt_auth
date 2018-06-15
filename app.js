"use strict";

//BASE MODULES
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

let app = express();

//PORT CONFIG
app.set('port', (process.env.PORT || 5000));

//MIDDLEWARE
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static('./'));

//ROUTE MODULES
const index = require('./routes/index');

//USER AUTH FUNCTIONS
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

app.post('/login',(req,res)=>{
    let message = "";
    for(let user of users){
        if(user.name !== req.body.name){
            message = "Wrong Name";
        }else{
            if(user.password !==req.body.password){
                message = "Wrong Password";
                break;
            }
            else{
                message = "Login Successful";
                break;
            }
        }
    }
    res.send(message);
});

app.post('/getusers', (req,res)=>{
    let user_list = [];
    users.forEach((user)=>{
        user_list.push({"name":user.name});
    });
    res.send(JSON.stringify({users:user_list}));
});

//LISTEN
app.listen(app.get('port'), ()=> {
    console.log('The magic is happening on port ', app.get('port'));
});

