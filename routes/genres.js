const auth = require('../middleware/auths');
const admin = require('../middleware/admin');
const express = require('express');
const {Genres,validateGenre} = require('../models/genresModel');

const router = express.Router();




//GET requests
router.get('/api/genres', async (req,res)=>{
    const genres = await Genres.find().sort('genre');
    res.send(genres);
});


router.get('/api/genres/:id', async (req,res) =>{

    const genre = await Genres.findById(req.params.id);
    
    if(!genre)  return res.status(404).send('The Specific Genre not found');

    res.send(genre);
    
});





//POST Requests

router.post('/api/genres',auth, async (req,res)=>{


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

    const genre = new Genres({genre: validationResult.value.genre});
    await genre.save(); 
    
    res.send(genre);
    
});



//Put/Update Requests

router.put('/api/genres/:id',async (req,res)=>{

    const validationResult = validateGenre(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);
    
    const genre = await Genres.findByIdAndUpdate(req.params.id,{ genre: validationResult.value.genre },{new: true});


    if(!genre) return res.status(404).send('The Movie Genre was not found');

    res.send(genre);


});

 
//Delete requests

router.delete('/api/genres/:id',[auth,admin],async (req,res)=>{

    const genre = await Genres.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The Movie Genre was not found');
    res.send(genre);

});

module.exports = router