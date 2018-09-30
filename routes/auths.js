const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const {RegisterUsers} = require('../models/registerUsersModel');

const router = express.Router();




//GET requests
router.get('/api/registerUsers', async (req,res)=>{
    const registeredUsers = await RegisterUsers.find().sort('name');
    //console.log(registeredUsers);
    res.send(registeredUsers);
});




//POST Requests

router.post('/api/auths', async (req,res)=>{

    const validationResult = validateAuth(req.body); 
    if(validationResult.error)
     {
        res.status(400).send(`${validationResult.error.details[0].message}`);
        return;
    }

    let loggingUser = await RegisterUsers.findOne({email: req.body.email});
    if(!loggingUser) {
        return res.status(400).send('Invalid email/password');
    }

    const validPass = await bcrypt.compare(validationResult.value.password,loggingUser.password);
    if(!validPass) return res.send(400).send('Invalid email/password');

    const token = jwt.sign({_id: loggingUser._id},config.get('jwtPrivateKey'));
    res.send(token);
    
    
});


//Build validation Scheme

function validateAuth(requestBody){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    };

    const {value, error} = Joi.validate(requestBody,schema);
    return {value, error};
    
}

module.exports = router