const mongoose = require('mongoose');
const Joi = require('joi'); 


const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 25
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 25
    },
});

const Users = mongoose.model('Users',usersSchema);


//Build validation Scheme

function validateUser(requestBody){
    const schema = {
        name: Joi.string().min(5).max(25).required(),
        phone: Joi.string().min(5).max(5).required(),
        isGold: Joi.boolean()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = {
    Users,
    validateUser
}