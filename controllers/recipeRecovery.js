
const Recipe = require('../models/Recipe')





// Search for recipes based on categories, ingredients, or preferences
const searchRecipes = async (req, res) => {
    const { category, ingredients, preferences } = req.query

    try {
        let query = {}

        // Filter by category
        if (category) {
            query.category = category
        }

        // Filter by ingredients (assuming ingredients are stored as an array)
        if (ingredients) {
            query.ingredients = { $in: ingredients.split(',') }
        }

        // Filter by user preferences (assuming preferences is an array of tags)
        if (preferences) {
            query.preferences = { $in: preferences.split(',') }
        }

        const recipes = await Recipe.find(query)

        res.status(200).json({
            success: true,
            data: recipes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching recipes',
            error: error.message,
        });
    }
};

// Browse recipes with pagination and sorting
const browseRecipes = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query

    try {
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { [sortBy]: order === 'desc' ? -1 : 1 },
        }

        const recipes = await Recipe.paginate({}, options)

        res.status(200).json({
            success: true,
            data: recipes.docs,
            pagination: {
                totalDocs: recipes.totalDocs,
                totalPages: recipes.totalPages,
                currentPage: recipes.page,
                limit: recipes.limit,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error browsing recipes',
            error: error.message,
        })
    }
}

module.exports = {
    searchRecipes,
    browseRecipes,
  }