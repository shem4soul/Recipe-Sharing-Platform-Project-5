const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    ratingValue: { type: Number, required: true },
}, { timestamps: true,
    

})



const Rating = new mongoose.model('Rating', ratingSchema)
module.exports = Rating


