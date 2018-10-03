const express = require('express');
const winston = require('winston');
const connectionObj = require('./connection/connectToMongoose');


const app = express();
require('./start/logging')();
require('./start/routes')(app);
require('./start/config')();
require('./start/validation')();


const port = process.env.PORT || 3000;
app.listen(port, ()=>winston.info(`App listening on port ${port}`)
);
