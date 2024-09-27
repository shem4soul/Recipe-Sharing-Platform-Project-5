const mongoose = require("mongoose")
const Rating = require("../models/Rating")
const Recipe = require("../models/Recipe")




const validateRecipe = async (req, res, next) => {
    const { title, ingredients, instructions, author, categories } = req.body
  
    const errors = []
  
    if (!title) {
        errors.push("Please enter the title")
    }
    if (!ingredients) {
        errors.push("Please enter the ingredients")
    }
    if (!instructions) {
        errors.push("Please enter the instructions")
    }
    if (!author) {
        errors.push("Please enter the author")
    }
    if (!categories) {
        errors.push("Please enter the categories")
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors,
        })
    }
  
    next()
}

const validateRating = async (req, res, next) => {
    const { userId, recipeId, ratingValue } = req.body

    const errors = []
    if (!userId) {
        errors.push("Please enter the user ID")
    }
    if (!recipeId) {
        errors.push("Please enter the recipe ID")
    }
    if (!ratingValue) {
        errors.push("Please enter the rating value")
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors,
        });
    }

    next()
}

module.exports = {
    validateRecipe,
    validateRating,
}
