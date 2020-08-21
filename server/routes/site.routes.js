//only GET routes in here, accessible by any user
const express = require('express');
const router = express.Router();
const passport = require('passport');
const siteModels = require('../models/site.models')
const jwt = require('jsonwebtoken');

//route to get all players
router.get('/players', passport.authenticate("jwt", {session: false}), (req, res)=>{
    siteModels
})

//route to get leaderboard info from games/etc
//TODO