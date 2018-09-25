const express = require('express');
const genres = require('./routes/genres');
const connectionObj = require('./connection/connectToMongoose');



const app = express();

app.use(express.json());

app.use('/',(req,res,next)=>{
    console.log(`${req.method} to ${req.url} at time: ${new Date().toString()}`);
    next();
});
app.use('/',genres);










const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});