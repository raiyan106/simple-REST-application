const express = require('express');
const {Hire,validateHire} = require('../models/hiresModel');
const {Movies} = require('../models/moviesModel');
const {Users} = require('../models/usersModel');






const router = express.Router();


//GET methods

router.get('/api/hires', async (req, res)=>{
    const hires = await Hire.find().sort({dateOfIssue:-1});
    res.send(hires);

});

router.get('/api/hires/:id', async (req,res)=>{

    const hire = await Hire.findById(req.params.id);
    if(!hire) return res.status(404).send('Hired movie object with given ID was not found');
    res.send(hire);
});


//POST method

router.post('/api/hires', async (req,res)=>{
    const validationResult = validateHire(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);

    const user = await Users.findById(validationResult.value.userId);
    if(!user) return res.status(400).send('The specific user was not found');

    const movie = await Movies.findById(validationResult.value.movieId);
    if(!movie) return res.status(400).send('The specific movie was not found');

    if(movie.numberInStock === 0) return res.status(400).send('Movie is out of stock');

    let hire = new Hire({
        user:{
            _id: user._id,
            name: user.name,
            isGold: user.isGold,
            phone: user.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    hire = await hire.save();

    movie.numberInStock--;
    movie.save();

    res.send(hire);
});




















































module.exports = router