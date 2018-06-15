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
app.get('/', (req,res)=>{
    res.sendFile('index.html');
});

//LISTEN
app.listen(app.get('port'), ()=> {
    console.log('The magic is happening on port ', app.get('port'));
});

