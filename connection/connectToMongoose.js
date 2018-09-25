const mongoose = require('mongoose');


const connectionObject = mongoose.connect('mongodb://localhost/filmify')
    .then(()=>{
        console.log(`Connected to db`);
    })
    .catch((err)=>{
        console.log(`Connection failed: ${err.message}`);
    });

module.exports = connectionObject;