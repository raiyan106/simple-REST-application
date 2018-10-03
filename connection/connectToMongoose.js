const mongoose = require('mongoose');
const winston = require('winston');


const connectionObject = mongoose.connect('mongodb://localhost/filmify')
    .then(()=>{
        winston.info(`Connected to db`);
    })
    .catch((err)=>{
        console.log(`Connection failed: ${err.message}`);
    });

module.exports = connectionObject;