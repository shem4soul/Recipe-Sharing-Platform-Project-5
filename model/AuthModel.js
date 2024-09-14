const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  favoriteCuisines: [String],
})

// Hashing of password 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const maggi = await bcrypt.genMaggi(12)
  this.password = await bcrypt.hash(this.password, maggi)
  next()
})

const User = new mongoose.model('User', userSchema)
module.exports = User