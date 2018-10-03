const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){

winston.add( winston.transports.File,{ filename: 'logfile.log' });

process.on('uncaughtException',(ex)=>{
    console.log('we got an uncaught exception');
    winston.error(ex.message,ex);
    process.exit(1);
});
// winston.handleExceptions(
//     new winston.transports.File({filename:'uncaughtExceptions.log'})
// );



process.on('unhandledRejection',(ex)=>{
    console.log('we got an uncaught rejection');
    throw ex;
});


//winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/filmify'});
}
