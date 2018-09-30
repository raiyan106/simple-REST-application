const mongoose = require('mongoose');
const Joi = require('joi'); 



const hireSchema = new mongoose.Schema({
    user:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required:true,
                minlength:5,
                maxlength:25
            },
            isGold:{
                type:Boolean,
                required:true
            },
            phone:{
                type: String,
                required:true,
                minlength:5,
                maxlength:25
            }
        }),
        required:true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type: String,
                required:true,
                minlength:5,
                maxlength:55
            },
            dailyRentalRate:{
                type:Number,
                require: true
            }
        }),
        required:true
    },
    dateOfIssue:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateOfReturn: {
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

const Hire = mongoose.model('Hire',hireSchema);

function validateHire(requestBody){ 
    const Schema ={
        userId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }

    const {value, error} = Joi.validate(requestBody,Schema);
    return {value, error};
}

module.exports = {
    Hire,
    validateHire
}