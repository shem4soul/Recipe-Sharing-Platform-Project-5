const express = require("express")
const { validateToken } = require("../middleware/validateAuth")
const {
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe")
const { validateRecipe} = require("../middleware/validation")

const router = express.Router()

router.post("/create-recipe", validateToken, validateRecipe, createRecipe)

router.get("/find-recipe", validateToken, getRecipe)

router.put("/update-recipe/:id", validateToken, updateRecipe)

router.delete("/delete-recipe/:id", validateToken, deleteRecipe)

module.exports = router