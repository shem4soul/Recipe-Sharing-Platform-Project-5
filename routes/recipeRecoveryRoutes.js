const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeRecovery')
const searchMiddleware = require('../middleware/recipeRecovery')

// Route for searching recipes by categories, ingredients, or user preferences
router.get('/search', searchMiddleware.validateSearch, recipeController.searchRecipes)

// Route for listing recipes with pagination and sorting
router.get('/browse', searchMiddleware.validateBrowse, recipeController.browseRecipes)

module.exports = router
