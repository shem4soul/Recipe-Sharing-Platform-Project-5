const favourite = require("../models/Rating")


const addFavorite = async (req, res) => {
    try {
      const user = await User.findById(req.userId)
      if (!user.favorites.includes(req.params.recipeId)) {
        user.favorites.push(req.params.recipeId)
        await user.save()
      }
      res.status(200).json({ message: 'Recipe added to favorites' })
    } catch (err) {
      res.status(500).json({ error: 'Failed to add to favorites' })
    }
  }
  
  // Add rating
  const rateRecipe = async (req, res) => {
    const { recipeId, rating } = req.body
    try {
      const newRating = new Rating({ userId: req.userId, recipeId, rating })
      await newRating.save()
      res.status(201).json({ message: 'Rating submitted' })
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit rating' })
    }
  }
  

  module.exports = {
    addFavorite,
    rateRecipe,
  }