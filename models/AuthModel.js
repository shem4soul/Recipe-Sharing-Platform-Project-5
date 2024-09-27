const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// user Schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  favoriteCuisines: [{String}],

 }, {
   timestamps: true,
})




const User = new mongoose.model('User', userSchema)

module.exports = User

