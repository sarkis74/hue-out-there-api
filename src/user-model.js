'use strict';

/**
 * DEPENDENCIES - mongoose, jsonwebtoken, bcrypt
 * also requires dotenv
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

  /**
 * Creates 'user' as a new mongo schema, and defines types for username and password.
 * @type {mongoose.Schema}
 */
const user = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
    lightSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lightSet' }] // this is the link to light schema
});

//========================================================================

// create a new schema for the lights id
let lightsSchema = new mongoose.Schema({
  light_id:{type: String, required: true},// where light id data is stored
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const lightSet = mongoose.model('lightSet', lightsSchema);

//============================================================================

/**
 * Hashes given password.
 */
user.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
  }).catch(error => {throw error});
});

/**
 * Runs authenticateBasic based on...
 * @param auth - compares username with what's in Schema
 * @returns {boolean|*} - calls comparePassword function to verify password
 */
user.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
  .catch(console.error);
};

/**
 * This function compares the password with what's in the schema
 * @param password - given password
 * @returns {*} - uses bcrypt to compare the this.password with what's in the Schema
 */
user.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

/**
 * Function that generates a token and assigns it to an _id in the Schema
 * @returns {*} - uses jsonwebtoken to sign the tokenData and salts it with our .env file's SECRET
 */
user.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
  };
  return jwt.sign(tokenData, process.env.SECRET);
};


/**
 * Exports user-model for use outside of this file.
 */


const User = mongoose.model('user', user);


//=============================================================================

module.exports = User;
