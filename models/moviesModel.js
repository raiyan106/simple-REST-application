const mongoose = require('mongoose');
const Joi = require('joi'); 
const {genreSchema} = require('./genresModel');

const moviesSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 25,
        trim:true
    },
    genre:{
        type: genreSchema,
        required:true
    },
    numberInStock: {
        type:Number,
        required:true,
        min: 0,
        max: 255
    },
    dailyRentalRate : {
        type: Number,
        required:true,
        min: 0,
        max: 255
    }
});

const Movies = mongoose.model('Movies',moviesSchema);


//Build validation Scheme

function validateMovie(requestBody){
    const schema = {
        title: Joi.string().min(5).max(25).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = {
    Movies,
    validateMovie
}