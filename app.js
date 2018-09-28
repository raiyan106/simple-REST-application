const express = require('express');
const genres = require('./routes/genres');
const users = require('./routes/users');
const movies = require('./routes/movies');
const connectionObj = require('./connection/connectToMongoose');



const app = express();

app.use(express.json());

app.use('/',(req,res,next)=>{
    console.log(`${req.method} to ${req.url} at time: ${new Date().toString()}`);
    next();
});
app.use('/',genres);
app.use('/',users);
app.use('/',movies);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});