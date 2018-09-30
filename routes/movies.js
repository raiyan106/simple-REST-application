const express = require('express');
const {Movies,validateMovie} = require('../models/moviesModel');
const {Genres} = require('../models/genresModel');
const router = express.Router();




//GET requests
router.get('/api/movies', async (req,res)=>{
    const movies = await Movies.find().sort('title');
    res.send(movies);
});


router.get('/api/movies/:id', async (req,res) =>{

    const movie = await Movies.findById(req.params.id);
    if(!movie)  return res.status(404).send('The Specific Movie not found');

    res.send(movie);
    
});





//POST Requests

router.post('/api/movies', async (req,res)=>{

    const validationResult = validateMovie(req.body); 
    if(validationResult.error)
     {
        res.status(400).send(`${validationResult.error.details[0].message}`);
        return;
    }

    const genre = await Genres.findById(validationResult.value.genreId);
    if(!genre) return res.status(400).send('Invalid Genre.');

    const movie = new Movies({
        title: validationResult.value.title,
        genre:{
            _id: genre._id,
            genre: genre.genre
        },
        numberInStock: validationResult.value.numberInStock,
        dailyRentalRate: validationResult.value.dailyRentalRate
    });
    await movie.save(); 
    
    res.send(movie);
    
});



//Put/Update Requests

router.put('/api/movies/:id',async (req,res)=>{

    const validationResult = validateMovie(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);
    
    const genre = await Genres.findById(validationResult.value.genreId);

    if(!genre) return res.status(404).send('Invalid Genre');

    const movie = await Movies.findByIdAndUpdate(req.params.id, {
        title: validationResult.value.title,
        genre:{
            _id: genre._id,
            genre: genre.genre
        },
        numberInStock: validationResult.value.numberInStock,
        dailyRentalRate: validationResult.value.dailyRentalRate
    }, {new:true});

    if(!movie) return res.status(400).send('Movie with given ID not found');

    res.send(movie);

    res.send(genre);


});

 
//Delete requests

router.delete('/api/movies/:id',async (req,res)=>{

    const movie = await Movies.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send('The Movie was not found');
    res.send(movie);

});

module.exports = router