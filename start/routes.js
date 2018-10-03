const express = require('express');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const users = require('../routes/users');
const movies = require('../routes/movies');
const hires = require('../routes/hires');
const auths = require('../routes/auths');
const registerUsers = require('../routes/registerUsers');

module.exports = function(app)
{
    app.use('/',genres);
    app.use('/',users);
    app.use('/',movies);
    app.use('/',hires);
    app.use('/', registerUsers);
    app.use('/',auths);
    app.use(error);
    app.use(express.json());

    app.use('/',(req,res,next)=>{
    console.log(`${req.method} to ${req.url} with Status Code: ${res.statusCode} at time: ${new Date().toString()}`);
    next();
});
}