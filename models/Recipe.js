
const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [String],
    instructions: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categories: [String],
  }, { timestamps: true, 

  })
  


const Recipe = new mongoose.model('Recipe', recipeSchema)
module.exports = Recipe


