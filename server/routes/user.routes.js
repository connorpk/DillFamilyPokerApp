const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModels = require('../models/user.models');
const jwt = require('jsonwebtoken');
const regex = /^[a-zA-Z0-9]*$/;
const regexSpace = /^\S*$/;
const pwRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

router.post('/signup', (req, res)=>{
    if(!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.email){
        return res.send({success: false, msg:'Invalid information provided1'});
    }
    if(!req.body.username.match(regex).length > 0){
        return res.send({success: false, msg: 'Invalid information provided2'})
    }
    if(!req.body.password.match(pwRegex).length > 0|| !req.body.email.match(regexSpace).length > 0){
        return res.send({success: false, msg: "Invalid information provided3"})
    }
    if(req.body.username.length < 4 || req.body.password < 6){
        return res.send({success: false, msg: 'Invalid information provided4'})
    }
    if(req.body.firstname == 0 || req.body.lastname == 0){
        return res.send({success: false, msg: 'Invalid information provided5'})
    }
    passport.authenticate('local-signup', (err, user, info)=>{
        if(err){
            return res.send({success: false, msg: err})
        }
        if(user){
            return res.send({success: true, msg: "Succesfully signed up! Please log in."});
        }
        return res.send({success: false, msg: info})
    })(req, res)
})

router.post('/login', (req, res)=>{
    console.log('hitting login')
    if(!req.body.username || !req.body.password){
        return res.send({success: false, msg: "Invalid user information, please try again."})
    }
    passport.authenticate('local-login', (err, user, info)=>{
        if(user){
            let encrypted = jwt.sign({id: user.userid}, process.env.SESSION_SECRET, {expiresIn: '7d'});
            return res.send({success: true, msg: "Welcome back!", user:{username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.emailaddress, active: user.activated, admin: user.admin}, jwt: encrypted});
        }
        return res.send({success: false, msg: info});
    })(req, res)
})

router.put('/updateinfo', passport.authenticate("jwt", {session: false}), (req, res)=>{
    if(req.body.firstname == 0 || req.body.lastname == 0){
        return res.send({success: false, msg: 'Invalid information provided'})
    }
    userModels.updateUserInfo(req.user, req.body, res);
})

router.put('/updatepassword', passport.authenticate("jwt", {session: false}), (req, res)=>{
    console.log(req.body);
    if(!req.body.newPassword.match(regexSpace).length > 0){
        return res.send({success: false, msg: "Invalid information provided1"})
    }
    userModels.updateUserPassword(req.user, req.body, res);
})

module.exports = router;