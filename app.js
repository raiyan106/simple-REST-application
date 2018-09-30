const config = require('config');
const express = require('express');
const genres = require('./routes/genres');
const users = require('./routes/users');
const movies = require('./routes/movies');
const hires = require('./routes/hires');
const auths = require('./routes/auths');
const registerUsers = require('./routes/registerUsers');
const connectionObj = require('./connection/connectToMongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR! JWT not defined");
    process.exit(1);
}

const app = express();

app.use(express.json());

app.use('/',(req,res,next)=>{
    console.log(`${req.method} to ${req.url} with Status Code: ${res.statusCode} at time: ${new Date().toString()}`);
    next();
});
app.use('/',genres);
app.use('/',users);
app.use('/',movies);
app.use('/',hires);
app.use('/', registerUsers);
app.use('/',auths);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});