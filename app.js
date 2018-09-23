const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());


app.use('/',(req,res,next)=>{
    console.log(`${req.method} to ${req.url}`);
    next();
})






//require Dummy data
const data = require('./dummyMovieGenreData');



//////////REST Routing


//GET requests
app.get('/api/genre', (req,res)=>{
    res.send(data);
});


app.get('/api/genre/:id', (req,res) =>{
    const genre = data.find((item)=> item.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The Specific Genre not found');

    res.send(genre);
    
   
});





//POST Requests

app.post('/api/genre',(req,res)=>{

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

app.put('/api/genre/:id',(req,res)=>{
    const MovieGenre = data.find((item)=> item.id === parseInt(req.params.id));
    if(!MovieGenre) return res.status(404).send('The Movie Genre was not found');

    const validationResult = validateGenre(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);

    MovieGenre.genre = validationResult.value.genre
    res.send(MovieGenre);


});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});


//Build validation Scheme

function validateGenre(requestBody){
    const schema = {
        genre: Joi.string().uppercase().min(4).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}