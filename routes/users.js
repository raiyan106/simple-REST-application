// const mongoose = require('mongoose');
const {Users, validateUser} = require('../models/usersModel');
const express = require('express');

const router = express.Router();




//GET users requests
router.get('/api/users', async (req,res)=>{
    const users = await Users.find().sort('name');
    res.send(users);
});


router.get('/api/users/:id', async (req,res) =>{

    const user = await Users.findById(req.params.id);
    if(!user)  return res.status(404).send('The Specific User not found');

    res.send(user);
    
});





//POST users request

router.post('/api/users', async (req,res)=>{

    const validationResult = validateUser(req.body); 
    if(validationResult.error)
     {
        res.status(400).send(`${validationResult.error.details[0].message}`);
        return;
    }


    let user = new Users({
        name: validationResult.value.name,
        phone: validationResult.value.phone,
        isGold: validationResult.value.isGold
    });
    user = await user.save(); 
    
    res.send(user);
    
});


//Put/Update Requests

router.put('/api/users/:id',async (req,res)=>{

    const validationResult = validateUser(req.body);
    if(validationResult.error) return res.status(400).send(`${validationResult.error.details[0].message}`);
    
    const user = await Users.findByIdAndUpdate(req.params.id,
            {
             name: validationResult.value.name,
             phone: validationResult.value.phone,
             isGold: validationResult.value.isGold

             },{new: true});


    if(!user) return res.status(404).send('The User was not found');

    res.send(user);


});

//Delete requests

router.delete('/api/users/:id',async (req,res)=>{

    const user = await Users.findByIdAndRemove(req.params.id);

    if(!user) return res.status(404).send('The User was not found');
    res.send(user);

});





module.exports = router;