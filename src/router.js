'use strict';

const express = require('express');
const authRouter = express.Router();
const lightState = require('node-hue-api').lightState;

const User = require('./user-model');
const auth = require('./middleware');
const light = require('../bridge');
let state = lightState.create();

authRouter.post('/signup', (req, res, next) => {
    let user = new User(req.body);
    return user.save()
        .then(user => {
            req.token = user.generateToken();
            req.user = user;
            res.set('token', req.token);
            res.cookie('auth', req.token);
            res.send(req.token);
            res.send()
        }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
    res.cookie('auth', req.token);
    console.log(req.body);
    res.send(`Hello ${req.user.username}! \n\n Below Are Directions for light IDs. Replace "id" with these numbers: 1,2,6,7 
\n Turn On Lights - "http get :3000/light/id/on"
\n Turn Off Lights - "http get :3000/light/id/off"
\n Turn On All Lights - "http get :3000/lightgroup/on"
\n Turn Off All Lights- "http get :3000/lightgroup/off"`);
});

// light settings from user
authRouter.post('/settings', (req, res, next) => {
    let user = new User();
    console.log(user.lightSets);
    console.log(JSON.parse(req.body))
    user.lightSets.push(req.body);

    // User.find({username: req.user.username, password: req.user.password})
    //     .populate('lightSets')
    //     .exec(function(err, user){
    //     })
    // return user.save()
    //     .then(user => {
    //         // to see lightSets in user schema
    //        req.lights = user.lightSets;
    //        res.send(user)
    //     }).catch(err => console.log(err))
})

authRouter.get('/light/:id/on', (req, res, next) => {
    let bulb = req.params.id;
    light.lightOnOff(bulb, state.on());
    res.send(`Light ${bulb} Is On`)
});

authRouter.get('/light/:id/off', (req, res, next) => {
    let bulb = req.params.id;
    light.lightOnOff(bulb, state.off());
    res.send(`Light ${bulb} Is On`)
});

authRouter.get('/lightgroup/on', (req, res, next) => {
    light.lightGroup(4, state.on());
    res.send(`All lights are on`)
});

authRouter.get('/lightgroup/off', (req, res, next) => {
    light.lightGroup(4, state.off());
    res.send(`All lights are off`)
});

module.exports = authRouter;

