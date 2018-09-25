const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi'); 

const router = express.Router();



const genreSchema = new mongoose.Schema({
    genre: {
        type:String,
        required:true,
        minlength: 5,
        maxlength: 25
    }
});

const Genres = mongoose.model('Genres',genreSchema);



//GET requests
router.get('/api/genre', async (req,res)=>{
    const genres = await Genres.find().sort('genre');
    res.send(genres);
});


router.get('/api/genre/:id', async (req,res) =>{

    const genre = await Genres.findById(req.params.id);
    if(!genre)  return res.status(404).send('The Specific Genre not found');

    res.send(genre);
    
});





//POST Requests

router.post('/api/genre', async (req,res)=>{

    const validationResult = validateGenre(req.body); 
    if(validationResult.error)
     {
        res.status(400).send(`${validationResult.error.details[0].message}`);
        return;
    }

    // const genre = {
    //     id: data.length+1,
    //     genre:validationResult.value.genre
    // }

    let genre = new Genres({genre: validationResult.value.genre});
    genre = await genre.save(); 
    
    res.send(genre);
    
});



//Put/Update Requests

router.put('/api/genre/:id',async (req,res)=>{

    const validationResult = validateGenre(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);
    
    const genre = await Genres.findByIdAndUpdate(req.params.id,{ genre: validationResult.value.genre },{new: true});


    if(!genre) return res.status(404).send('The Movie Genre was not found');

    res.send(genre);


});

 
//Delete requests

router.delete('/api/genre/:id',async (req,res)=>{

    const genre = await Genres.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The Movie Genre was not found');
    res.send(genre);

});


//Build validation Scheme

function validateGenre(requestBody){
    const schema = {
        genre: Joi.string().uppercase().min(5).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = router