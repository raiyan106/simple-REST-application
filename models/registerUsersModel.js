const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config'); 




const registerUsersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:6,
        maxlength:1024
    },
    isAdmin:Boolean
});

registerUsersSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const RegisterUsers = mongoose.model('RegisterUsers',registerUsersSchema);

//Build validation Scheme

function validateRegistration(requestBody){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = {
    RegisterUsers,
    validateRegistration,
}
