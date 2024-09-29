const express = require('express')

const {
    searchRecipes,
    browseRecipes
} = require('../controllers/recipeRecovery')
const {
    validateSearch,
    validateBrowse
} = require('../middleware/recipeRecovery')

const router = express.Router()

// Routes
router.get('/search', validateSearch, searchRecipes)
router.get('/browse', validateBrowse, browseRecipes)

module.exports = router;


