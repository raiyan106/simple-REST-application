const express = require('express');
const Joi = require('joi');
const router = express.Router();

//require Dummy data
const data = require('../dummyMovieGenreData');

//////////REST Routing


//GET requests
router.get('/api/genre', (req,res)=>{
    res.send(data);
});


router.get('/api/genre/:id', (req,res) =>{
    const genre = data.find((item)=> item.id === parseInt(req.params.id));
    if(!genre)
    { 
        res.status(404).send('The Specific Genre not found');
    }
    res.send(genre);
    
   
});





//POST Requests

router.post('/api/genre',(req,res)=>{

    const validationResult = validateGenre(req.body); 
    if(validationResult.error) {
     res.status(400).send(`${validationResult.error.details[0].message}`);
    return;
    }
    const genre = {
        id: data.length+1,
        genre:validationResult.value.genre
    }

    data.push(genre);
    res.send(genre);
    
});



//Put/Update Requests

router.put('/api/genre/:id',(req,res)=>{
    const MovieGenre = data.find((item)=> item.id === parseInt(req.params.id));
    if(!MovieGenre) return res.status(404).send('The Movie Genre was not found');

    const validationResult = validateGenre(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);

    MovieGenre.genre = validationResult.value.genre
    res.send(MovieGenre);


});

 
//Delete requests

router.delete('/api/genre/:id',(req,res)=>{
    const MovieGenre = data.find((item)=> item.id === parseInt(req.params.id));
    if(!MovieGenre) return res.status(404).send('The Movie Genre was not found');

    const index = data.indexOf(MovieGenre);
    data.splice(index,1);
    res.send(MovieGenre);

});


//Build validation Scheme

function validateGenre(requestBody){
    const schema = {
        genre: Joi.string().uppercase().min(4).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = router