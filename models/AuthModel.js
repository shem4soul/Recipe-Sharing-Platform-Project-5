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



/*// Hashing of password 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const maggi = await bcrypt.genMaggi(12)
  this.password = await bcrypt.hash(this.password, maggi)
  next()
})


// Verification OF PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}*/

const User = new mongoose.model('User', userSchema)

module.exports = User

