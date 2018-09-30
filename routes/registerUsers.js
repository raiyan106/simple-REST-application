const auth = require('../middleware/auths');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {RegisterUsers,validateRegistration} = require('../models/registerUsersModel');

const router = express.Router();




//GET requests
router.get('/api/registerUsers/me',auth, async (req,res)=>{

    const registeredUser = await RegisterUsers.findById(req.user._id).select('-password');
    
    //console.log(registeredUsers);
    res.send(registeredUser);
});




//POST Requests

router.post('/api/registerUsers', async (req,res)=>{

    const validationResult = validateRegistration(req.body); 
    if(validationResult.error)
     {
        res.status(400).send(`${validationResult.error.details[0].message}`);
        return;
    }

    let duplicateUser = await RegisterUsers.findOne({email: req.body.email});
    if(duplicateUser) {
        return res.status(400).send('User already registered');
    }



    const registeringUser = new RegisterUsers(
        _.pick(validationResult.value,['name','email','password'])
    );
    const salt = await bcrypt.genSalt(10);
    registeringUser.password = await bcrypt.hash(registeringUser.password,salt);

    await registeringUser.save();
    
    const token = registeringUser.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(registeringUser,['_id','name','email']));
    
});


module.exports = router