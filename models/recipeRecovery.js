const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    preferences: [{
        type: String,
    }],
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Applying pagination plugin to schema
recipeSchema.plugin(mongoosePaginate)

module.exports = new mongoose.model('Recipe', recipeSchema)
