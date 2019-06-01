'use strict';
const express = require('express');

require('dotenv').config();



const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
};

const mongoose = require('mongoose');

const User = require('./src/user-model');


mongoose.connect('mongodb://localhost/testdb', options);


require('./app.js').start('3000');
