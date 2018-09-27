const mongoose = require('mongoose');
const Joi = require('joi'); 




const genreSchema = new mongoose.Schema({
    genre: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 25
    }
});

const Genres = mongoose.model('Genres',genreSchema);

//Build validation Scheme

function validateGenre(requestBody){
    const schema = {
        genre: Joi.string().uppercase().min(5).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = {
    Genres,
    validateGenre
}
