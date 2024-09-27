const Recipe = require("../models/Recipe")



// CRUD Operations (Create, Read, Update, Delete):

// Creating a new recipe
const createRecipe = async (req, res) => {
    try {
      const recipe = new Recipe({ ...req.body, author: req.userId })
      await recipe.save()
      res.status(201).json(recipe)
    } catch (err) {
      res.status(500).json({ error: 'Failed to create recipe' })
    }
  };


  
  // Update a recipe
  const updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(recipe)
    } catch (err) {
      res.status(500).json({ error: 'Failed to update recipe' })
    }
  }
  
  // Delete a recipe
  const deleteRecipe = async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Recipe deleted' })
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete recipe' })
    }
  }

  module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }